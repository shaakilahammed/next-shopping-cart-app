import { getOrders } from '@/actions/order';
import { auth } from '@/auth';
import { faHourglassEmpty } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OrderItem from './OrderItem';

const Orders = async () => {
    const session = await auth();
    const accessToken = session?.tokens?.accessToken;
    const orders = await getOrders(accessToken);
    return (
        <div className="mx-auto space-y-4 max-w-6xl">
            <h2 className="text-2xl font-medium">Orders</h2>
            {orders?.length > 0 ? (
                orders?.map((order) => (
                    <OrderItem key={order?._id} order={order} />
                ))
            ) : (
                <div className="flex flex-col justify-center items-center my-10">
                    <FontAwesomeIcon
                        icon={faHourglassEmpty}
                        className="text-[48px]"
                    />
                    <span>No orders yet! Please order some product.</span>
                </div>
            )}
        </div>
    );
};

export default Orders;
