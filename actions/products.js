'use server';

import {
    getBaseUrl,
    replaceMongoIdInArray,
    replaceMongoIdInObject,
} from '@/utils/utils';

export const getAllProducts = async (q, category, color, min, max) => {
    try {
        const response = await fetch(
            `${getBaseUrl()}/api/products?q=${encodeURI(
                q
            )}&category=${encodeURI(category)}&color=${encodeURI(
                color
            )}&min=${min}&max=${max}`
        );
        const data = await response.json();
        if (response.ok) {
            return replaceMongoIdInArray(data?.data);
        }
    } catch (error) {
        console.log(error);
    }
};

export const getRelatedProducts = async (productId) => {
    try {
        const response = await fetch(
            `${getBaseUrl()}/api/products/${productId}/related`
        );
        const data = await response.json();
        if (response.ok) {
            return replaceMongoIdInArray(data?.data);
        }
    } catch (error) {
        console.log(error);
    }
};

export const getTrendingProducts = async () => {
    try {
        const response = await fetch(`${getBaseUrl()}/api/products/trending`);
        const data = await response.json();
        if (response.ok) {
            return replaceMongoIdInArray(data?.data);
        }
    } catch (error) {
        console.log(error);
    }
};

export const getNewArrivalProducts = async () => {
    try {
        const response = await fetch(
            `${getBaseUrl()}/api/products/new-arrival`
        );
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
