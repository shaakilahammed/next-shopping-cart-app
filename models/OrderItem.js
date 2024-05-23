import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema(
    {
        name: {
            required: true,
            type: String,
        },
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
        price: {
            required: true,
            type: Number,
        },
        total: {
            required: true,
            type: Number,
        },

        color: {
            default: null,
            type: String,
        },
        size: {
            default: null,
            type: String,
        },
    },
    { timestamps: true }
);

const OrderItem =
    mongoose.models.OrderItem || mongoose.model('OrderItem', OrderItemSchema);

export default OrderItem;
