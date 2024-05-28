'use client';
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
            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                {title}
            </h3>
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
