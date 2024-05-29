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

export const PUT = async (req) => {
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

        const user = await User.findById(decoded.id);

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        // Extract updated user data from request body
        const request = await req.json();

        // Update user details
        user.name = request.name || user.name;
        user.email = request.email || user.email;
        user.phone = request.email || user.phone;
        user.image = request.image || user.image;

        // Update user's shipping address if provided
        if (request.shippingAddress) {
            user.shippingAddress = request.shippingAddress;
        }

        // Update user's billing address if provided
        if (request.billingAddress) {
            user.billingAddress = request.billingAddress;
        }

        // Save updated user details
        await user.save();

        // Return updated user details
        return NextResponse.json({ data: user.toObject() }, { status: 200 });
    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        );
    }
};
