import { getCart } from '@/actions/cart';
import { auth } from '@/auth';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const CartButton = async ({ locale, text }) => {
    const session = await auth();
    let cartCount = 0;
    if (session) {
        const cart = await getCart(session?.tokens?.accessToken);
        cartCount = cart.length;
    }
    return (
        <Link
            href={`/${locale}/cart`}
            className="text-center text-gray-700 hover:text-primary transition relative"
        >
            <div className="text-2xl">
                <FontAwesomeIcon icon={faBagShopping} />
            </div>
            <div className="text-xs leading-3">{text}</div>
            <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                {cartCount}
            </div>
        </Link>
    );
};

export default CartButton;
