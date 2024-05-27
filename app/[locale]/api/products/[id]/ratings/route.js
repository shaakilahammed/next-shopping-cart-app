import connectMongo from '@/dbConnect/connectMongo';
import Review from '@/models/Review';
import { NextResponse } from 'next/server';

export const GET = async (request, { params }) => {
    const productId = params?.id;
    try {
        await connectMongo();
        const ratings = await Review.find({ productId: productId }).lean();
        if (ratings) {
            return NextResponse.json({
                success: true,
                data: ratings,
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
