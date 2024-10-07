import { getOrderById } from '@/actions/order';
import { auth } from '@/auth';
import OrderDetails from '@/components/order/OrderDetails';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { notFound, redirect } from 'next/navigation';
export const metadata = {
    title: 'NXTkart - Orders',
};
const OrderDetailsPage = async ({ params: { locale, id } }) => {
    const session = await auth();

    if (!session) {
        redirect(`/${locale}/login`);
        return null;
    }

    const accessToken = session?.tokens?.accessToken;
    const order = await getOrderById(accessToken, id);
    if (!order) {
        notFound();
    }
    return (
        <>
            <Breadcrumb>
                <p className="text-gray-600 font-medium">Orders</p>
            </Breadcrumb>
            <OrderDetails order={order} locale={locale} />
        </>
    );
};

export default OrderDetailsPage;
