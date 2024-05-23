'use server';

import { getBaseUrl, replaceMongoIdInArray } from '@/utils/utils';

export const getAllCategories = async () => {
    try {
        const response = await fetch(`${getBaseUrl()}/api/categories`);
        const data = await response.json();
        if (response.ok) {
            return replaceMongoIdInArray(data?.data);
        }
    } catch (error) {
        console.log(error);
    }
};
