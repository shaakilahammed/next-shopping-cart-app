'use server';

import { getBaseUrl, replaceMongoIdInArray } from '@/utils/utils';

export const getAllColors = async () => {
    try {
        const response = await fetch(`${getBaseUrl()}/api/colors`);
        const data = await response.json();
        if (response.ok) {
            return replaceMongoIdInArray(data?.data);
        }
    } catch (error) {
        console.log(error);
    }
};
