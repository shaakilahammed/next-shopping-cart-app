import { getDictionary } from '@/lib/dictionaries';
import Image from 'next/image';

const Copyright = async ({ locale }) => {
    const dict = await getDictionary(locale);

    return (
        <div className="bg-gray-800 py-4">
            <div className="container flex items-center justify-between">
                <p className="text-white">&copy; {dict.footer.copyrignt}</p>
                <div>
                    <Image
                        src="/assets/images/methods.png"
                        alt="methods"
                        className="h-5"
                        height={20}
                        width={240}
                    />
                </div>
            </div>
        </div>
    );
};

export default Copyright;
