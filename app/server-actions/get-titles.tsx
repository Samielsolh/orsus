// getCompanyTitles.js

import { supabase } from './supabaseClient'; // Adjust the import path as needed

export const getCompanyTitles = async () => {
  try {
    let query = supabase.from('test').select('Title');

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    // Log the fetched data to the console
    console.log("Fetched Company Titles:", data);

    return data.map(item => ({ label: item.Title, value: item.Title }));
  } catch (error) {
    console.error('Error fetching company titles:', error);
    return [];
  }
};
