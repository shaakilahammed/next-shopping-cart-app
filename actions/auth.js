'use server';

import { signIn, signOut } from '@/auth';
import { getBaseUrl, replaceMongoIdInObject } from '@/utils/utils';

export const login = async (input) => {
    try {
        const response = await signIn('credentials', {
            email: input.email,
            password: input.password,
            redirect: false,
        });
        return response;
    } catch (error) {
        return null;
    }
};

export const getMyProfile = async (accessToken) => {
    try {
        const response = await fetch(`${getBaseUrl()}/api/auth/profile`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();

        if (response.ok) {
            return replaceMongoIdInObject(data?.data);
        } else if (response.status === 401) {
            await signOut({ callbackUrl: `${getBaseUrl()}/login` });
        } else {
            throw new Error(data.message || 'Failed to update address');
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const updateMyProfile = async (accessToken, toUpdate) => {
    try {
        const response = await fetch(`${getBaseUrl()}/api/auth/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(toUpdate),
        });
        const data = await response.json();

        if (response.ok) {
            return data;
        } else if (response.status === 401) {
            await signOut({ callbackUrl: `${getBaseUrl()}/login` });
        } else {
            throw new Error(data.message || 'Failed to update address');
        }
    } catch (error) {
        throw new Error(error);
    }
};
