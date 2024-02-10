import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import Raise from '@/models/raise';

export const dynamic = 'force-dynamic';

export const POST = async (req) => {
  const {
    title,
    date,
    region,
    link,
    content,
    website,
    startup_name,
    investors,
    most_similar_tag,
    category,
    company_description,
    differentiation,
    raised,
    raise,
    Predicted_Categories,
    Predicted_Groups,
    raise_num,
    raise_date,
    raised_digits,
  } = await req.json();

  try {
    await connectToDB();
    const item = new Raise({
      title,
      date,
      region,
      link,
      content,
      website,
      startup_name,
      investors,
      most_similar_tag,
      category,
      company_description,
      differentiation,
      raised,
      raise,
      Predicted_Categories,
      Predicted_Groups,
      raise_num,
      raise_date,
      raised_digits,
    });

    await item.save();

    return NextResponse.json(
      { message: 'Raise created successfully', raise: item },
      { status: 201 }
    );
  } catch (error) {
    console.log('error', error);
    return NextResponse.error(error.message, { status: 500 });
  }
};
