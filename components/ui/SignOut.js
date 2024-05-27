'use client';
import { signOut } from 'next-auth/react';

const SignOut = ({ text }) => {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="text-gray-200 hover:text-white transition"
        >
            {' '}
            {text}
        </button>
    );
};

export default SignOut;
