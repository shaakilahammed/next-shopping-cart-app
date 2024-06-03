import { auth } from '@/auth';
import OrderDetails from '@/components/order/OrderDetails';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { redirect } from 'next/navigation';
export const metadata = {
    title: 'LWSkart - Orders',
};
const OrderDetailsPage = async ({ params: { locale, id } }) => {
    const session = await auth();
    if (!session) {
        redirect(`/${locale}/login`);
        return null;
    }
    return (
        <>
            <Breadcrumb>
                <p className="text-gray-600 font-medium">Orders</p>
            </Breadcrumb>
            <OrderDetails orderId={id} locale={locale} />
        </>
    );
};

export default OrderDetailsPage;
