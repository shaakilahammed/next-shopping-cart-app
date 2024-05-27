import Link from 'next/link';

const OrderSummary = ({ texts }) => {
    return (
        <div className="col-span-4 border border-gray-200 p-4 rounded">
            <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
                {texts.orderSummary}
            </h4>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <div>
                        <h5 className="text-gray-800 font-medium">
                            Italian shape sofa
                        </h5>
                        <p className="text-sm text-gray-600">Size: M</p>
                    </div>
                    <p className="text-gray-600">x3</p>
                    <p className="text-gray-800 font-medium">$320</p>
                </div>
                <div className="flex justify-between">
                    <div>
                        <h5 className="text-gray-800 font-medium">
                            Italian shape sofa
                        </h5>
                        <p className="text-sm text-gray-600">Size: M</p>
                    </div>
                    <p className="text-gray-600">x3</p>
                    <p className="text-gray-800 font-medium">$320</p>
                </div>
                <div className="flex justify-between">
                    <div>
                        <h5 className="text-gray-800 font-medium">
                            Italian shape sofa
                        </h5>
                        <p className="text-sm text-gray-600">Size: M</p>
                    </div>
                    <p className="text-gray-600">x3</p>
                    <p className="text-gray-800 font-medium">$320</p>
                </div>
                <div className="flex justify-between">
                    <div>
                        <h5 className="text-gray-800 font-medium">
                            Italian shape sofa
                        </h5>
                        <p className="text-sm text-gray-600">Size: M</p>
                    </div>
                    <p className="text-gray-600">x3</p>
                    <p className="text-gray-800 font-medium">$320</p>
                </div>
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
                <p>$1280</p>
            </div>

            <div className="flex items-center mb-4 mt-2">
                <input
                    type="checkbox"
                    name="aggrement"
                    id="aggrement"
                    className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
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

            <Link
                href="#"
                className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
            >
                {texts.placeOrder}
            </Link>
        </div>
    );
};

export default OrderSummary;
