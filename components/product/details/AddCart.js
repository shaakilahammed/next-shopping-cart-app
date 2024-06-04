'use client';
import { addToCart } from '@/actions/cart';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AddCart = ({ text, locale, productId, colorId, quantity }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const handleClick = async () => {
        if (!session) {
            router.push(`/${locale}/login`);
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
            className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
        >
            <FontAwesomeIcon icon={faBagShopping} /> {text}
        </button>
    );
};

export default AddCart;
