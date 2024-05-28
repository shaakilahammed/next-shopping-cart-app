'use client';

import { useState } from 'react';

const ProductColor = ({ colors, colorText }) => {
    const [selectedColor, setSelectedColor] = useState(
        colors?.length > 0 && colors[0].id
    );
    // const handleChange = (e) => {
    //     e.preventDefault();
    //     const value = e.target.value;
    //     console.log(value);
    //     setSelectedColor(value);
    // };
    // console.log(selectedColor);

    // useEffect(() => {
    //     if (colors.length > 0) {
    //         setSelectedColor(colors[0]);
    //     }
    // }, [colors]);
    return (
        <div className="mt-4">
            <h3 className="text-sm text-gray-800 uppercase mb-0.5">
                {colorText}
            </h3>
            {colors?.length > 0 &&
                colors?.map((color) => (
                    <div
                        key={color.id}
                        className="size-selector inline-block mx-1 my-1"
                    >
                        <input
                            type="radio"
                            name="colors"
                            id={color?.id}
                            value={color?.id}
                            onChange={() => setSelectedColor(color?.id)}
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
    );
};

export default ProductColor;
