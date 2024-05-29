import Link from 'next/link';

const ShippingAddress = ({ texts, address }) => {
    return (
        <div className="shadow rounded bg-white px-4 pt-6 pb-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-800 text-lg">
                    {texts.shippingAddress}
                </h3>
                <Link href="#" className="text-primary">
                    {texts.edit}
                </Link>
            </div>
            <div className="space-y-1">
                {address ? (
                    <>
                        <h4 className="text-gray-700 font-medium">
                            {address?.name}
                        </h4>
                        <p className="text-gray-800">{address?.email}</p>
                        <p className="text-gray-800">{address?.address}</p>
                        <p className="text-gray-800">{address?.phone}</p>
                    </>
                ) : (
                    <p className="text-gray-800">{texts?.noAddress}</p>
                )}
            </div>
        </div>
    );
};

export default ShippingAddress;
