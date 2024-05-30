import { getRelatedProducts } from '@/actions/products';
import { getDictionary } from '@/lib/dictionaries';
import ProductCard from './ProductCard';

const RelatedProductList = async ({ locale, productId }) => {
    const relatedProducts = await getRelatedProducts(productId);
    const dict = await getDictionary(locale);

    return (
        <div className="container pb-16">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                {dict.sections.relatedProducts}
            </h2>
            {relatedProducts?.length > 0 ? (
                <div className="grid grid-cols-4 gap-6">
                    {relatedProducts.map((product) => (
                        <ProductCard
                            key={product?.id}
                            cartText={dict.product.addToCart}
                            noRatingsText={dict.product.noRatings}
                            locale={locale}
                            product={product}
                        />
                    ))}
                </div>
            ) : (
                <span>No related products found!</span>
            )}
        </div>
    );
};

export default RelatedProductList;
