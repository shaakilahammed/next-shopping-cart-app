import { getAllCategories } from '@/actions/categories';
import { getDictionary } from '@/lib/dictionaries';
import { Suspense } from 'react';
import CategoryFilter from './CategoryFilter';
import ColorFilter from './ColorFilter';
import PriceFilter from './PriceFilter';

const Filter = async ({ locale }) => {
    const categories = await getAllCategories();
    const dict = await getDictionary(locale);

    return (
        <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
            <div className="divide-y divide-gray-200 space-y-5">
                <Suspense>
                    <CategoryFilter
                        categories={categories}
                        title={dict.filter.categories}
                    />
                </Suspense>

                <Suspense>
                    <PriceFilter
                        title={dict.filter.price}
                        minText={dict.filter.min}
                        maxText={dict.filter.max}
                    />
                </Suspense>
                <Suspense>
                    <ColorFilter title={dict.filter.color} />
                </Suspense>
            </div>
        </div>
    );
};

export default Filter;
