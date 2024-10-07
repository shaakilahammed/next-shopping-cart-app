import { getMyProfile } from '@/actions/auth';
import { getCart } from '@/actions/cart';
import { auth } from '@/auth';
import CheckoutForm from '@/components/form/CheckoutForm';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { getDictionary } from '@/lib/dictionaries';
import { redirect } from 'next/navigation';
export const metadata = {
    title: 'NXTkart - Checkout',
};
const CheckoutPage = async ({ params: { locale } }) => {
    const dict = await getDictionary(locale);
    const session = await auth();

    if (!session) {
        redirect(`/${locale}/login`);
        return null;
    }
    const accessToken = session?.tokens?.accessToken;
    const userProfile = await getMyProfile(accessToken);
    const cart = await getCart(accessToken);

    return (
        <>
            <Breadcrumb>
                <p className="text-gray-600 font-medium">Checkout</p>
            </Breadcrumb>

            <CheckoutForm
                texts={dict.checkout}
                address={userProfile?.shippingAddress}
                billingAddress={userProfile?.billingAddress}
                accessToken={accessToken}
                cart={cart}
                locale={locale}
            />
        </>
    );
};

export default CheckoutPage;
