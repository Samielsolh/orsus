import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import Raise from '@/models/raise';

export const dynamic = 'force-dynamic';

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const raise = await Raise.findById(params.id);

    if (!raise)
      return NextResponse.json({ message: 'Item Not Found' }, { status: 404 });

    return NextResponse.json({ raise }, { status: 200 });
  } catch (error) {
    return NextResponse.error(error.message, { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
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
    // Find the existing prompt by ID
    const item = await Raise.findById(params.id);
    if (!item) {
      return NextResponse.json({ message: 'Item Not Found' }, { status: 404 });
    }
    // Update the Item with new data
    item.title = title;
    item.date = date;
    item.region = region;
    item.link = link;
    item.content = content;
    item.website = website;
    item.startup_name = startup_name;
    item.investors = investors;
    item.most_similar_tag = most_similar_tag;
    item.category = category;
    item.company_description = company_description;
    item.differentiation = differentiation;
    item.raised = raised;
    item.raise = raise;
    item.Predicted_Categories = Predicted_Categories;
    item.Predicted_Groups = Predicted_Groups;
    item.raise_num = raise_num;
    item.raise_date = raise_date;
    item.raised_digits = raised_digits;
    await item.save();
    return NextResponse.json(
      { message: 'Successfully updated the Item', raise: item },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.error(error.message, { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    // Find the item by ID and remove it
    await Raise.findByIdAndRemove(params.id);
    return NextResponse.json(
      { message: 'Raise deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.error(error.message, { status: 500 });
  }
};
