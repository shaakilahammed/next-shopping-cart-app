import { auth } from '@/auth';
import Orders from '@/components/account/Orders';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { redirect } from 'next/navigation';
export const metadata = {
    title: 'NXTkart - Orders',
};
const OrderPage = async ({ params: { locale } }) => {
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
            <Orders locale={locale} />
        </>
    );
};

export default OrderPage;
