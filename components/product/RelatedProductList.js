import { getRelatedProducts } from '@/actions/products';
import ProductCard from './ProductCard';

const RelatedProductList = async ({ productId }) => {
    const relatedProducts = await getRelatedProducts(productId);
    return (
        <div className="container pb-16">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                Related products
            </h2>
            {relatedProducts.length > 0 ? (
                <div className="grid grid-cols-4 gap-6">
                    {relatedProducts.map((product) => (
                        <ProductCard key={product?.id} product={product} />
                    ))}
                </div>
            ) : (
                <span>No related products found!</span>
            )}
        </div>
    );
};

export default RelatedProductList;
