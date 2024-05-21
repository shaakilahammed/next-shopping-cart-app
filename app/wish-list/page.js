import WishProductList from '@/components/product/WishProductList';
import Breadcrumb from '@/components/ui/Breadcrumb';

const WishListPage = () => {
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
