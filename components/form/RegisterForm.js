'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const RegisterForm = ({ texts }) => {
    const router = useRouter();
    const [pending, setPending] = useState(false);
    const [responseError, setResponseError] = useState('');
    const [error, setError] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        aggrement: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const input = Object.fromEntries(formData);
        const errors = {};
        let hasError = false;

        if (!input.name.trim()) {
            errors.name = 'Name is required';
            hasError = true;
        }

        if (!input.email.trim()) {
            errors.email = 'Email is required';
            hasError = true;
        } else if (!/\S+@\S+\.\S+/.test(input.email)) {
            errors.email = 'Email is invalid';
            hasError = true;
        }

        if (!input.password) {
            errors.password = 'Password is required';
            hasError = true;
        } else if (input.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
            hasError = true;
        }

        if (input.confirm !== input.password) {
            errors.confirm = 'Passwords do not match';
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
                password: '',
                confirmPassword: '',
                aggrement: '',
            });

            try {
                setPending(true);
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(input),
                });
                if (response.ok) {
                    setPending(false);
                    e.target.reset();
                    setResponseError('');
                    router.push('/login');
                } else {
                    const errorData = await response.json();
                    setResponseError(errorData.message);
                    setPending(false);
                }
            } catch (error) {
                setPending(false);
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
                        placeholder="fulan fulana"
                    />
                    {error.name && (
                        <p className="text-sm text-red-500">{error.name}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="email" className="text-gray-600 mb-2 block">
                        {texts.email}
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className={`block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400 ${
                            error.email && 'border-primary'
                        }`}
                        placeholder="youremail.@domain.com"
                    />
                    {error.email && (
                        <p className="text-sm text-red-500">{error.email}</p>
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
                        placeholder="*******"
                    />
                    {error.confirm && (
                        <p className="text-sm text-red-500">{error.confirm}</p>
                    )}
                </div>
            </div>
            <div className="mt-6">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="aggrement"
                        id="aggrement"
                        className={`text-primary focus:ring-0 rounded-sm cursor-pointer ${
                            error.aggrement && 'border-primary'
                        }`}
                    />
                    <label
                        htmlFor="aggrement"
                        className="text-gray-600 ml-3 cursor-pointer"
                    >
                        {texts.aggrement}{' '}
                        <a href="#" className="text-primary">
                            {texts.termsConditions}
                        </a>
                    </label>
                </div>
                {error.aggrement && (
                    <p className="text-sm text-red-500">{error.aggrement}</p>
                )}
            </div>
            <div className="mt-4">
                <button
                    disabled={pending}
                    type="submit"
                    className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium disabled:cursor-not-allowed"
                >
                    {pending ? texts.loading : texts.title}
                </button>
            </div>
        </form>
    );
};

export default RegisterForm;
