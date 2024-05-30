'use server';

import { signIn } from '@/auth';
import { getBaseUrl, replaceMongoIdInObject } from '@/utils/utils';
import { redirect } from 'next/navigation';

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
        }
    } catch (error) {
        redirect('/login');
    }
};

export const updateMyProfile = async (accessToken, toUpdate) => {
    try {
        const response = await fetch(`${getBaseUrl()}/api/auth/profile`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(toUpdate),
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        }
    } catch (error) {
        redirect('/login');
    }
};
