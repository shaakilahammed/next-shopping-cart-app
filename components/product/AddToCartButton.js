'use client';
import { addToCart } from '@/actions/cart';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AddToCartButton = ({
    locale,
    cartText,
    quantity,
    colorId,
    productId,
}) => {
    const router = useRouter();
    const { data: session } = useSession();
    const handleClick = async () => {
        if (!session) {
            router.push(`${locale}/login`);
        }
        try {
            const response = await addToCart(
                session?.tokens?.accessToken,
                productId,
                colorId,
                quantity
            );
            if (response?.success) {
                router.push(`/${locale}/cart`);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <button
            onClick={handleClick}
            className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
        >
            {cartText}
        </button>
    );
};

export default AddToCartButton;
