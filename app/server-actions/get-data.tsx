import { supabase } from './supabaseClient'; // Adjust the import path as needed

interface Filter {
  field: string;
  operator: 'eq' | 'neq' | 'lt' | 'lte' | 'gt' | 'gte' | 'like';
  value: string;
}

interface DataResult {
  columns: string[];
  rows: any[];
  totalRows: number;
}

const validColumns = ["created_at", "Title", "Date", "Contents", "Link", "Region", "Extracted_Startup_Name", "Announcement", "Predicted_Categories"];

export const getData = async (
  tableName: string,
  filters: Filter[],
  page: number,
  itemsPerPage: number,
  sortColumn: string, // Add the sortColumn parameter
  sortDirection: 'asc' | 'desc' // Add the sortDirection parameter
): Promise<DataResult | null> => {
  try {
    const startIndex = (page - 1) * itemsPerPage;
    let query = supabase.from(tableName).select('*', { count: 'exact' });

    filters.forEach(filter => {
      if (validColumns.includes(filter.field)) {
        switch(filter.operator) {
          case 'eq':
            query = query.eq(filter.field, filter.value);
            break;
          case 'neq':
            query = query.neq(filter.field, filter.value);
            break;
          case 'lt':
            query = query.lt(filter.field, filter.value);
            break;
          case 'lte':
            query = query.lte(filter.field, filter.value);
            break;
          case 'gt':
            query = query.gt(filter.field, filter.value);
            break;
          case 'gte':
            query = query.gte(filter.field, filter.value);
            break;
          case 'like':
            query = query.like(filter.field, filter.value);
            break;
          default:
            console.error(`Unsupported operator: ${filter.operator}`);
        }
      } else {
        console.error(`Invalid column: ${filter.field}`);
      }
    });

    // Add sorting
    if (validColumns.includes(sortColumn)) {
      query = query.order(sortColumn, { ascending: sortDirection === 'asc' });
    } else {
      console.error(`Invalid sort column: ${sortColumn}`);
    }

    query = query.range(startIndex, startIndex + itemsPerPage - 1);

    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    if (data) {
      const columns = data.length > 0 ? Object.keys(data[0]) : [];
      return { columns, rows: data, totalRows: count ?? 0 };
    }

    return null;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
