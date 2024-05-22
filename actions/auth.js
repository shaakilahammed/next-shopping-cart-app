'use server';

import { signIn } from '@/auth';

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
