import mongoose from 'mongoose';

const ColorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

const Color = mongoose.models.Color || mongoose.model('Color', ColorSchema);

export default Color;
