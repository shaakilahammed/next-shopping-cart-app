import { getAllProducts } from '@/actions/products';
import { getDictionary } from '@/lib/dictionaries';
import ProductNotFound from '../ui/ProductNotFound';
import ProductCard from './ProductCard';

const ShopProductList = async ({ q, category, locale, color, min, max }) => {
    const products = await getAllProducts(q, category, color, min, max);
    const dict = await getDictionary(locale);
    return (
        <div className="col-span-3">
            {products.length > 0 ? (
                <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
                    {products.map((product) => (
                        <ProductCard
                            key={product?.id}
                            product={product}
                            cartText={dict.product.addToCart}
                            locale={locale}
                            noRatingsText={dict.product.noRatings}
                        />
                    ))}
                </div>
            ) : (
                <ProductNotFound />
            )}
        </div>
    );
};

export default ShopProductList;
