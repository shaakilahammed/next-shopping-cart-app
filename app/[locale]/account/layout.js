export const metadata = {
    title: 'LWSkart - Account',
};
const MovieLayout = ({ modal, children }) => {
    return (
        <>
            {children}

            {modal}
        </>
    );
};

export default MovieLayout;
