import { auth } from '@/auth';
import Link from 'next/link';
import SignOut from './SignOut';

const SignInOut = async ({ dict }) => {
    const session = await auth();
    return session && session?.user ? (
        <div className="flex">
            <div className="text-gray-200">
                {dict.navbar.welcome},{' '}
                <Link
                    href="/account"
                    className="text-gray-200 hover:text-white transition"
                >
                    {session?.user?.name}
                </Link>{' '}
                |{' '}
            </div>
            <SignOut text={dict.navbar.logout} />
        </div>
    ) : (
        <Link
            href="/login"
            className="text-gray-200 hover:text-white transition"
        >
            {dict.navbar.login}
        </Link>
    );
};

export default SignInOut;
