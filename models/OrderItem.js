import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema(
    {
        name: {
            required: true,
            type: String,
        },
        orderId: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
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

        colorId: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Color',
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
