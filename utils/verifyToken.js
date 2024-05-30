import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const verifyToken = async (req) => {
    const accessToken = req.headers.get('authorization')?.split(' ')[1];

    if (!accessToken) {
        return NextResponse.json(
            { message: 'Access token required' },
            { status: 401 }
        );
    }

    try {
        const decoded = await jwt.verify(accessToken, process.env.SECRET_KEY);

        if (!decoded) {
            return NextResponse.json(
                { message: 'Invalid access token' },
                { status: 401 }
            );
        }

        return { success: true, decoded };
    } catch (error) {
        return NextResponse.json(
            { message: 'Invalid access token' },
            { status: 401 }
        );
    }
};

export default verifyToken;
