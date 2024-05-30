import { auth } from '@/auth';
import { getDictionary } from '@/lib/dictionaries';
import { faEquals, faMultiply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import DeleteWishlistButton from '../DeleteWishlistButton';

const CartProductItem = async ({ locale, product }) => {
    const dict = await getDictionary(locale);
    const session = await auth();
    if (!session) {
        redirect(`/${locale}/login`);
    }
    return (
        <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
            <div className="w-28">
                <Image
                    src={product?.productId?.images[0]}
                    alt={product?.productId?.name}
                    className="w-full"
                    height={80}
                    width={100}
                />
            </div>
            <div className="w-1/3">
                <h2 className="text-gray-800 text-xl font-medium uppercase">
                    {product?.productId?.name}
                </h2>

                <p className="text-gray-500 text-sm">
                    {dict.productDetails.color}
                    {': '}
                    <span className="text-green-600">
                        {product?.colorId?.name}
                    </span>
                </p>
            </div>
            <div className="text-primary text-lg font-semibold">
                ${product?.productId?.discountPrice}
            </div>
            <FontAwesomeIcon icon={faMultiply} />
            <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                    -
                </div>
                <div className="h-8 w-8 text-base flex items-center justify-center">
                    {product?.quantity}
                </div>
                <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                    +
                </div>
            </div>
            <FontAwesomeIcon icon={faEquals} />

            <div className="text-green-500 text-lg font-semibold">
                ${product?.productId?.discountPrice * product?.quantity}
            </div>

            <DeleteWishlistButton
                accessToken={session?.tokens?.accessToken}
                productId={product?.productId?._id}
                colorId={product?.colorId?._id}
            />
        </div>
    );
};

export default CartProductItem;
