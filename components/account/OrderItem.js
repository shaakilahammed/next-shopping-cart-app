import { formatReadableDate } from '@/utils/utils';
import Link from 'next/link';
import PDFButton from './PDFButton';

const OrderItem = ({ order, locale }) => {
    return (
        <Link
            href={`/${locale}/orders/${order?._id}`}
            className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded hover:border-primary"
        >
            <div className="w-2/6">
                <h2 className="text-gray-800 text-lg font-medium uppercase">
                    {order?._id}
                </h2>

                <p className="text-gray-500 text-sm">
                    {formatReadableDate(order?.createdAt)}
                </p>
            </div>
            <div className="w-2/6">
                <h2 className="text-gray-800 text-lg font-medium uppercase">
                    {order?.name}
                </h2>

                <p className="text-gray-500 text-sm">{order?.address}</p>
            </div>

            <div className="w-1/6 text-green-500 text-lg font-semibold text-right">
                ${order?.total}
            </div>
            <PDFButton />
        </Link>
    );
};

export default OrderItem;
