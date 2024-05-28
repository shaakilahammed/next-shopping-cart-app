import connectMongo from '@/dbConnect/connectMongo';
import User from '@/models/User';
import { getTokens } from '@/utils/utils';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
export const POST = async (req) => {
    try {
        await connectMongo();
        const { email, password } = await req.json();
        const user = await User.findOne({
            email: email,
        }).lean();
        if (!user)
            return NextResponse.json(
                { message: 'User not found' },
                { status: 401 }
            );
        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect)
            return NextResponse.json(
                { message: 'Invalid password' },
                { status: 401 }
            );

        const tokens = await getTokens(user);

        const userResponse = {
            id: user._id,
            email: user.email,
            name: user.name,
            image: user.image,
            shippingAddress: user.shippingAddress,
            billingAddress: user.billingAddress,
        };

        return NextResponse.json(
            {
                user: userResponse,
                tokens,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        );
    }
};
