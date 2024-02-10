import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import Raise from '@/models/raise';

export const dynamic = 'force-dynamic';

export const GET = async (req) => {
  try {
    await connectToDB();
    const items = await Raise.find({});
    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    return NextResponse.error(error.message, { status: 500 });
  }
};
