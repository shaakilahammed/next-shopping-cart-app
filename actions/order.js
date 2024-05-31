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
