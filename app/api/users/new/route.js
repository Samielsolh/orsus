import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import User from '@/models/user';

export const dynamic = 'force-dynamic';

export const POST = async (req) => {
  const { userId, firstName, lastName, email } = await req.json();

  try {
    await connectToDB();
    const user = await User.findOne({ email: email });
    if (!user) {
      const item = new User({
        _id: userId,
        firstName,
        lastName,
        email,
      });

      await item.save();

      return NextResponse.json(
        { message: 'User created successfully', user: item },
        { status: 201 }
      );
    }
    return NextResponse.json(
      { message: 'User already exist with this email.' },
      { status: 409 }
    );
  } catch (error) {
    console.log('error', error);
    return NextResponse.error(error.message, { status: 500 });
  }
};
