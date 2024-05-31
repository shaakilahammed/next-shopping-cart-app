import { getDictionary } from '@/lib/dictionaries';

const OutOfStock = async ({ fromWishList, locale }) => {
    const dict = await getDictionary(locale);
    return (
        <button
            className={`${
                fromWishList
                    ? 'px-6 py-2 text-center text-sm text-gray-700 bg-gray-400 border border-gray-400 rounded hover:bg-transparent hover:text-gray-800 transition uppercase hover:bg-gray-500 font-roboto font-medium cursor-not-allowed'
                    : 'block w-full py-1 text-center text-gray-700 bg-gray-400 border border-gray-400 rounded-b hover:bg-transparent hover:text-gray-800  hover:bg-gray-500 transition cursor-not-allowed'
            } `}
        >
            {dict.productDetails.outOfStock}
        </button>
    );
};

export default OutOfStock;
