import { getProductbyId } from '@/actions/products';
import RelatedProductList from '@/components/product/RelatedProductList';
import ImageGallery from '@/components/product/details/ImageGallery';
import ProductDetails from '@/components/product/details/ProductDetails';
import ProductInfo from '@/components/product/details/ProductInfo';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { getDictionary } from '@/lib/dictionaries';

const ProductDetailsPage = async ({
    searchParams: { color },
    params: { productId, locale },
}) => {
    const product = await getProductbyId(productId);
    const dict = await getDictionary(locale);
    return (
        <>
            <Breadcrumb>
                <p className="text-gray-600 font-medium">Product</p>
            </Breadcrumb>
            <div className="container grid grid-cols-2 gap-6">
                <ImageGallery images={product?.images} />
                <ProductInfo
                    product={product}
                    texts={dict.productDetails}
                    locale={locale}
                    color={color}
                />
            </div>
            <ProductDetails
                description={product?.description}
                text={dict.productDetails.details}
            />
            <RelatedProductList productId={product?.id} locale={locale} />
        </>
    );
};

export default ProductDetailsPage;
