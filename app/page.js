import ExclusiveOffer from '@/components/ad/ExclusiveOffer';
import CategoryList from '@/components/category/CategoryList';
import FeatureList from '@/components/feature/FeatureList';
import NewProductList from '@/components/product/NewProductList';
import TrendingProductList from '@/components/product/TrendingProductList';
import Banner from '@/components/ui/Banner';

export default function Home() {
    return (
        <>
            <Banner />
            <FeatureList />
            <CategoryList />
            <NewProductList />
            <ExclusiveOffer imageUrl="/assets/images/offer.jpg" link="#" />
            <TrendingProductList />
        </>
    );
}
