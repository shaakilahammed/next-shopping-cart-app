import { getDictionary } from '@/lib/dictionaries';
import Feature from './Feature';

const FeatureList = async ({ locale }) => {
    const dict = await getDictionary(locale);
    return (
        <div className="container py-16">
            <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center">
                <Feature
                    title={dict.features.freeShipping.title}
                    description={dict.features.freeShipping.description}
                    imageUrl="/assets/images/icons/delivery-van.svg"
                />
                <Feature
                    title={dict.features.moneyReturns.title}
                    description={dict.features.moneyReturns.description}
                    imageUrl="/assets/images/icons/money-back.svg"
                />
                <Feature
                    title={dict.features.customerSupport.title}
                    description={dict.features.customerSupport.description}
                    imageUrl="/assets/images/icons/service-hours.svg"
                />
            </div>
        </div>
    );
};

export default FeatureList;
