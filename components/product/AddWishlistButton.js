'use client';
import { addToWishlist } from '@/actions/wish-list';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AddWishlistButton = ({ locale, productId, color }) => {
    const router = useRouter();
    const { data: session } = useSession();
    // console.log(session?.tokens?.accessToken);
    const handleClick = async () => {
        if (!session) {
            router.push(`/${locale}/login`);
        }
        try {
            const response = await addToWishlist(
                session?.tokens?.accessToken,
                productId,
                color
            );
            if (response?.success) {
                router.push(`/${locale}/wish-list`);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <button
            onClick={handleClick}
            className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
            title="add to wishlist"
        >
            <FontAwesomeIcon icon={faHeart} />
        </button>
    );
};

export default AddWishlistButton;
