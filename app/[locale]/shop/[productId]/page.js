import { getProductbyId } from '@/actions/products';
import RelatedProductList from '@/components/product/RelatedProductList';
import ImageGallery from '@/components/product/details/ImageGallery';
import ProductDetails from '@/components/product/details/ProductDetails';
import ProductInfo from '@/components/product/details/ProductInfo';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { getDictionary } from '@/lib/dictionaries';
import { getLiveUrl } from '@/utils/utils';
import { notFound } from 'next/navigation';

export const generateMetadata = async ({ params: { productId } }) => {
    const product = await getProductbyId(productId);
    return {
        title: `LWSkart - ${product?.name}`,
        description: product?.description,
        openGraph: {
            title: `LWSkart - ${product?.name}`,
            description: product?.description,
            type: 'website',
            url: `${getLiveUrl()}/shop/${productId}`,
            images: [
                {
                    url: `${product?.images[0]}`,
                    width: 800,
                    height: 400,
                    alt: product?.name,
                    type: 'image/png',
                },
            ],
        },
    };
};

const ProductDetailsPage = async ({
    searchParams: { color, quantity },
    params: { productId, locale },
}) => {
    const product = await getProductbyId(productId);
    if (!product) notFound();
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
                    quantity={quantity}
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
