import Ratings from '@/components/ratings/Ratings';
import { replaceMongoIdInArray } from '@/utils/utils';
import {
    faFacebookF,
    faInstagram,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import AddWishList from './AddWishList';
import ProductColor from './ProductColor';

const ProductInfo = ({ product, texts, locale, color }) => {
    return (
        <div>
            <h2 className="text-3xl font-medium uppercase mb-2">
                {product?.name}
            </h2>
            <Ratings productId={product?.id} noRatingsText={texts.noRatings} />
            <div className="space-y-2 mt-4">
                <p className="text-gray-800 font-semibold space-x-2">
                    <span>{texts.availaility} </span>
                    {product?.stock > 0 ? (
                        <span className="text-green-600">{texts.inStock}</span>
                    ) : (
                        <span className="text-red-600">{texts.outOfStock}</span>
                    )}
                </p>
                <p className="space-x-2">
                    <span className="text-gray-800 font-semibold">
                        {texts.brand}{' '}
                    </span>
                    <span className="text-gray-600">
                        {product?.brandId?.name}
                    </span>
                </p>
                <p className="space-x-2">
                    <span className="text-gray-800 font-semibold">
                        {texts.category}{' '}
                    </span>
                    <span className="text-gray-600">
                        {product?.categoryId?.name}
                    </span>
                </p>
                <p className="space-x-2">
                    <span className="text-gray-800 font-semibold">
                        {texts.sku}{' '}
                    </span>
                    <span className="text-gray-600">{product?.sku}</span>
                </p>
            </div>
            <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                <p className="text-xl text-primary font-semibold">
                    ${product?.discountPrice}
                </p>
                <p className="text-base text-gray-400 line-through">
                    ${product?.price}
                </p>
            </div>

            <p className="mt-4 text-gray-600">
                <span className="font-semibold">{texts.note} </span>
                {product?.note}
            </p>

            <div className="mt-4">
                <h3 className="text-sm text-gray-800 uppercase mb-1">
                    {texts.quantity}
                </h3>
                <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                    <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                        -
                    </div>
                    <div className="h-8 w-8 text-base flex items-center justify-center">
                        1
                    </div>
                    <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                        +
                    </div>
                </div>
            </div>
            <ProductColor
                colors={replaceMongoIdInArray(product?.colors)}
                colorText={texts.color}
            />

            <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                <Link
                    href="#"
                    className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
                >
                    <FontAwesomeIcon icon={faBagShopping} /> {texts.addToCart}
                </Link>
                <AddWishList
                    text={texts.addToWishlist}
                    locale={locale}
                    productId={product?.id}
                    color={color}
                />
            </div>

            <div className="flex gap-3 mt-4">
                <Link
                    href="#"
                    className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
                >
                    <FontAwesomeIcon icon={faFacebookF} />
                </Link>
                <Link
                    href="#"
                    className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
                >
                    <FontAwesomeIcon icon={faTwitter} />
                </Link>
                <Link
                    href="#"
                    className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
                >
                    <FontAwesomeIcon icon={faInstagram} />
                </Link>
            </div>
        </div>
    );
};

export default ProductInfo;
