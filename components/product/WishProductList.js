import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProductItem from './ProductItem';

const WishProductList = async ({ locale, products }) => {
    // console.log(products);
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
                <div className="flex flex-col justify-center items-center">
                    <FontAwesomeIcon icon={faHeart} className="text-[48px]" />
                    <span>Wishlist is empty! Please add some product.</span>
                </div>
            )}
        </div>
    );
};

export default WishProductList;
