import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        sku: {
            type: String,
            required: true,
        },
        categoryId: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        },
        brandId: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brand',
        },
        price: {
            type: Number,
            required: true,
        },
        discountPrice: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        shortDescription: {
            type: String,
            default: null,
        },
        description: {
            type: String,
            default: null,
        },
        images: {
            type: [String],
            default: null,
        },
        sizes: {
            type: [String],
            default: null,
        },
        colors: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Color',
            },
        ],
    },
    { timestamps: true }
);

const Product =
    mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;
