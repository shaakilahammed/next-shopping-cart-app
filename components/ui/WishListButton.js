import { getWishlist } from '@/actions/wish-list';
import { auth } from '@/auth';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const WishListButton = async ({ locale, text }) => {
    const session = await auth();
    let wishListCount = 0;
    if (session) {
        const wishList = await getWishlist(session?.tokens?.accessToken);
        wishListCount = wishList.length;
    }
    return (
        <Link
            href={`/${locale}/wish-list`}
            className="text-center text-gray-700 hover:text-primary transition relative"
        >
            <div className="text-2xl">
                <FontAwesomeIcon icon={faHeart} />
            </div>
            <div className="text-xs leading-3">{text}</div>
            <div className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                {wishListCount}
            </div>
        </Link>
    );
};

export default WishListButton;
