import { getAllCategories } from '@/actions/categories';
import { Suspense } from 'react';
import CategoryFilter from './CategoryFilter';

const Filter = async () => {
    const categories = await getAllCategories();

    return (
        <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
            <div className="divide-y divide-gray-200 space-y-5">
                <Suspense>
                    <CategoryFilter categories={categories} />
                </Suspense>

                <div className="pt-4">
                    <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                        Price
                    </h3>
                    <div className="mt-4 flex items-center">
                        <input
                            type="text"
                            name="min"
                            id="min"
                            className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                            placeholder="min"
                        />
                        <span className="mx-3 text-gray-500">-</span>
                        <input
                            type="text"
                            name="max"
                            id="max"
                            className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                            placeholder="max"
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                        size
                    </h3>
                    <div className="flex items-center gap-2">
                        <div className="size-selector">
                            <input
                                type="radio"
                                name="size"
                                id="size-xs"
                                className="hidden"
                            />
                            <label
                                htmlFor="size-xs"
                                className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                            >
                                XS
                            </label>
                        </div>
                        <div className="size-selector">
                            <input
                                type="radio"
                                name="size"
                                id="size-sm"
                                className="hidden"
                            />
                            <label
                                htmlFor="size-sm"
                                className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                            >
                                S
                            </label>
                        </div>
                        <div className="size-selector">
                            <input
                                type="radio"
                                name="size"
                                id="size-m"
                                className="hidden"
                            />
                            <label
                                htmlFor="size-m"
                                className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                            >
                                M
                            </label>
                        </div>
                        <div className="size-selector">
                            <input
                                type="radio"
                                name="size"
                                id="size-l"
                                className="hidden"
                            />
                            <label
                                htmlFor="size-l"
                                className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                            >
                                L
                            </label>
                        </div>
                        <div className="size-selector">
                            <input
                                type="radio"
                                name="size"
                                id="size-xl"
                                className="hidden"
                            />
                            <label
                                htmlFor="size-xl"
                                className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                            >
                                XL
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
