import { getCart } from '@/actions/cart';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import CartProductItem from './CartProductItem';

const CartProductList = async ({ locale, accessToken }) => {
    const products = await getCart(accessToken);
    return (
        <div className="mx-auto space-y-4 max-w-6xl">
            {products?.length > 0 ? (
                <>
                    {products?.map((product) => (
                        <CartProductItem
                            key={product?._id}
                            product={product}
                            locale={locale}
                        />
                    ))}
                    <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
                        <div className="text-green-500 text-lg font-extrabold">
                            Total: $256
                        </div>
                        <Link
                            href="#"
                            className="block  py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
                        >
                            Proceed to checkout
                        </Link>
                    </div>
                </>
            ) : (
                <div className="flex flex-col justify-center items-center my-10">
                    <FontAwesomeIcon
                        icon={faShoppingBag}
                        className="text-[48px]"
                    />
                    <span>Cart is empty! Please add some product.</span>
                </div>
            )}
        </div>
    );
};

export default CartProductList;
