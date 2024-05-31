'use client';
import { createOrder } from '@/actions/order';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import OrderSummary from '../order/OrderSummary';

const CheckoutForm = ({ texts, address, cart, billingAddress, locale }) => {
    const router = useRouter();
    const { data: session } = useSession();
    if (!session) router.push(`/${locale}/login`);
    const accessToken = session?.tokens?.accessToken;
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
        aggrement: '',
    });
    const [input, setInput] = useState({
        name: address?.name || '',
        email: address?.email || '',
        phone: address?.phone || '',
        street: address?.street || '',
        city: address?.city || '',
        country: address?.country || '',
        aggrement: '',
    });
    const handleChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === 'aggrement') value = e.target.checked;
        setInput((prev) => ({ ...prev, [name]: value }));
    };

    const handleSumit = async (e) => {
        e.preventDefault();
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

        if (!input.aggrement) {
            errors.aggrement = 'You must agree to the terms & conditions';
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
                const orderDetails = {};
                orderDetails.name = input.name;
                orderDetails.shippingCost = 0;
                orderDetails.shippingAddress = address?._id;
                orderDetails.billingAddress = billingAddress?._id;
                orderDetails.address =
                    input.street + ', ' + input.city + ', ' + input.country;
                orderDetails.phone = input.phone;
                orderDetails.email = input.email;
                orderDetails.items = cart;
                const response = await createOrder(accessToken, orderDetails);
                if (response.success) {
                    setPending(true);
                    setSuccess('order created successfully');

                    e.target.reset();
                    setResponseError('');
                    router.push(`/${locale}/account`);
                } else {
                    setResponseError('Cart items is expired! please add again');
                }
            } catch (error) {
                setPending(false);
                setResponseError('Something went wrong');
            }
        }
    };
    return (
        <form
            onSubmit={handleSumit}
            className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6"
        >
            <div className="col-span-7 border border-gray-200 p-4 rounded">
                <h3 className="text-lg font-medium capitalize mb-4">
                    {texts.checkout}
                </h3>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="full-name" className="text-gray-600">
                            {texts.fullName}{' '}
                            <span className="text-primary">*</span>
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
                        <label htmlFor="phone" className="text-gray-600">
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
                            <p className="text-sm text-red-500">
                                {error.phone}
                            </p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="email" className="text-gray-600">
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
                            <p className="text-sm text-red-500">
                                {error.email}
                            </p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="street" className="text-gray-600">
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
                            <p className="text-sm text-red-500">
                                {error.street}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="city" className="text-gray-600">
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
                        <label htmlFor="country" className="text-gray-600">
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
                            <p className="text-sm text-red-500">
                                {error.country}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <OrderSummary
                texts={texts}
                cart={cart}
                input={input}
                onChange={handleChange}
                error={error}
                pending={pending}
                responseError={responseError}
                success={success}
            />
        </form>
    );
};

export default CheckoutForm;
