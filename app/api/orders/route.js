import connectMongo from '@/dbConnect/connectMongo';
import Cart from '@/models/Cart';
import Order from '@/models/Order';
import OrderItem from '@/models/OrderItem';
import { calculateTotalAmount } from '@/utils/utils';
import verifyToken from '@/utils/verifyToken';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
    try {
        await connectMongo();

        const tokenVerification = await verifyToken(req);

        if (!tokenVerification.success) {
            return NextResponse.json(
                { success: false, message: tokenVerification?.message },
                { status: 401 }
            );
        }

        const {
            name,
            shippingAddress,
            billingAddress,
            shippingCost,
            address,
            phone,
            email,
            items,
        } = await req.json();

        if (!items || items.length === 0) {
            return NextResponse.json(
                { success: false, message: 'Order items must be provided' },
                { status: 400 }
            );
        }

        const subTotal = calculateTotalAmount(items).toFixed(2);
        const total = (+subTotal + (+shippingCost || 0)).toFixed(2);

        const userId = tokenVerification.decoded.id;

        // Create the order
        const newOrder = new Order({
            name,
            userId,
            shippingAddress,
            billingAddress,
            subTotal,
            shippingCost,
            total,
            address,
            phone,
            email,
        });

        const savedOrder = await newOrder.save();
        // Create and save order items
        const orderItems = items.map((item) => ({
            name: item.productId.name,
            orderId: savedOrder._id,
            userId: item.userId,
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price,
            total: (item.quantity * item.productId.price).toFixed(2),
            colorId: item.colorId._id,
        }));

        await OrderItem.insertMany(orderItems);

        const productIds = items.map((item) => item.productId._id);
        await Cart.deleteMany({ userId, productId: { $in: productIds } });

        return NextResponse.json(
            {
                success: true,
                data: savedOrder,
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Something went wrong' },
            { status: 500 }
        );
    }
};

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

        const userId = tokenVerification.decoded.id;

        const orders = await Order.find({ userId })
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json(
            {
                success: true,
                data: orders,
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
