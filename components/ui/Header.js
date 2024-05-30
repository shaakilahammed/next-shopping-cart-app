import { getDictionary } from '@/lib/dictionaries';
import { faBagShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import Search from '../filter/Search';
import LanguageSwitcher from './LanguageSwitcher';

const Header = async ({ locale }) => {
    const dict = await getDictionary(locale);

    return (
        <header className="py-4 shadow-sm bg-white">
            <div className="container flex items-center justify-between">
                <Link href={`/${locale}/`}>
                    <Image
                        src="/assets/images/logo.svg"
                        alt="Logo"
                        className="min-w-32"
                        width={128}
                        height={40}
                    />
                </Link>
                <Suspense>
                    <Search dict={dict} locale={locale} />
                </Suspense>

                <div className="flex items-center space-x-4">
                    {/* <WishListButton
                        locale={locale}
                        text={dict.header.wishlist}
                    /> */}
                    <Link
                        href={`/${locale}/checkout`}
                        className="text-center text-gray-700 hover:text-primary transition relative"
                    >
                        <div className="text-2xl">
                            <FontAwesomeIcon icon={faBagShopping} />
                        </div>
                        <div className="text-xs leading-3">
                            {dict.header.cart}
                        </div>
                        <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                            2
                        </div>
                    </Link>
                    <Link
                        href={`/${locale}/account`}
                        className="text-center text-gray-700 hover:text-primary transition relative"
                    >
                        <div className="text-2xl">
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <div className="text-xs leading-3">
                            {dict.header.account}
                        </div>
                    </Link>
                    <LanguageSwitcher locale={locale} />
                </div>
            </div>
        </header>
    );
};

export default Header;
