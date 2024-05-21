import Feature from './Feature';

const FeatureList = () => {
    return (
        <div className="container py-16">
            <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center">
                <Feature
                    title="Free Shipping"
                    description="Order over $200"
                    imageUrl="/assets/images/icons/delivery-van.svg"
                />
                <Feature
                    title="Money Returns"
                    description="30 days money returns"
                    imageUrl="/assets/images/icons/money-back.svg"
                />
                <Feature
                    title="Customer support"
                    description="24/7 Support"
                    imageUrl="/assets/images/icons/service-hours.svg"
                />
            </div>
        </div>
    );
};

export default FeatureList;
