import { auth } from '@/auth';
import CartProductList from '@/components/product/cart/CartProductList';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { redirect } from 'next/navigation';
export const metadata = {
    title: 'NXTkart - Cart',
};
const CartPage = async ({ params: { locale } }) => {
    const session = await auth();
    if (!session) {
        redirect(`/${locale}/login`);
        return null;
    }
    return (
        <>
            <Breadcrumb>
                <p className="text-gray-600 font-medium">Cart</p>
            </Breadcrumb>
            <div className="container gap-6 pt-4 pb-16">
                <CartProductList
                    locale={locale}
                    accessToken={session?.tokens?.accessToken}
                />
            </div>
        </>
    );
};

export default CartPage;
