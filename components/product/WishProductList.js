import { getWishlist } from '@/actions/wish-list';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProductItem from './ProductItem';

const WishProductList = async ({ locale, accessToken }) => {
    const products = await getWishlist(accessToken);
    return (
        <div className="mx-auto space-y-4 max-w-6xl">
            {products?.length > 0 ? (
                products?.map((product) => (
                    <ProductItem
                        key={product?._id}
                        product={product}
                        locale={locale}
                    />
                ))
            ) : (
                <div className="flex flex-col justify-center items-center my-10">
                    <FontAwesomeIcon icon={faHeart} className="text-[48px]" />
                    <span>Wishlist is empty! Please add some product.</span>
                </div>
            )}
        </div>
    );
};

export default WishProductList;
