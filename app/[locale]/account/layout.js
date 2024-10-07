export const metadata = {
    title: 'NXTkart - Account',
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
