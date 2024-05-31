import { auth } from '@/auth';
import WishProductList from '@/components/product/WishProductList';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { redirect } from 'next/navigation';

const WishListPage = async ({ params: { locale } }) => {
    const session = await auth();
    if (!session) {
        redirect(`/${locale}/login`);
        return null;
    }
    return (
        <>
            <Breadcrumb>
                <p className="text-gray-600 font-medium">Wish List</p>
            </Breadcrumb>
            <div className="container gap-6 pt-4 pb-16">
                <WishProductList
                    locale={locale}
                    accessToken={session?.tokens?.accessToken}
                />
            </div>
        </>
    );
};

export default WishListPage;
