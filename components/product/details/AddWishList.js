'use client';
import { addToWishlist } from '@/actions/wish-list';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AddWishList = ({ text, locale, productId, color }) => {
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
            className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition"
        >
            <FontAwesomeIcon icon={faHeart} /> {text}
        </button>
    );
};

export default AddWishList;
