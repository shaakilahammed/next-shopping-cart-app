import connectMongo from '@/dbConnect/connectMongo';
import Category from '@/models/Category';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        await connectMongo();
        const categories = await Category.find().lean();
        if (categories) {
            return NextResponse.json({
                success: true,
                data: categories,
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
