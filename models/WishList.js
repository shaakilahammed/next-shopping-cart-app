import mongoose from 'mongoose';

const WishListSchema = new mongoose.Schema(
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
    },
    { timestamps: true }
);

const WishList =
    mongoose.models.WishList || mongoose.model('WishList', WishListSchema);

export default WishList;
