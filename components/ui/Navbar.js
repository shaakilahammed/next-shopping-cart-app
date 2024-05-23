import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import CategoryMenu from '../category/CategoryMenu';
import SignInOut from './SignInOut';
const Navbar = () => {
    return (
        <nav className="bg-gray-800">
            <div className="container flex">
                <div className="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
                    <span className="text-white">
                        <FontAwesomeIcon icon={faBars} />
                    </span>
                    <span className="capitalize ml-2 text-white hidden">
                        All Categories
                    </span>

                    {/* <!-- dropdown --> */}
                    <CategoryMenu />
                </div>

                <div className="flex items-center justify-between flex-grow md:pl-12 py-5">
                    <div className="flex items-center space-x-6 capitalize">
                        <Link
                            href="/"
                            className="text-gray-200 hover:text-white transition"
                        >
                            Home
                        </Link>
                        <Link
                            href="/shop"
                            className="text-gray-200 hover:text-white transition"
                        >
                            Shop
                        </Link>
                        <Link
                            href="/about-us"
                            className="text-gray-200 hover:text-white transition"
                        >
                            About us
                        </Link>
                        <Link
                            href="/contact-us"
                            className="text-gray-200 hover:text-white transition"
                        >
                            Contact us
                        </Link>
                    </div>
                    <SignInOut />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
