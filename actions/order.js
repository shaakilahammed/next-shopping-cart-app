'use server';
import { signOut } from '@/auth';
import { getBaseUrl } from '@/utils/utils';
import { Resend } from 'resend';
import { getMyProfile } from './auth';

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
            await sendEmail(accessToken, data?.data._id);
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

const sendEmail = async (accessToken, orderId) => {
    try {
        // console.log(eventId, user, process.env.RESEND_API_KEY);
        const order = await getOrderById(accessToken, orderId);
        const user = await getMyProfile(accessToken);
        const resend = new Resend(process.env.RESEND_API_KEY);
        const message = `Dear ${user?.name}, you have been successfully placed order, #${orderId}.`;
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: user?.email,
            subject: `Order #${orderId} - Successfully placed!`,
            react: <div className="text-xl">{message}</div>,
        });
    } catch (error) {
        console.log(error);
    }
};
