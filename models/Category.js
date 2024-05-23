import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            default: null,
        },
        image: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

const Category =
    mongoose.models.Category || mongoose.model('Category', CategorySchema);

export default Category;
