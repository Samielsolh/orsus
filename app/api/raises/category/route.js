import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import Raise from '@/models/raise';

export const dynamic = 'force-dynamic';

export const GET = async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const itemsPerPage = searchParams.get('itemsPerPage');
  const page = searchParams.get('page');
  const searchTerm = searchParams.get('searchtext'); // Add this line to get the search term

  console.log('itemsPerPage', itemsPerPage);
  console.log('page', page);
  console.log('searchTerm', searchTerm);

  try {
    await connectToDB();

    // Check if itemsPerPage and page are present in the URL
    if (!itemsPerPage || !page) {
      throw new Error('Missing pagination parameters');
    }

    // Convert itemsPerPage and page to integers
    const pageNum = parseInt(page, 10);
    const size = parseInt(itemsPerPage, 10);

    // Validate pageNum and size to ensure they are positive integers
    if (isNaN(pageNum) || isNaN(size) || pageNum < 1 || size < 1) {
      throw new Error('Invalid pagination parameters');
    }

    // Calculate skip value
    const skipValue = (pageNum - 1) * size;

    // Create a search filter based on the startup_name field
    const searchFilter = searchTerm
      ? {
          $or: [
            {
              Predicted_Categories: { $in: [new RegExp(searchTerm, 'i')] },
            },
          ],
        }
      : {};

    // Query MongoDB with skip, limit, and search filter for pagination
    const items = await Raise.find(searchFilter).skip(skipValue).limit(size);

    // Query MongoDB for total document count with the search filter
    const totalRows = await Raise.countDocuments(searchFilter);

    if (items) {
      const columns = [
        'title',
        'date',
        'region',
        'link',
        'content',
        'website',
        'startup_name',
        'investors',
        'most_similar_tag',
        'category',
        'company_description',
        'differentiation',
        'raised',
        'raise',
        'Predicted_Categories',
        'Predicted_Groups',
        'raise_num',
        'raise_date',
        'raised_digits',
      ];
      return NextResponse.json(
        { columns, rows: items, totalRows },
        { status: 200 }
      );
    }
    return null;
  } catch (error) {
    console.log('error', error.message);
    return NextResponse.error(error.message, { status: 500 });
  }
};
