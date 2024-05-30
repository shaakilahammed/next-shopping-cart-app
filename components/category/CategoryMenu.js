import { getAllCategories } from '@/actions/categories';
import Image from 'next/image';
import Link from 'next/link';

const CategoryMenu = async ({ locale }) => {
    const categories = await getAllCategories();
    return (
        <div
            className="absolute left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible w-[600px]"
            style={{ width: '300px' }}
        >
            {categories?.length > 0 &&
                categories?.map((item) => (
                    <Link
                        key={item?.id}
                        href={`/${locale}/shop?category=${item?.id}`}
                        className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                    >
                        <Image
                            src={item?.icon}
                            alt={item?.name}
                            className="w-5 h-5 object-contain"
                            width={20}
                            height={20}
                        />
                        <span className="ml-6 text-gray-600 text-sm">
                            {item?.name}
                        </span>
                    </Link>
                ))}
        </div>
    );
};

export default CategoryMenu;
