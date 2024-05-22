import connectMongo from '@/dbConnect/connectMongo';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
export const POST = async (req) => {
    try {
        await connectMongo();
        const { name, email, password } = await req.json();
        const exists = await User.findOne({ email: email });
        if (exists) {
            return NextResponse.json(
                { message: 'User already exist, Login now!' },
                { status: 500 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({ name, email, password: hashedPassword });
        return NextResponse.json(
            { message: 'User Registered Successfully' },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        );
    }
};
