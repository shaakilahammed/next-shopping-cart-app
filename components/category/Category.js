import Image from 'next/image';
import Link from 'next/link';

const Category = ({ category, locale }) => {
    return (
        <div className="relative rounded-sm overflow-hidden group">
            <Image
                src={category.image}
                alt={category.name}
                className="w-full"
                height={250}
                width={400}
            />
            <Link
                href={`/${locale}/shop?category=${category?.id}`}
                className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
            >
                {category?.name}
            </Link>
        </div>
    );
};

export default Category;
