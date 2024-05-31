import connectMongo from '@/dbConnect/connectMongo';
import Order from '@/models/Order';
import verifyToken from '@/utils/verifyToken';
import { NextResponse } from 'next/server';

export const GET = async (req, { params }) => {
    const orderId = params?.id;
    try {
        await connectMongo();

        const tokenVerification = await verifyToken(req);

        if (!tokenVerification.success) {
            return NextResponse.json(
                { success: false, message: tokenVerification?.message },
                { status: 401 }
            );
        }

        const userId = tokenVerification.decoded.id;

        const order = await Order.findOne({ _id: orderId, userId })
            .populate('orderItems')
            .lean();

        if (!order) {
            return NextResponse.json(
                { success: false, message: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                data: order,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Something went wrong' },
            { status: 500 }
        );
    }
};
