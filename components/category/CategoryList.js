import Category from './Category';

const CategoryList = () => {
    return (
        <div className="container py-16">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                shop by category
            </h2>
            <div className="grid grid-cols-3 gap-3">
                <Category />
                <Category />
                <Category />
                <Category />
                <Category />
            </div>
        </div>
    );
};

export default CategoryList;
