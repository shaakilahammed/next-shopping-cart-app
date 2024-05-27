import connectMongo from '@/dbConnect/connectMongo';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export const GET = async (request, { params }) => {
    const productId = params?.id;
    try {
        await connectMongo();
        const product = await Product.findById(productId)
            .select('_id categoryId')
            .lean();

        const relatedProducts = await Product.aggregate([
            { $match: { categoryId: product.categoryId } },
            { $sample: { size: 5 } },
            { $match: { _id: { $ne: product._id } } },
            { $limit: 4 },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    price: 1,
                    discountPrice: 1,
                    stock: 1,
                    images: 1,
                },
            },
        ]);
        if (relatedProducts) {
            return NextResponse.json({
                success: true,
                data: relatedProducts,
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
