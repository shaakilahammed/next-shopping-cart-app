import connectMongo from '@/dbConnect/connectMongo';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        await connectMongo();
        const products = await Product.aggregate([
            { $sample: { size: 4 } },
            {
                $lookup: {
                    from: 'colors',
                    localField: 'colors',
                    foreignField: '_id',
                    as: 'colors',
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    price: 1,
                    discountPrice: 1,
                    stock: 1,
                    images: 1,
                    'colors._id': 1,
                    'colors.name': 1,
                },
            },
        ]);
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
