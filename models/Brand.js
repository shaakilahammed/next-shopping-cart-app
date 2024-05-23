import mongoose from 'mongoose';

const BrandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

const Brand = mongoose.models.Brand || mongoose.model('Brand', BrandSchema);

export default Brand;
