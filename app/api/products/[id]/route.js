import connectMongo from '@/dbConnect/connectMongo';
import Brand from '@/models/Brand';
import Category from '@/models/Category';
import Color from '@/models/Color';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export const GET = async (request, { params }) => {
    const productId = params?.id;
    try {
        await connectMongo();
        const product = await Product.findById(productId)
            .populate('brandId', null, Brand)
            .populate('categoryId', '_id name', Category)
            .populate('colors', '_id name', Color)
            .lean();
        if (product) {
            return NextResponse.json({
                success: true,
                data: product,
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
