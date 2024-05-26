import { getProductbyId } from '@/actions/products';
import RelatedProductList from '@/components/product/RelatedProductList';
import ImageGallery from '@/components/product/details/ImageGallery';
import ProductDetails from '@/components/product/details/ProductDetails';
import ProductInfo from '@/components/product/details/ProductInfo';
import Breadcrumb from '@/components/ui/Breadcrumb';

const ProductDetailsPage = async ({ params: { productId } }) => {
    const product = await getProductbyId(productId);
    return (
        <>
            <Breadcrumb>
                <p className="text-gray-600 font-medium">Product</p>
            </Breadcrumb>
            <div className="container grid grid-cols-2 gap-6">
                <ImageGallery images={product?.images} />
                <ProductInfo product={product} />
            </div>
            <ProductDetails description={product?.description} />
            <RelatedProductList productId={product?.id} />
        </>
    );
};

export default ProductDetailsPage;
