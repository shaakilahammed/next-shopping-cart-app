'use client';
import { removeFromWishlist } from '@/actions/wish-list';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';

const DeleteButton = ({ accessToken, productId, colorId }) => {
    const router = useRouter();
    const handleClick = async () => {
        await removeFromWishlist(accessToken, productId, colorId);
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

export default DeleteButton;
