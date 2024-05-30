'use client';

import { updateMyProfile } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ProfileForm = ({ texts, profile, accessToken, locale }) => {
    const router = useRouter();
    const [pending, setPending] = useState(false);
    const [responseError, setResponseError] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirm: '',
    });
    const [input, setInput] = useState({
        id: profile?.id || '',
        name: profile?.name || '',
        email: profile?.email || '',
        phone: profile?.phone || '',
        password: '',
        confirm: '',
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setInput((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
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

        if (!input.email.trim()) {
            errors.email = 'Email is required';
            hasError = true;
        } else if (!/\S+@\S+\.\S+/.test(input.email)) {
            errors.email = 'Email is invalid';
            hasError = true;
        }

        if (input.password) {
            if (input.password.length < 6) {
                errors.password = 'Password must be at least 6 characters';
                hasError = true;
            }

            if (input.confirm !== input.password) {
                errors.confirm = 'Passwords do not match';
                hasError = true;
            }
        }

        if (hasError) {
            setError(errors);
        } else {
            setError({
                name: '',
                email: '',
                phone: '',
                password: '',
                confirm: '',
            });

            try {
                setPending(true);
                setSuccess('');

                const response = await updateMyProfile(accessToken, {
                    name: input.name,
                    email: input.email,
                    phone: input.phone,
                    password: input.password,
                });

                if (response.success) {
                    setPending(false);
                    setSuccess('Profile updated successfully');

                    e.target.reset();
                    setResponseError('');
                    router.push(`/${locale}/account`);
                } else {
                    setResponseError(
                        response.message || 'Something went wrong'
                    );
                    setPending(false);
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
                        htmlFor="password"
                        className="text-gray-600 mb-2 block"
                    >
                        {texts.password}
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className={`block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400 ${
                            error.password && 'border-primary'
                        }`}
                        onChange={handleChange}
                        value={input.password}
                        placeholder="*******"
                    />
                    {error.password && (
                        <p className="text-sm text-red-500">{error.password}</p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="confirm"
                        className="text-gray-600 mb-2 block"
                    >
                        {texts.confirmPassword}
                    </label>
                    <input
                        type="password"
                        name="confirm"
                        id="confirm"
                        className={`block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400 ${
                            error.confirm && 'border-primary'
                        }`}
                        onChange={handleChange}
                        value={input.confirm}
                        placeholder="*******"
                    />
                    {error.confirm && (
                        <p className="text-sm text-red-500">{error.confirm}</p>
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

export default ProfileForm;
