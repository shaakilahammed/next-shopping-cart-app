import { auth } from '@/auth';
import { getDictionary } from '@/lib/dictionaries';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import DeleteWishlistButton from './DeleteWishlistButton';

const ProductItem = async ({ locale, product }) => {
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
                    {dict.productDetails.availaility}{' '}
                    {product?.productId?.stock > 0 ? (
                        <span className="text-green-600">
                            {dict.productDetails.inStock}
                        </span>
                    ) : (
                        <span className="text-red-600">
                            {dict.productDetails.outOfStock}
                        </span>
                    )}
                </p>
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
            <Link
                href="#"
                className="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
            >
                {dict.productDetails.addToCart}
            </Link>

            <DeleteWishlistButton
                accessToken={session?.tokens?.accessToken}
                productId={product?.productId?._id}
                colorId={product?.colorId?._id}
            />
        </div>
    );
};

export default ProductItem;
