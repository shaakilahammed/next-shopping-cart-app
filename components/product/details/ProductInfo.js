import Ratings from '@/components/ratings/Ratings';
import { replaceMongoIdInArray } from '@/utils/utils';
import OutOfStock from '../OutOfStock';
import AddCart from './AddCart';
import AddWishList from './AddWishList';
import CartQuantity from './CartQuantity';
import ProductColor from './ProductColor';
import SocialShare from './SocialShare';

const ProductInfo = ({ product, texts, locale, color, quantity }) => {
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

            <CartQuantity
                text={texts.quantity}
                initialQuantity={quantity}
                initialProductStock={product?.stock}
            />
            <ProductColor
                colors={replaceMongoIdInArray(product?.colors)}
                colorText={texts.color}
            />

            <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                {product?.stock > 0 ? (
                    <AddCart
                        text={texts.addToCart}
                        locale={locale}
                        productId={product?.id}
                        colorId={color}
                        quantity={quantity}
                    />
                ) : (
                    <OutOfStock locale={locale} fromWishList={true} />
                )}

                <AddWishList
                    text={texts.addToWishlist}
                    locale={locale}
                    productId={product?.id}
                    color={color}
                />
            </div>

            <SocialShare productId={product?.id} />
        </div>
    );
};

export default ProductInfo;
