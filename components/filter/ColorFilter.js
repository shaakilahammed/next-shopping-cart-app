'use client';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const ColorFilter = ({ title, colors }) => {
    const [selectedColor, setSelectedColor] = useState('');
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const params = useMemo(() => new URLSearchParams(searchParams), [
        searchParams,
    ]);

    const handleChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setSelectedColor(value);
    };
    useEffect(() => {
        const color = params.get('color');
        if (color) {
            const decodedColor = decodeURI(color);
            setSelectedColor(decodedColor);
        }
    }, [params]);

    useEffect(() => {
        if (selectedColor) {
            params.set('color', encodeURI(selectedColor));
        } else {
            params.delete('color');
        }
        router.replace(`${pathname}?${params.toString()}`);
    }, [pathname, selectedColor, router, params]);
    return (
        <div className="pt-4">
            <div className="flex justify-between items-center mb-3">
                <span className="text-xl text-gray-800 uppercase font-medium">
                    {title}
                </span>
                <button
                    className="text-lg  hover:text-red-600 px-2 py-1 text-red-500 rounded-sm flex items-center"
                    onClick={() => setSelectedColor('')}
                >
                    <FontAwesomeIcon icon={faClose} />
                </button>
            </div>
            <div className="">
                {colors?.length > 0 &&
                    colors.map((color) => (
                        <div
                            key={color.id}
                            className="size-selector inline-block mx-1 my-1"
                        >
                            <input
                                type="radio"
                                name="colors"
                                id={color?.id}
                                value={color?.id}
                                onChange={handleChange}
                                checked={selectedColor === color.id}
                                className="hidden"
                            />
                            <label
                                htmlFor={color?.id}
                                className="text-xs border border-gray-200 rounded-sm px-2 py-1  cursor-pointer shadow-sm text-gray-600"
                            >
                                {color.name}
                            </label>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ColorFilter;
