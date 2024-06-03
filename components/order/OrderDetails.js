import { getOrderById } from '@/actions/order';
import { auth } from '@/auth';
import { formatReadableDate } from '@/utils/utils';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const OrderDetails = async ({ orderId }) => {
    const session = await auth();

    const accessToken = session?.tokens?.accessToken;
    const order = await getOrderById(accessToken, orderId);
    if (!order) {
        notFound();
    }

    const {
        name,
        createdAt,
        subTotal,
        shippingCost,
        total,
        address,
        phone,
        email,
        orderItems,
    } = order;
    return (
        <div className="container">
            <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                <div className="flex justify-start item-start space-y-2 flex-col">
                    <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                        Order #{orderId}
                    </h1>
                    <p className="text-base font-medium leading-6 text-gray-600">
                        {formatReadableDate(createdAt)}
                    </p>
                </div>
                <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                        <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                            <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                                Order Items
                            </p>
                            {orderItems?.length > 0 &&
                                orderItems.map((item) => (
                                    <div
                                        key={item._id}
                                        className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                                    >
                                        <div className="pb-4 md:pb-8 w-full md:w-40">
                                            <Image
                                                className="w-full hidden md:block"
                                                src={item.productId.images[0]}
                                                alt={item.name}
                                                height={40}
                                                width={60}
                                            />
                                            <Image
                                                className="w-full md:hidden"
                                                src={item.productId.images[0]}
                                                alt={item.name}
                                                height={40}
                                                width={60}
                                            />
                                        </div>
                                        <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                            <div className="w-full flex flex-col justify-start items-start space-y-8">
                                                <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                                                    {item.name}
                                                </h3>
                                                <div className="flex justify-start items-start flex-col space-y-2">
                                                    <p className="text-sm leading-none text-gray-800">
                                                        <span className="text-gray-300">
                                                            Color:{' '}
                                                        </span>{' '}
                                                        {item.colorId.name}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between space-x-8 items-start w-full">
                                                <p className="text-base xl:text-lg leading-6">
                                                    ${item.price.toFixed(2)}
                                                </p>
                                                <p className="text-base xl:text-lg leading-6 text-gray-800">
                                                    {item.quantity}
                                                </p>
                                                <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                                                    ${item.total.toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                                <h3 className="text-xl font-semibold leading-5 text-gray-800">
                                    Summary
                                </h3>
                                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                    <div className="flex justify-between w-full">
                                        <p className="text-base leading-4 text-gray-800">
                                            Subtotal
                                        </p>
                                        <p className="text-base leading-4 text-gray-600">
                                            ${subTotal.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center w-full">
                                        <p className="text-base leading-4 text-gray-800">
                                            Discount{' '}
                                        </p>
                                        <p className="text-base leading-4 text-gray-600">
                                            -$0.00 (0%)
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center w-full">
                                        <p className="text-base leading-4 text-gray-800">
                                            Shipping
                                        </p>
                                        <p className="text-base leading-4 text-gray-600">
                                            ${shippingCost.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base font-semibold leading-4 text-gray-800">
                                        Total
                                    </p>
                                    <p className="text-base font-semibold leading-4 text-gray-600">
                                        ${total.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-start md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                        <h3 className="text-xl font-semibold leading-5 text-gray-800">
                            Customer
                        </h3>
                        <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                            <div className="flex flex-col justify-start items-start flex-shrink-0">
                                <div className="flex justify-start w-full md:justify-start items-start space-x-4 py-8 border-b border-gray-200">
                                    <div className="flex justify-start items-start flex-col space-y-2">
                                        <p className="text-base font-semibold leading-4 text-left text-gray-800">
                                            {name}
                                        </p>
                                        <p className="cursor-pointer text-sm leading-5">
                                            {email}
                                        </p>
                                        <p className="cursor-pointer text-sm leading-5">
                                            {phone}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                                <div className="flex justify-start md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-start md:items-start">
                                    <div className="flex justify-start md:justify-start items-start md:items-start flex-col space-y-4 xl:mt-8">
                                        <p className="text-base font-semibold leading-4 text-start md:text-left text-gray-800">
                                            Shipping Address
                                        </p>
                                        <p className="w-48 lg:w-full xl:w-48 text-start md:text-left text-sm leading-5 text-gray-600">
                                            {address}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
