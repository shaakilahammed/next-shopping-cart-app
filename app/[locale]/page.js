import ExclusiveOffer from '@/components/ad/ExclusiveOffer';
import CategoryList from '@/components/category/CategoryList';
import FeatureList from '@/components/feature/FeatureList';
import NewProductList from '@/components/product/NewProductList';
import TrendingProductList from '@/components/product/TrendingProductList';
import Banner from '@/components/ui/Banner';

export default function Home({ params: { locale } }) {
    return (
        <>
            <Banner locale={locale} />
            <FeatureList locale={locale} />
            <CategoryList locale={locale} />
            <NewProductList locale={locale} />
            <ExclusiveOffer imageUrl="/assets/images/offer.jpg" link="#" />
            <TrendingProductList locale={locale} />
        </>
    );
}
