import connectMongo from '@/dbConnect/connectMongo';
import Color from '@/models/Color';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        await connectMongo();
        const colors = await Color.find().lean();
        if (colors) {
            return NextResponse.json({
                success: true,
                data: colors,
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
