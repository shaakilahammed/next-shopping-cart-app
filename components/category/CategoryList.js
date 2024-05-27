import { getAllCategories } from '@/actions/categories';
import { getDictionary } from '@/lib/dictionaries';
import Category from './Category';

const CategoryList = async ({ locale }) => {
    const dict = await getDictionary(locale);
    const categories = await getAllCategories();

    return (
        <div className="container py-16">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                {dict.sections.shopByCategory}
            </h2>
            {categories?.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {categories?.map((category) => (
                        <Category key={category?.id} category={category} />
                    ))}
                </div>
            ) : (
                <span>No category found!</span>
            )}
        </div>
    );
};

export default CategoryList;
