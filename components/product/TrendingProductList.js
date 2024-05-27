import { getTrendingProducts } from '@/actions/products';
import { getDictionary } from '@/lib/dictionaries';
import ProductCard from './ProductCard';

const TrendingProductList = async ({ locale }) => {
    const products = await getTrendingProducts();
    const dict = await getDictionary(locale);

    return (
        <div className="container pb-16">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                {dict.sections.trendingProducts}
            </h2>
            {products?.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard
                            key={product?.id}
                            product={product}
                            cartText={dict.product.addToCart}
                            noRatingsText={dict.product.noRatings}
                        />
                    ))}
                </div>
            ) : (
                <span>No trending products found!</span>
            )}
        </div>
    );
};

export default TrendingProductList;
