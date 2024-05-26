'use server';

import { getBaseUrl, replaceMongoIdInArray } from '@/utils/utils';

export const getRatingsyProductId = async (productId) => {
    try {
        const response = await fetch(
            `${getBaseUrl()}/api/products/${productId}/ratings`
        );
        const data = await response.json();
        if (response.ok) {
            return replaceMongoIdInArray(data?.data);
        }
    } catch (error) {
        console.log(error);
    }
};
