import { getAllProducts } from '@/actions/products';
import Filter from '@/components/filter/Filter';
import FilterDrawer from '@/components/filter/FilterDrawer';
import ShopProductList from '@/components/product/ShopProductList';
import Breadcrumb from '@/components/ui/Breadcrumb';

const ShopPage = async () => {
    const products = await getAllProducts();
    return (
        <>
            <Breadcrumb>
                <p className="text-gray-600 font-medium">Shop</p>
            </Breadcrumb>
            <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
                <FilterDrawer />
                <Filter />
                <ShopProductList products={products} />
            </div>
        </>
    );
};

export default ShopPage;
