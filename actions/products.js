'use server';

import {
    getBaseUrl,
    replaceMongoIdInArray,
    replaceMongoIdInObject,
} from '@/utils/utils';

export const getAllProducts = async () => {
    try {
        const response = await fetch(`${getBaseUrl()}/api/products`);
        const data = await response.json();
        if (response.ok) {
            return replaceMongoIdInArray(data?.data);
        }
    } catch (error) {
        console.log(error);
    }
};

export const getProductbyId = async (productId) => {
    try {
        const response = await fetch(
            `${getBaseUrl()}/api/products/${productId}`
        );
        const data = await response.json();
        if (response.ok) {
            return replaceMongoIdInObject(data?.data);
        }
    } catch (error) {
        console.log(error);
    }
};
