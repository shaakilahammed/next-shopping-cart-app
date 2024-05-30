import jwt from 'jsonwebtoken';

const verifyToken = async (req) => {
    const accessToken = req.headers.get('authorization')?.split(' ')[1];

    if (!accessToken) {
        return { success: false, message: 'Access token required' };
    }

    try {
        const decoded = await jwt.verify(accessToken, process.env.SECRET_KEY);

        if (!decoded) {
            return { success: false, message: 'Invalid access token' };
        }

        return { success: true, decoded };
    } catch (error) {
        return { success: false, message: 'Invalid access token' };
    }
};

export default verifyToken;
