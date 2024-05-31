import { getCart } from '@/actions/cart';
import { getDictionary } from '@/lib/dictionaries';
import { calculateTotalAmount } from '@/utils/utils';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import CartProductItem from './CartProductItem';

const CartProductList = async ({ locale, accessToken }) => {
    const products = await getCart(accessToken);
    const dict = await getDictionary(locale);

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
                    <div className="flex items-center justify-end border gap-6 p-4 border-gray-200 rounded">
                        <div className="text-primary text-xl font-extrabold">
                            {dict?.checkout?.total}
                            {': '}
                            <span className="text-3xl text-green-500 mx-2">
                                ${calculateTotalAmount(products).toFixed(2)}
                            </span>
                        </div>
                        <Link
                            href={`/${locale}/checkout`}
                            className="block  py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
                        >
                            {dict?.checkout?.procced}
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
