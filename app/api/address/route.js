import connectMongo from '@/dbConnect/connectMongo';
import Address from '@/models/Address';
import { NextResponse } from 'next/server';

// POST endpoint to create a new address
export const POST = async (req) => {
    try {
        await connectMongo();
        const { name, email, phone, street, city, country } = await req.json();

        if (!name || !phone || !street || !city || !country) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'All required fields must be provided',
                },
                { status: 400 }
            );
        }

        const newAddress = new Address({
            name,
            email,
            phone,
            street,
            city,
            country,
        });

        const savedAddress = await newAddress.save();

        return NextResponse.json({
            success: true,
            data: savedAddress,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, data: null },
            { status: 500 }
        );
    }
};
export const PUT = async (req) => {
    try {
        await connectMongo();
        const {
            id,
            name,
            email,
            phone,
            street,
            city,
            country,
        } = await req.json();

        if (!id) {
            return NextResponse.json(
                { success: false, message: 'ID must be provided' },
                { status: 400 }
            );
        }

        const updatedAddress = await Address.findByIdAndUpdate(
            id,
            { name, email, phone, street, city, country },
            { new: true, runValidators: true }
        );

        if (!updatedAddress) {
            return NextResponse.json(
                { success: false, message: 'Address not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: updatedAddress,
        });
    } catch (error) {
        console.error('Error updating address:', error);
        return NextResponse.json(
            { success: false, data: null },
            { status: 500 }
        );
    }
};
