import Filter from '@/components/filter/Filter';
import FilterDrawer from '@/components/filter/FilterDrawer';
import ShopProductList from '@/components/product/ShopProductList';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { refinedURI } from '@/utils/utils';

const ShopPage = ({ searchParams: { q, category } }) => {
    return (
        <>
            <Breadcrumb>
                <p className="text-gray-600 font-medium">Shop</p>
            </Breadcrumb>
            <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
                <FilterDrawer />
                <Filter />
                <ShopProductList
                    q={refinedURI(q)}
                    category={refinedURI(category)}
                />
            </div>
        </>
    );
};

export default ShopPage;
