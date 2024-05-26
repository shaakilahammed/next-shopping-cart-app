import connectMongo from '@/dbConnect/connectMongo';
import Product from '@/models/Product';
import { refinedURI } from '@/utils/utils';
import { NextResponse } from 'next/server';

export const GET = async (request) => {
    const params = request.nextUrl.searchParams;
    const query = refinedURI(params.get('q') || '');
    const regex = new RegExp(query, 'i');

    const categories = refinedURI(params.get('category') || '');
    try {
        await connectMongo();

        const productQuery = { name: { $regex: regex } };
        if (categories) {
            const categoriesToMatch = categories.split('|');
            productQuery.categoryId = { $in: categoriesToMatch };
        }
        console.log(productQuery);

        const products = await Product.find(productQuery)
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
