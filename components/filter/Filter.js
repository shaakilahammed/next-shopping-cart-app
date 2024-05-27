import { getAllCategories } from '@/actions/categories';
import { Suspense } from 'react';
import CategoryFilter from './CategoryFilter';
import ColorFilter from './ColorFilter';

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
                <Suspense>
                    <ColorFilter />
                </Suspense>
            </div>
        </div>
    );
};

export default Filter;
