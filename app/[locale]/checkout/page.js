import { auth } from '@/auth';
import CheckoutForm from '@/components/form/CheckoutForm';
import OrderSummary from '@/components/order/OrderSummary';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { getDictionary } from '@/lib/dictionaries';
import { redirect } from 'next/navigation';

const CheckoutPage = async ({ params: { locale } }) => {
    const session = await auth();
    const dict = await getDictionary(locale);
    if (!session) {
        redirect(`/${locale}/login`);
        return null;
    }
    return (
        <>
            <Breadcrumb>
                <p className="text-gray-600 font-medium">Checkout</p>
            </Breadcrumb>
            <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
                <div className="col-span-8 border border-gray-200 p-4 rounded">
                    <h3 className="text-lg font-medium capitalize mb-4">
                        {dict.checkout.checkout}
                    </h3>
                    <CheckoutForm texts={dict.checkout} />
                </div>
                <OrderSummary texts={dict.checkout} />
            </div>
        </>
    );
};

export default CheckoutPage;
