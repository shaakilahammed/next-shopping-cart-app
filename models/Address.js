import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            default: null,
        },
        phone: {
            required: true,
            type: String,
        },
        street: {
            required: true,
            type: String,
        },
        city: {
            required: true,
            type: String,
        },
        country: {
            required: true,
            type: String,
        },
    },
    { timestamps: true }
);

const Address =
    mongoose.models.Address || mongoose.model('Address', AddressSchema);

export default Address;
