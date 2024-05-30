'use client';

import { createAddress, updateAddress } from '@/actions/address';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AddressForm = ({ texts, type, address, accessToken, locale }) => {
    const router = useRouter();
    const [pending, setPending] = useState(false);
    const [responseError, setResponseError] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState({
        name: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        country: '',
    });
    const [input, setInput] = useState({
        id: address?._id || '',
        name: address?.name || '',
        email: address?.email || '',
        phone: address?.phone || '',
        street: address?.street || '',
        city: address?.city || '',
        country: address?.country || '',
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setInput((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const formData = new FormData(e.currentTarget);
        // const input = Object.fromEntries(formData);
        const errors = {};
        let hasError = false;

        if (!input.name.trim()) {
            errors.name = 'Name is required';
            hasError = true;
        }

        if (!input.phone.trim()) {
            errors.phone = 'Phone is required';
            hasError = true;
        }

        if (!input.street.trim()) {
            errors.street = 'Street address is required';
            hasError = true;
        }

        if (!input.city.trim()) {
            errors.city = 'City is required';
            hasError = true;
        }

        if (!input.country.trim()) {
            errors.country = 'Country is required';
            hasError = true;
        }

        if (hasError) {
            setError(errors);
        } else {
            setError({
                name: '',
                email: '',
                phone: '',
                street: '',
                city: '',
                country: '',
            });

            try {
                setPending(true);
                setSuccess('');

                const response = address
                    ? await updateAddress(input.id, input, accessToken)
                    : await createAddress(type, input, accessToken);
                if (response.success) {
                    setPending(false);
                    setSuccess('Address updated successfully');

                    e.target.reset();
                    setResponseError('');
                    router.push(`/${locale}/account`);
                }
            } catch (error) {
                setPending(false);
                setResponseError('Something went wrong');
            }
        }
    };
    return (
        <form onSubmit={handleSubmit} method="post" autoComplete="off">
            {responseError && (
                <div className="flex py-1 my-1 bg-red-500 text-sm text-white px-2 rounded-sm">
                    {responseError}
                </div>
            )}
            {success && (
                <div className="flex py-1 my-1 bg-green-500 text-sm text-white px-2 rounded-sm">
                    {success}
                </div>
            )}

            <div className="space-y-2">
                <div>
                    <label htmlFor="name" className="text-gray-600 mb-2 block">
                        {texts.fullName}
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className={`block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400 ${
                            error.name && 'border-primary'
                        }`}
                        onChange={handleChange}
                        value={input.name}
                        placeholder="fulan fulana"
                    />
                    {error.name && (
                        <p className="text-sm text-red-500">{error.name}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="email" className="text-gray-600 mb-2 block">
                        {texts.emailAddress}
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className={`block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400 ${
                            error.email && 'border-primary'
                        }`}
                        onChange={handleChange}
                        value={input.email}
                        placeholder="youremail.@domain.com"
                    />
                    {error.email && (
                        <p className="text-sm text-red-500">{error.email}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="phone" className="text-gray-600 mb-2 block">
                        {texts.phoneNumber}
                    </label>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        className={`block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400 ${
                            error.phone && 'border-primary'
                        }`}
                        onChange={handleChange}
                        value={input.phone}
                        placeholder="01700000000"
                    />
                    {error.phone && (
                        <p className="text-sm text-red-500">{error.phone}</p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="street"
                        className="text-gray-600 mb-2 block"
                    >
                        {texts.streetAddress}
                    </label>
                    <input
                        type="text"
                        name="street"
                        id="street"
                        className={`block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400 ${
                            error.street && 'border-primary'
                        }`}
                        onChange={handleChange}
                        value={input.street}
                        placeholder="14/C Osman Goni Road"
                    />
                    {error.street && (
                        <p className="text-sm text-red-500">{error.street}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="city" className="text-gray-600 mb-2 block">
                        {texts.city}
                    </label>
                    <input
                        type="text"
                        name="city"
                        id="city"
                        className={`block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400 ${
                            error.city && 'border-primary'
                        }`}
                        onChange={handleChange}
                        value={input.city}
                        placeholder="Uttara, Dhaka"
                    />
                    {error.city && (
                        <p className="text-sm text-red-500">{error.city}</p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="country"
                        className="text-gray-600 mb-2 block"
                    >
                        {texts.country}
                    </label>
                    <input
                        type="text"
                        name="country"
                        id="country"
                        className={`block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400 ${
                            error.country && 'border-primary'
                        }`}
                        onChange={handleChange}
                        value={input.country}
                        placeholder="Bangladesh"
                    />
                    {error.country && (
                        <p className="text-sm text-red-500">{error.country}</p>
                    )}
                </div>
            </div>
            <div className="mt-4">
                <button
                    disabled={pending}
                    type="submit"
                    className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium disabled:cursor-not-allowed"
                >
                    {pending ? texts.loading : texts.change}
                </button>
            </div>
        </form>
    );
};

export default AddressForm;
