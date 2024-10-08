import connectMongo from '@/dbConnect/connectMongo';
import Color from '@/models/Color';
import Product from '@/models/Product';
import WishList from '@/models/WishList';
import verifyToken from '@/utils/verifyToken';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
    try {
        await connectMongo();

        const tokenVerification = await verifyToken(req);

        if (!tokenVerification.success) {
            return NextResponse.json(
                { success: false, message: tokenVerification?.message },
                { status: 401 }
            );
        }

        const { productId, colorId } = await req.json();
        if (!productId || !colorId) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Product ID and Color ID must be provided',
                },
                { status: 400 }
            );
        }

        const userId = tokenVerification.decoded.id;

        const existingWishListItem = await WishList.findOne({
            userId,
            productId,
            colorId,
        });

        if (existingWishListItem) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Product with this color already in wishlist',
                },
                { status: 400 }
            );
        }

        const newWishListItem = new WishList({
            userId,
            productId,
            colorId,
        });

        const savedWishListItem = await newWishListItem.save();

        return NextResponse.json(
            {
                success: true,
                data: savedWishListItem,
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Something went wrong' },
            { status: 500 }
        );
    }
};

export const GET = async (req) => {
    try {
        await connectMongo();

        const tokenVerification = await verifyToken(req);
        if (!tokenVerification.success) {
            return NextResponse.json(
                { success: false, message: tokenVerification?.message },
                { status: 401 }
            );
        }

        const userId = tokenVerification.decoded.id;

        const wishListItems = await WishList.find({ userId })
            .populate(
                'productId',
                '_id name stock images price discountPrice',
                Product
            )
            .populate('colorId', '_id name', Color)
            .lean();

        return NextResponse.json(
            {
                success: true,
                data: wishListItems,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Something went wrong' },
            { status: 500 }
        );
    }
};

export const DELETE = async (req) => {
    try {
        await connectMongo();

        const tokenVerification = await verifyToken(req);
        if (!tokenVerification.success) {
            return NextResponse.json(
                { success: false, message: tokenVerification?.message },
                { status: 401 }
            );
        }

        const { productId, colorId } = await req.json();
        if (!productId || !colorId) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Product ID and Color ID must be provided',
                },
                { status: 400 }
            );
        }

        const userId = tokenVerification.decoded.id;

        const deletedWishListItem = await WishList.findOneAndDelete({
            userId,
            productId,
            colorId,
        });

        if (!deletedWishListItem) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Wishlist item not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Wishlist item removed successfully',
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Something went wrong' },
            { status: 500 }
        );
    }
};
