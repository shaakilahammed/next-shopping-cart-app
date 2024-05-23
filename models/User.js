import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            required: true,
            type: String,
        },
        image: {
            default: null,
            type: String,
        },
        phone: {
            required: false,
            type: String,
        },
        shippingAddress: {
            default: null,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address',
        },
        billingAddress: {
            default: null,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address',
        },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
