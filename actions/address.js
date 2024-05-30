'use server';
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
            let toUpdate;
            if (type === 'Shipping Address') {
                toUpdate = { shippingAddress: data?.data?._id };
            }
            if (type === 'Billing Address') {
                toUpdate = { billingAddress: data?.data?._id };
            }
            // console.log(accessToken, toUpdate);
            await updateMyProfile(accessToken, toUpdate);
            return data;
        } else {
            throw new Error(data.message || 'Failed to create address');
        }
    } catch (error) {
        console.error('Error creating address:', error);
        throw error;
    }
};

export const updateAddress = async (id, addressData, accessToken) => {
    // console.log(addressData, id);
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
        } else {
            throw new Error(data.message || 'Failed to update address');
        }
    } catch (error) {
        console.error('Error updating address:', error);
        throw error;
    }
};
