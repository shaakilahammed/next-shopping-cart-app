import connectMongo from '@/dbConnect/connectMongo';
import Address from '@/models/Address';
import User from '@/models/User';
import verifyToken from '@/utils/verifyToken';
import bcrypt from 'bcryptjs';

import { NextResponse } from 'next/server';

export const GET = async (req) => {
    try {
        await connectMongo();

        const tokenVerification = await verifyToken(req);

        if (!tokenVerification.success) {
            return NextResponse.json(
                { success: false, message: tokenVerification?.message },
                { status: 401 }
            );
        }

        const decoded = tokenVerification.decoded;

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
        const tokenVerification = await verifyToken(req);

        if (!tokenVerification.success) {
            return NextResponse.json(
                { success: false, message: tokenVerification?.message },
                { status: 401 }
            );
        }

        const decoded = tokenVerification.decoded;

        const user = await User.findById(decoded.id);

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        const request = await req.json();

        user.name = request?.name || user.name;
        user.email = request?.email || user.email;
        user.phone = request?.phone || user.phone;
        user.image = request?.image || user.image;
        user.password =
            (request?.password && (await bcrypt.hash(request.password, 10))) ||
            user.password;

        if (request?.shippingAddress) {
            user.shippingAddress = request.shippingAddress;
        }

        if (request?.billingAddress) {
            user.billingAddress = request.billingAddress;
        }

        await user.save();

        return NextResponse.json(
            { success: true, data: user.toObject() },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        );
    }
};
