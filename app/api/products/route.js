import connectMongo from '@/dbConnect/connectMongo';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        await connectMongo();
        const products = await Product.find()
            .select('_id name price discountPrice stock images')
            .lean();
        if (products) {
            return NextResponse.json({
                success: true,
                data: products,
            });
        } else {
            return NextResponse.json(
                { success: false, data: null },
                { status: 404 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { success: false, data: null },
            { status: 400 }
        );
    }
};
