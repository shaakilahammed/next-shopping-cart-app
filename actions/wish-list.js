'use server';

import { getBaseUrl } from '@/utils/utils';
import { redirect } from 'next/navigation';

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
        } else {
            redirect('/login');
        }
    } catch (error) {
        redirect('/login');
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
        } else {
            redirect('/login');
        }
    } catch (error) {
        redirect('/login');
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
        } else {
            redirect('/login');
        }
    } catch (error) {
        redirect('/login');
    }
};
