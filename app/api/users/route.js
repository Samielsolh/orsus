import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import User from '@/models/user';

export const dynamic = 'force-dynamic';

export const GET = async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const itemsPerPage = searchParams.get('itemsPerPage');
  const page = searchParams.get('page');

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

    // Query MongoDB with skip, limit, and exclude admin role for pagination
    const items = await User.find({ role: { $ne: 'admin' } })
      .skip(skipValue)
      .limit(size);

    // Query MongoDB for total document count excluding admin role
    const totalDocumentCount = await User.countDocuments({
      role: { $ne: 'admin' },
    });

    return NextResponse.json(
      { users: items, totalDocumentCount },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.error(error.message, { status: 500 });
  }
};
