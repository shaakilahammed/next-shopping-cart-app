'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

const SocialLogin = ({ fromLogin = true }) => {
    const handleSocialLogin = async (provider) => {
        await signIn(provider, { callbackUrl: '/' });
    };
    return (
        <>
            <div className="mt-6 flex justify-center relative">
                <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">
                    {fromLogin ? 'Or login with' : 'Or signup with'}
                </div>
                <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
            </div>
            <div className="mt-4 flex gap-4">
                <button className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700">
                    facebook
                </button>
                <button
                    onClick={() => handleSocialLogin('google')}
                    className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500"
                >
                    google
                </button>
            </div>
            {fromLogin ? (
                <p className="mt-4 text-center text-gray-600">
                    Don&apos;t have account?{' '}
                    <Link href="/register" className="text-primary">
                        Register now
                    </Link>
                </p>
            ) : (
                <p className="mt-4 text-center text-gray-600">
                    Already have account?{' '}
                    <Link href="/login" className="text-primary">
                        Login now
                    </Link>
                </p>
            )}
        </>
    );
};

export default SocialLogin;
