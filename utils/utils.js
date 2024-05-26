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
