'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import SignOut from './SignOut';

const SignInOut = ({ dict, locale }) => {
    const { data: session } = useSession();

    return session && session?.user ? (
        <div className="flex">
            <div className="text-gray-200">
                {dict.navbar.welcome},{' '}
                <Link
                    href={`/${locale}/account`}
                    className="text-gray-200 hover:text-white transition"
                >
                    {session?.user?.name}
                </Link>{' '}
                |{' '}
            </div>
            <SignOut text={dict.navbar.logout} locale={locale} />
        </div>
    ) : (
        <Link
            href={`/${locale}/login`}
            className="text-gray-200 hover:text-white transition"
        >
            {dict.navbar.login}
        </Link>
    );
};

export default SignInOut;
