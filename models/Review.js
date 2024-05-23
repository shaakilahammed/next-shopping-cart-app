import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
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
        rating: {
            required: true,
            type: Number,
        },
        review: {
            required: true,
            type: String,
        },
    },
    { timestamps: true }
);

const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);

export default Review;
