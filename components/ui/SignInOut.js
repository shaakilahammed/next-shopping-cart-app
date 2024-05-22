import { auth } from '@/auth';
import Link from 'next/link';
import SignOut from './SignOut';

const SignInOut = async () => {
    const session = await auth();
    return session && session?.user ? (
        <div className="flex">
            <div className="text-gray-200">
                Welcome,{' '}
                <Link
                    href="/account"
                    className="text-gray-200 hover:text-white transition"
                >
                    {session?.user?.name}
                </Link>{' '}
                |{' '}
            </div>

            <SignOut />
        </div>
    ) : (
        <Link
            href="/login"
            className="text-gray-200 hover:text-white transition"
        >
            Login
        </Link>
    );
};

export default SignInOut;
