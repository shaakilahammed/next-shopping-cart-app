'use client';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const LanguageSwitcher = ({ locale }) => {
    const [selectedLocale, setSelectedLocale] = useState(locale);
    const pathName = usePathname();
    const router = useRouter();

    const handleChange = (lc) => {
        const redirectUrl = pathName.replace(selectedLocale, lc);
        setSelectedLocale(lc);
        if (pathName.includes('movies')) {
            window.location.replace(redirectUrl);
        } else {
            router.push(redirectUrl);
        }
    };
    return (
        <>
            {selectedLocale === 'en' ? (
                <button
                    className="text-center text-gray-700 hover:text-primary transition"
                    onClick={() => handleChange('bn')}
                >
                    <div className="flex flex-col items-center gap-1 py-1">
                        <div className="text-2xl">
                            <Image
                                src="/assets/images/bd.png"
                                width="28"
                                height="28"
                                alt="BD"
                            />
                        </div>
                        <div className="text-xs leading-3">Bangla</div>
                    </div>
                </button>
            ) : (
                <button
                    className="text-center text-gray-700 hover:text-primary transition"
                    onClick={() => handleChange('en')}
                >
                    <div className="flex flex-col items-center gap-1 py-1">
                        <div className="text-2xl">
                            <Image
                                src="/assets/images/usa.png"
                                width="28"
                                height="28"
                                alt="USA"
                            />
                        </div>
                        <div className="text-xs leading-3">English</div>
                    </div>
                </button>
            )}
        </>
    );
};

export default LanguageSwitcher;
