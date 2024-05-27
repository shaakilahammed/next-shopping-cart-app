import { getDictionary } from '@/lib/dictionaries';
import Link from 'next/link';

const Banner = async ({ locale }) => {
    const dict = await getDictionary(locale);
    return (
        <div
            className="bg-cover bg-no-repeat bg-center py-36"
            style={{ backgroundImage: "url('/assets/images/banner-bg.jpg')" }}
        >
            <div className="container">
                <div className="md:w-1/2">
                    <h1 className="text-6xl text-gray-800 font-medium mb-4 capitalize">
                        {dict.banner.title1} <br /> {dict.banner.title2}
                    </h1>
                    <p>{dict.banner.description}</p>
                    <div className="mt-12">
                        <Link
                            href="/shop"
                            className="bg-primary border border-primary text-white px-8 py-3 font-medium 
                rounded-md hover:bg-transparent hover:text-primary"
                        >
                            {dict.banner.actionButton}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
