import { getDictionary } from '@/lib/dictionaries';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import Search from '../filter/Search';
import CartButton from '../product/cart/CartButton';
import LanguageSwitcher from './LanguageSwitcher';
import WishListButton from './WishListButton';

const Header = async ({ locale }) => {
    const dict = await getDictionary(locale);

    return (
        <header className="py-4 shadow-sm bg-white">
            <div className="container flex items-center justify-between">
                <Link href={`/${locale}/`}>
                    <Image
                        src="/assets/images/logo.webp"
                        alt="Logo"
                        className="min-w-36"
                        width={144}
                        height={50}
                    />
                </Link>
                <Suspense>
                    <Search dict={dict} locale={locale} />
                </Suspense>

                <div className="flex items-center space-x-4">
                    <WishListButton
                        locale={locale}
                        text={dict.header.wishlist}
                    />
                    <CartButton locale={locale} text={dict.header.cart} />
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
