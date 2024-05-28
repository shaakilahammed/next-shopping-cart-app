import connectMongo from '@/dbConnect/connectMongo';
import User from '@/models/User';
import { getTokens } from '@/utils/utils';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
export const POST = async (req) => {
    try {
        await connectMongo();
        const { refreshToken } = await req.json();

        const decoded = await jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET_KEY
        );

        if (!decoded) {
            return NextResponse.json(
                { message: 'Invalid refresh token' },
                { status: 401 }
            );
        }

        const user = await User.findById(decoded.id).lean();

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        const tokens = await getTokens(user);

        return NextResponse.json(
            {
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
