import { auth } from '@/auth';
import WishProductList from '@/components/product/WishProductList';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { redirect } from 'next/navigation';

const WishListPage = async () => {
    const session = await auth();
    if (!session) {
        redirect('/login');
    }
    return (
        <>
            <Breadcrumb>
                <p className="text-gray-600 font-medium">Profile</p>
            </Breadcrumb>
            <div className="container gap-6 pt-4 pb-16">
                <WishProductList />
            </div>
        </>
    );
};

export default WishListPage;
