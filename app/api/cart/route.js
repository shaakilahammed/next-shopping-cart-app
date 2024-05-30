import connectMongo from '@/dbConnect/connectMongo';
import Cart from '@/models/Cart';
import Color from '@/models/Color';
import Product from '@/models/Product';
import { convertDurationToMilliseconds } from '@/utils/utils';
import verifyToken from '@/utils/verifyToken';
import { NextResponse } from 'next/server';
const CART_EXPIRES_IN = process.env.CART_EXPIRES_IN;
const cartExpiryMilliseconds = convertDurationToMilliseconds(CART_EXPIRES_IN);
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

        const { productId, colorId, quantity } = await req.json();

        if (!productId || !colorId || !quantity) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        'Product ID, Quantity, and Color ID must be provided',
                },
                { status: 400 }
            );
        }

        const product = await Product.findById(productId);

        if (!product) {
            return NextResponse.json(
                { success: false, message: 'Product not found' },
                { status: 404 }
            );
        }

        if (product.stock < quantity) {
            return NextResponse.json(
                { success: false, message: 'Insufficient stock available' },
                { status: 400 }
            );
        }

        const userId = tokenVerification.decoded.id;

        const existingCartItem = await Cart.findOne({
            userId,
            productId,
            colorId,
        });

        let savedCartItem;
        if (existingCartItem) {
            if (product.stock < existingCartItem.quantity + quantity) {
                return NextResponse.json(
                    { success: false, message: 'Insufficient stock available' },
                    { status: 400 }
                );
            }
            existingCartItem.quantity += quantity;
            existingCartItem.expiresAt = new Date(
                Date.now() + cartExpiryMilliseconds
            );
            savedCartItem = await existingCartItem.save();
        } else {
            const newCartItem = new Cart({
                userId,
                productId,
                colorId,
                quantity,
                expiresAt: new Date(Date.now() + cartExpiryMilliseconds),
            });
            savedCartItem = await newCartItem.save();
        }

        product.stock -= quantity;
        await product.save();

        return NextResponse.json(
            {
                success: true,
                data: savedCartItem,
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

        const cartItems = await Cart.find({ userId })
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
                data: cartItems,
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

export const PUT = async (req) => {
    try {
        await connectMongo();

        const tokenVerification = await verifyToken(req);
        if (!tokenVerification.success) {
            return NextResponse.json(
                { success: false, message: tokenVerification?.message },
                { status: 401 }
            );
        }

        const { productId, colorId, newQuantity } = await req.json();
        if (
            !productId ||
            !colorId ||
            typeof newQuantity !== 'number' ||
            newQuantity <= 0
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        'Product ID, Color ID, and valid new quantity must be provided',
                },
                { status: 400 }
            );
        }

        const userId = tokenVerification.decoded.id;

        const cartItem = await Cart.findOne({
            userId,
            productId,
            colorId,
        });

        if (!cartItem) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Cart item not found',
                },
                { status: 404 }
            );
        }

        const product = await Product.findById(productId);
        if (!product) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Product not found',
                },
                { status: 404 }
            );
        }

        const quantityDifference = newQuantity - cartItem.quantity;

        if (product.stock < quantityDifference) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Insufficient stock',
                },
                { status: 400 }
            );
        }

        product.stock -= quantityDifference;
        await product.save();

        cartItem.quantity = newQuantity;
        await cartItem.save();

        return NextResponse.json(
            {
                success: true,
                message: 'Cart item quantity updated successfully',
                data: cartItem,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
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

        const deletedCartItem = await Cart.findOneAndDelete({
            userId,
            productId,
            colorId,
        });

        if (!deletedCartItem) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Cart item not found',
                },
                { status: 404 }
            );
        }

        const product = await Product.findById(productId);
        if (product) {
            product.stock += deletedCartItem.quantity;
            await product.save();
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Cart item removed successfully',
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
