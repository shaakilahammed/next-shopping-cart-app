import jwt from 'jsonwebtoken';

export const replaceMongoIdInArray = (arr) => {
    const mappedArray = arr.map(({ _id, ...rest }) => ({
        id: _id.toString(),
        ...rest,
    }));

    return mappedArray;
};

export const replaceMongoIdInObject = (obj) => {
    const { _id, ...rest } = obj;
    return { id: _id.toString(), ...rest };
};

export const getBaseUrl = () => {
    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:3000';
    } else {
        return 'https://next-shopping-cart-app.vercel.app';
    }
};

export const getLiveUrl = () => {
    return 'https://next-shopping-cart-app.vercel.app';
};

export const getAverageRating = (ratings = []) => {
    if (ratings?.length === 0) {
        return 0;
    } else if (ratings?.length === 1) {
        return ratings[0].rating;
    } else {
        return (
            ratings?.reduce((avg, rating) => rating.rating + avg, 0) /
            ratings?.length
        );
    }
};

export const refinedURI = (uri) => {
    const decodedURI = decodeURI(uri);
    if (decodedURI === 'undefined') {
        return '';
    }
    return decodedURI;
};

export const getTokens = async (user) => {
    const accessToken = await jwt.sign(
        { id: user._id, name: user.name, email: user.email, type: 'access' },
        process.env.SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    );

    const refreshToken = await jwt.sign(
        { id: user._id, email: user.email, type: 'refresh' },
        process.env.REFRESH_SECRET_KEY,
        {
            expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
        }
    );

    const expiresIn = new Date().setTime(
        new Date().getTime() +
            convertDurationToMilliseconds(process.env.JWT_EXPIRES_IN)
    );

    return { accessToken, refreshToken, expiresIn };
};

export const refreshToken = async (token) => {
    const response = await fetch(`${getBaseUrl()}/api/auth/refresh-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: token }),
    });
    // console.log('refreshed');
    return await response.json();
};

export const convertDurationToMilliseconds = (duration) => {
    const durationRegex = /^(\d+)([dhms])$/;
    const match = duration.match(durationRegex);

    if (!match) {
        throw new Error('Invalid duration format');
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
        case 'd':
            return value * 24 * 60 * 60 * 1000;
        case 'h':
            return value * 60 * 60 * 1000;
        case 'm':
            return value * 60 * 1000;
        case 's':
            return value * 1000;
        default:
            throw new Error('Invalid time unit');
    }
};

export const calculateTotalAmount = (cartItems) => {
    let totalAmount = 0;

    cartItems.forEach((item) => {
        const price = item.productId.discountPrice;
        const quantity = item.quantity;
        totalAmount += price * quantity;
    });

    return totalAmount;
};
