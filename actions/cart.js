'use server';

import { signOut } from '@/auth';
import { getBaseUrl } from '@/utils/utils';

export const addToCart = async (accessToken, productId, colorId, quantity) => {
    try {
        const response = await fetch(`${getBaseUrl()}/api/cart`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, colorId, quantity }),
        });

        const data = await response.json();

        if (response.ok) {
            return data;
        } else if (response.status === 401) {
            await signOut({ callbackUrl: `/login` });
        } else {
            throw new Error(data.message || 'Failed to add item to cart');
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const getCart = async (accessToken) => {
    try {
        const response = await fetch(
            `${getBaseUrl()}/api/cart`,
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
            await signOut({ callbackUrl: `/login` });
        } else {
            throw new Error(data.message || 'Failed to fetch cart items');
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const updateCartItemQuantity = async (
    accessToken,
    productId,
    colorId,
    newQuantity
) => {
    try {
        const response = await fetch(`${getBaseUrl()}/api/cart`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, colorId, newQuantity }),
        });

        const data = await response.json();

        if (response.ok) {
            return data;
        } else if (response.status === 401) {
            await signOut({ callbackUrl: `/login` });
        } else {
            throw new Error(
                data.message || 'Failed to update cart item quantity'
            );
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const removeFromCart = async (accessToken, productId, colorId) => {
    try {
        const response = await fetch(`${getBaseUrl()}/api/cart`, {
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
            await signOut({ callbackUrl: `/login` });
        } else {
            throw new Error(data.message || 'Failed to remove item from cart');
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const removeExpiredCartItems = async () => {
    try {
        const response = await fetch(
            `${getBaseUrl()}/api/cart/remove-expires`,
            {
                method: 'GET',
            }
        );

        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || 'Failed to remove expired items');
        }
    } catch (error) {
        throw new Error(error);
    }
};
