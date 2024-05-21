import {
    faFacebookSquare,
    faGithubSquare,
    faInstagramSquare,
    faTwitterSquare,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-white pt-16 pb-12 border-t border-gray-100">
            <div className="container grid grid-cols-1 ">
                <div className="col-span-1 space-y-4">
                    <Image
                        src="/assets/images/logo.svg"
                        alt="logo"
                        className="w-40"
                        width={160}
                        height={160}
                    />
                    <div className="mr-2">
                        <p className="text-gray-500">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quia, hic?
                        </p>
                    </div>
                    <div className="flex space-x-5">
                        <Link
                            href="#"
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <FontAwesomeIcon icon={faFacebookSquare} />
                        </Link>
                        <Link
                            href="#"
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <FontAwesomeIcon icon={faInstagramSquare} />
                        </Link>
                        <Link
                            href="#"
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <FontAwesomeIcon icon={faTwitterSquare} />
                        </Link>
                        <Link
                            href="#"
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <FontAwesomeIcon icon={faGithubSquare} />
                        </Link>
                    </div>
                </div>

                <div className="col-span-2 grid grid-cols-2 gap-4">
                    <div className="grid grid-cols-2 gap-4 md:gap-8">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                                Solutions
                            </h3>
                            <div className="mt-4 space-y-4">
                                <Link
                                    href="#"
                                    className="text-base text-gray-500 hover:text-gray-900 block"
                                >
                                    Marketing
                                </Link>
                                <Link
                                    href="#"
                                    className="text-base text-gray-500 hover:text-gray-900 block"
                                >
                                    Analitycs
                                </Link>
                                <Link
                                    href="#"
                                    className="text-base text-gray-500 hover:text-gray-900 block"
                                >
                                    Commerce
                                </Link>
                                <Link
                                    href="#"
                                    className="text-base text-gray-500 hover:text-gray-900 block"
                                >
                                    Insights
                                </Link>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                                Support
                            </h3>
                            <div className="mt-4 space-y-4">
                                <Link
                                    href="#"
                                    className="text-base text-gray-500 hover:text-gray-900 block"
                                >
                                    Pricing
                                </Link>
                                {/* <!-- <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Documentation</a> --> */}
                                <Link
                                    href="#"
                                    className="text-base text-gray-500 hover:text-gray-900 block"
                                >
                                    Guides
                                </Link>
                                <Link
                                    href="#"
                                    className="text-base text-gray-500 hover:text-gray-900 block"
                                >
                                    API Status
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                                Solutions
                            </h3>
                            <div className="mt-4 space-y-4">
                                <Link
                                    href="#"
                                    className="text-base text-gray-500 hover:text-gray-900 block"
                                >
                                    Marketing
                                </Link>
                                <Link
                                    href="#"
                                    className="text-base text-gray-500 hover:text-gray-900 block"
                                >
                                    Analitycs
                                </Link>
                                <Link
                                    href="#"
                                    className="text-base text-gray-500 hover:text-gray-900 block"
                                >
                                    Commerce
                                </Link>
                                <Link
                                    href="#"
                                    className="text-base text-gray-500 hover:text-gray-900 block"
                                >
                                    Insights
                                </Link>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                                Support
                            </h3>
                            <div className="mt-4 space-y-4">
                                <Link
                                    href="#"
                                    className="text-base text-gray-500 hover:text-gray-900 block"
                                >
                                    Pricing
                                </Link>
                                {/* <!-- <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Documentation</a> --> */}
                                <Link
                                    href="#"
                                    className="text-base text-gray-500 hover:text-gray-900 block"
                                >
                                    Guides
                                </Link>
                                <Link
                                    href="#"
                                    className="text-base text-gray-500 hover:text-gray-900 block"
                                >
                                    API Status
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
