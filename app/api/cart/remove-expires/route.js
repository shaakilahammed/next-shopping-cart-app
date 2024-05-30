import connectMongo from '@/dbConnect/connectMongo';
import Cart from '@/models/Cart';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        await connectMongo();
        const now = new Date();
        const expiredItems = await Cart.find({ expiresAt: { $lte: now } });

        for (const item of expiredItems) {
            const product = await Product.findById(item.productId);
            if (product) {
                product.stock += item.quantity;
                await product.save();
            }
            await Cart.deleteOne({ _id: item._id });
        }
        return NextResponse.json(
            { success: true, message: 'Expired items removed' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Failed to remove expired items' },
            { status: 500 }
        );
    }
};
