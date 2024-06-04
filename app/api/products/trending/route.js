import connectMongo from '@/dbConnect/connectMongo';
import Color from '@/models/Color';
import Product from '@/models/Product';
import Review from '@/models/Review';
import { getAverageRating } from '@/utils/utils';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        await connectMongo();

        const products = await Product.find().lean();

        const ratings = await Review.find().lean();

        const colors = await Color.find().lean();

        const productRatingsMap = ratings.reduce((acc, rating) => {
            if (!acc[rating.productId]) acc[rating.productId] = [];
            acc[rating.productId].push(rating);
            return acc;
        }, {});

        const productColorsMap = colors.reduce((acc, color) => {
            acc[color._id] = color;
            return acc;
        }, {});

        const productsWithDetails = products.map((product) => {
            const productRatings = productRatingsMap[product._id] || [];
            const averageRating = getAverageRating(productRatings);

            const productColors = product.colors
                .map((colorId) => productColorsMap[colorId])
                .filter(Boolean);

            return { ...product, averageRating, colors: productColors };
        });

        productsWithDetails.sort((a, b) => b.averageRating - a.averageRating);

        const topProducts = productsWithDetails.slice(0, 4);

        return NextResponse.json({
            success: true,
            data: topProducts,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, data: null },
            { status: 400 }
        );
    }
};
