import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import Ratings from '../ratings/Ratings';
import AddToCartButton from './AddToCartButton';
import AddWishlistButton from './AddWishlistButton';
import OutOfStock from './OutOfStock';

const ProductCard = ({ product, cartText, noRatingsText, locale }) => {
    return (
        <div className="bg-white shadow rounded overflow-hidden group flex flex-col justify-between">
            <div className="relative">
                <Image
                    src={product?.images[0]}
                    alt={product?.name}
                    className="w-full object-cover h-[250px]"
                    width={300}
                    height={200}
                />
                <div
                    className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
            justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
                >
                    <Link
                        href={`/${locale}/shop/${product?.id}`}
                        className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                        title="view product"
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Link>
                    <AddWishlistButton
                        locale={locale}
                        productId={product?.id}
                        color={product?.colors[0]}
                    />
                </div>
            </div>
            <div>
                {product?.colors &&
                    product?.colors?.length > 0 &&
                    product?.colors?.map((color) => (
                        <span
                            key={color?._id}
                            className="text-[10px] border border-primary rounded-sm px-1 py-0.5 shadow-sm text-primary mx-1"
                        >
                            {color.name}
                        </span>
                    ))}
            </div>
            <div className="pt-4 pb-3 px-4">
                <Link href={`/${locale}/shop/${product?.id}`}>
                    <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                        {product?.name}
                    </h4>
                </Link>

                <div className="flex items-baseline mb-1 space-x-2">
                    <p className="text-xl text-primary font-semibold">
                        ${product?.discountPrice}
                    </p>
                    <p className="text-sm text-gray-400 line-through">
                        ${product?.price}
                    </p>
                </div>
                <Ratings
                    productId={product?.id}
                    noRatingsText={noRatingsText}
                />
            </div>
            {product?.stock > 0 ? (
                <AddToCartButton
                    cartText={cartText}
                    locale={locale}
                    productId={product?.id}
                    colorId={product?.colors[0]._id}
                    quantity={1}
                />
            ) : (
                <OutOfStock locale={locale} />
            )}
        </div>
    );
};

export default ProductCard;
