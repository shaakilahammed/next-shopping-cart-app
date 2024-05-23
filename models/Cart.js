import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema(
    {
        userId: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        productId: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        quantity: {
            required: true,
            type: Number,
        },
    },
    { timestamps: true }
);

const Cart = mongoose.models.Cart || mongoose.model('Cart', CartSchema);

export default Cart;
