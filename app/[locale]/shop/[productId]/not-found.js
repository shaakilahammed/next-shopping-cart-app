'use client';
import NotFound from '@/components/ui/NotFound';
import { useParams } from 'next/navigation';

const ProductNotFoundPage = () => {
    const params = useParams();
    const { productId } = params;
    let message = `This Product with "${decodeURIComponent(
        productId
    )}" id was not found!`;

    return <NotFound message={message} />;
};

export default ProductNotFoundPage;
