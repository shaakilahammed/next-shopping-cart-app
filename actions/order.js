import { getBaseUrl } from '@/utils/utils';
import { signOut } from 'next-auth/react';

export const createOrder = async (accessToken, orderDetails) => {
    try {
        const response = await fetch(`${getBaseUrl()}/api/orders`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDetails),
        });

        const data = await response.json();

        if (response.ok) {
            return data;
        } else if (response.status === 401) {
            await signOut({ callbackUrl: `${getBaseUrl()}/login` });
        } else {
            throw new Error(data.message || 'Failed to create order');
        }
    } catch (error) {
        throw new Error(error.message || 'Something went wrong');
    }
};

export const getOrders = async (accessToken) => {
    try {
        const response = await fetch(
            `${getBaseUrl()}/api/orders`,
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
            throw new Error(data.message || 'Failed to fetch cart items');
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const getOrderById = async (accessToken, orderId) => {
    try {
        const response = await fetch(`${getBaseUrl()}/api/orders/${orderId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            return data?.data;
        } else if (response.status === 401) {
            await signOut({ callbackUrl: `${getBaseUrl()}/login` });
        } else {
            throw new Error(data.message || 'Failed to fetch cart items');
        }
    } catch (error) {
        throw new Error(error);
    }
};
