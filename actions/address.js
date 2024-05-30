'use server';
import { signOut } from '@/auth';
import { getBaseUrl } from '@/utils/utils';
import { updateMyProfile } from './auth';

export const createAddress = async (type, addressData, accessToken) => {
    try {
        const response = await fetch(`${getBaseUrl()}/api/address`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(addressData),
        });
        const data = await response.json();
        if (response.ok) {
            let toUpdate = {};
            if (type === 'Shipping Address') {
                toUpdate.shippingAddress = data?.data?._id;
            } else if (type === 'Billing Address') {
                toUpdate.billingAddress = data?.data?._id;
            }

            await updateMyProfile(accessToken, toUpdate);
            return data;
        } else if (response.status === 401) {
            await signOut({ callbackUrl: `/login` });
        } else {
            throw new Error(data.message || 'Failed to create address');
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const updateAddress = async (id, addressData, accessToken) => {
    try {
        const response = await fetch(`${getBaseUrl()}/api/address`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ id, ...addressData }),
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else if (response.status === 401) {
            await signOut({ callbackUrl: `/login` });
        } else {
            throw new Error(data.message || 'Failed to update address');
        }
    } catch (error) {
        throw new Error(error);
    }
};
