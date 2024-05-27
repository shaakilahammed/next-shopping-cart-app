'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const CategoryFilter = ({ categories, title }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const params = useMemo(() => new URLSearchParams(searchParams), [
        searchParams,
    ]);

    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const checked = e.target.checked;
        if (checked) {
            setSelectedCategories((prev) => [...prev, name]);
        } else {
            const filtered = selectedCategories.filter((item) => item !== name);
            setSelectedCategories(filtered);
        }
    };

    useEffect(() => {
        const category = params.get('category');
        if (category) {
            const decodedCategory = decodeURI(category);
            const queryInCategory = decodedCategory.split('|');
            setSelectedCategories(queryInCategory);
        }
    }, [params]);

    useEffect(() => {
        if (selectedCategories.length > 0) {
            params.set('category', encodeURI(selectedCategories.join('|')));
        } else {
            params.delete('category');
        }
        router.replace(`${pathname}?${params.toString()}`);
    }, [pathname, selectedCategories, router, params]);
    return (
        <div>
            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                {title}
            </h3>
            <div className="space-y-2">
                {categories?.length > 0 &&
                    categories?.map((category) => (
                        <div key={category?.id} className="flex items-center">
                            <input
                                type="checkbox"
                                name={category?.id}
                                id={category?.id}
                                onChange={handleChange}
                                checked={selectedCategories.includes(
                                    category?.id
                                )}
                                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                            />
                            <label
                                htmlFor={category?.id}
                                className="text-gray-600 ml-3 cusror-pointer"
                            >
                                {category?.name}
                            </label>
                            {/* <div className="ml-auto text-gray-600 text-sm">
                                (15)
                            </div> */}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default CategoryFilter;
