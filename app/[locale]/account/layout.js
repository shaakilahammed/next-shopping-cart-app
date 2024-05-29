const MovieLayout = ({ modal, children }) => {
    return (
        <>
            {children}

            {modal}
        </>
    );
};

export default MovieLayout;
