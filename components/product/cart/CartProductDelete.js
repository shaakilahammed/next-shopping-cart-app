'use client';
import { removeFromCart } from '@/actions/cart';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

const CartProductDelete = ({ productId, colorId }) => {
    const router = useRouter();
    const { data: session } = useSession();
    if (!session) {
        redirect(`/login`);
    }
    const accessToken = session?.tokens?.accessToken;
    const handleClick = async () => {
        await removeFromCart(accessToken, productId, colorId);
        router.refresh();
    };
    return (
        <button
            onClick={handleClick}
            className="text-gray-600 cursor-pointer hover:text-primary"
        >
            <FontAwesomeIcon icon={faTrash} />
        </button>
    );
};

export default CartProductDelete;
