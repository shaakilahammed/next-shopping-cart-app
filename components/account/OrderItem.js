import { formatReadableDate } from '@/utils/utils';
import PDFButton from './PDFButton';

const OrderItem = ({ order }) => {
    return (
        <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
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
        </div>
    );
};

export default OrderItem;
