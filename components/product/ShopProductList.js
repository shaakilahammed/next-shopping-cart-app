import ProductNotFound from '../ui/ProductNotFound';
import ProductCard from './ProductCard';

const ShopProductList = ({ products }) => {
    return (
        <div className="col-span-3">
            {products.length > 0 ? (
                <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product?.id} product={product} />
                    ))}
                </div>
            ) : (
                <ProductNotFound />
            )}
        </div>
    );
};

export default ShopProductList;
