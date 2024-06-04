'use client';
import NotFound from '@/components/ui/NotFound';
import { useParams } from 'next/navigation';

const OrderNotFoundPage = () => {
    const params = useParams();
    const { id } = params;
    let message = `This Order with "${decodeURIComponent(
        id
    )}" id was not found!`;

    return <NotFound message={message} />;
};

export default OrderNotFoundPage;
