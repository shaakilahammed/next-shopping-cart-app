import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
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
        shippingAddress: {
            default: null,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address',
        },
        billinAddress: {
            default: null,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address',
        },

        subTotal: {
            required: true,
            type: Number,
        },
        shippingCost: {
            default: 0,
            type: Number,
        },
        total: {
            required: true,
            type: Number,
        },
        address: {
            required: true,
            type: String,
        },
        phone: {
            required: true,
            type: String,
        },
        email: {
            default: null,
            type: String,
        },
    },
    { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

export default Order;
