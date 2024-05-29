import connectMongo from '@/dbConnect/connectMongo';
import Address from '@/models/Address';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export const GET = async (req) => {
    try {
        await connectMongo();

        const accessToken = req.headers.get('authorization')?.split(' ')[1];

        if (!accessToken) {
            return NextResponse.json(
                { message: 'Access token required' },
                { status: 401 }
            );
        }

        const decoded = await jwt.verify(accessToken, process.env.SECRET_KEY);

        if (!decoded) {
            return NextResponse.json(
                { message: 'Invalid access token' },
                { status: 401 }
            );
        }

        const user = await User.findById(decoded.id)
            .populate('shippingAddress', null, Address)
            .populate('billingAddress', null, Address)
            .lean();

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        // Remove sensitive information before sending the response
        // eslint-disable-next-line no-unused-vars
        const { password, ...userDetails } = user;

        return NextResponse.json({ data: userDetails }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        );
    }
};
