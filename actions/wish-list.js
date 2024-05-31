'use server';

import { signOut } from '@/auth';
import { getBaseUrl } from '@/utils/utils';

export const addToWishlist = async (accessToken, productId, colorId) => {
    try {
        const response = await fetch(`${getBaseUrl()}/api/wish-list`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, colorId }),
        });

        const data = await response.json();

        if (response.ok) {
            return data;
        } else if (response.status === 401) {
            await signOut({ callbackUrl: `${getBaseUrl()}/login` });
        } else {
            throw new Error(data.message || 'Failed to add item to wishlist');
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const removeFromWishlist = async (accessToken, productId, colorId) => {
    try {
        const response = await fetch(`${getBaseUrl()}/api/wish-list`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, colorId }),
        });

        const data = await response.json();

        if (response.ok) {
            return data;
        } else if (response.status === 401) {
            await signOut({ callbackUrl: `${getBaseUrl()}/login` });
        } else {
            throw new Error(
                data.message || 'Failed to remove item from wishlist'
            );
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const getWishlist = async (accessToken) => {
    try {
        const response = await fetch(
            `${getBaseUrl()}/api/wish-list`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
            { cache: 'no-store' }
        );

        const data = await response.json();

        if (response.ok) {
            return data?.data;
        } else if (response.status === 401) {
            await signOut({ callbackUrl: `${getBaseUrl()}/login` });
        } else {
            throw new Error(data.message || 'Failed to fetch wishlist');
        }
    } catch (error) {
        throw new Error(error);
    }
};
