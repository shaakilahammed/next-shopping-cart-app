import { calculateTotalAmount } from '@/utils/utils';
import { faMultiply, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const OrderSummary = ({
    texts,
    cart,
    input,
    error,
    onChange,
    pending,
    responseError,
}) => {
    console.log(cart);
    return (
        <div className="col-span-5 border border-gray-200 p-4 rounded">
            <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
                {texts.orderSummary}
            </h4>
            <div className="space-y-2">
                {cart?.length > 0 ? (
                    cart?.map((item) => (
                        <div
                            key={item._id}
                            className="flex justify-between items-center"
                        >
                            <div className="w-1/2">
                                <h5 className="text-gray-800 font-medium">
                                    {item?.productId?.name}
                                </h5>
                                <p className="text-sm text-gray-600">
                                    Color: {item?.colorId?.name}
                                </p>
                            </div>
                            <p className="text-gray-800 font-medium">
                                {item?.quantity}
                            </p>
                            <FontAwesomeIcon
                                icon={faMultiply}
                                className="text-gray-500"
                            />
                            <p className="text-gray-800 font-medium">
                                ${item?.productId?.discountPrice}
                            </p>
                            <FontAwesomeIcon
                                icon={faMultiply}
                                className="text-gray-500"
                            />
                            <p className="text-gray-800 font-medium">
                                $
                                {(
                                    item?.quantity *
                                    item?.productId?.discountPrice
                                ).toFixed(2)}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col justify-center items-center my-10">
                        <FontAwesomeIcon
                            icon={faShoppingBag}
                            className="text-[48px]"
                        />
                        <span>Cart is empty! Please add some product.</span>
                    </div>
                )}
            </div>

            <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
                <p>{texts.subtotal}</p>
                <p>$1280</p>
            </div>

            <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
                <p>{texts.shipping}</p>
                <p>{texts.free}</p>
            </div>

            <div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
                <p className="font-semibold">{texts.total}</p>
                <p>${calculateTotalAmount(cart).toFixed(2)}</p>
            </div>

            <div className="flex items-center mb-4 mt-2">
                <input
                    type="checkbox"
                    name="aggrement"
                    onChange={onChange}
                    id="aggrement"
                    checked={input.aggrement}
                    className={`text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3 ${
                        error.aggrement && 'border-primary'
                    }`}
                />
                <label
                    htmlFor="aggrement"
                    className="text-gray-600 ml-3 cursor-pointer text-sm"
                >
                    {texts.aggrement}{' '}
                    <Link href="#" className="text-primary">
                        {texts.termsConditions}
                    </Link>
                </label>
            </div>
            {responseError && (
                <div className="flex py-1 my-1 bg-red-500 text-sm text-white px-2 rounded-sm">
                    {responseError}
                </div>
            )}
            {error.aggrement && (
                <p className="text-sm text-red-500 mb-4">{error.aggrement}</p>
            )}

            <button
                type="submit"
                disabled={!cart?.length || pending}
                className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-600 disabled:border-gray-300"
            >
                {texts.placeOrder}
            </button>
        </div>
    );
};

export default OrderSummary;
