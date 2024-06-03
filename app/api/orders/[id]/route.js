import connectMongo from '@/dbConnect/connectMongo';
import Color from '@/models/Color';
import Order from '@/models/Order';
import OrderItem from '@/models/OrderItem';
import Product from '@/models/Product';
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

        // Fetch the order
        const order = await Order.findOne({ _id: orderId, userId }).lean();

        if (!order) {
            return NextResponse.json(
                { success: false, message: 'Order not found' },
                { status: 404 }
            );
        }

        // Fetch the order items separately
        const orderItems = await OrderItem.find({ userId, orderId })
            .populate('colorId', null, Color)
            .populate('productId', 'images name', Product)
            .lean();

        // Combine order and orderItems in the response
        return NextResponse.json(
            {
                success: true,
                data: { ...order, orderItems },
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: 'Something went wrong',
                error: error.message,
            },
            { status: 500 }
        );
    }
};
