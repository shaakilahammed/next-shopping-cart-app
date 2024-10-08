import Filter from '@/components/filter/Filter';
import FilterDrawer from '@/components/filter/FilterDrawer';
import ShopProductList from '@/components/product/ShopProductList';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { refinedURI } from '@/utils/utils';
import { Suspense } from 'react';
import Loading from '../loading';
export const metadata = {
    title: 'NXTkart - Shop',
};
const ShopPage = ({
    params: { locale },
    searchParams: { q, category, color, min, max },
}) => {
    return (
        <>
            <Breadcrumb>
                <p className="text-gray-600 font-medium">Shop</p>
            </Breadcrumb>
            <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
                <FilterDrawer />
                <Filter locale={locale} />
                <Suspense fallback={<Loading />}>
                    <ShopProductList
                        q={refinedURI(q)}
                        category={refinedURI(category)}
                        color={refinedURI(color)}
                        min={refinedURI(min)}
                        max={refinedURI(max)}
                        locale={locale}
                    />
                </Suspense>
            </div>
        </>
    );
};

export default ShopPage;
