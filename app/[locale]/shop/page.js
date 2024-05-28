import Filter from '@/components/filter/Filter';
import FilterDrawer from '@/components/filter/FilterDrawer';
import ShopProductList from '@/components/product/ShopProductList';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { refinedURI } from '@/utils/utils';

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
                <ShopProductList
                    q={refinedURI(q)}
                    category={refinedURI(category)}
                    color={refinedURI(color)}
                    min={refinedURI(min)}
                    max={refinedURI(max)}
                    locale={locale}
                />
            </div>
        </>
    );
};

export default ShopPage;
