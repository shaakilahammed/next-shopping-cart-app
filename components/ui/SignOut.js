'use client';
import { signOut } from 'next-auth/react';

const SignOut = () => {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="text-gray-200 hover:text-white transition"
        >
            Logout
        </button>
    );
};

export default SignOut;
