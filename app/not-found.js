import NotFound from '@/components/ui/NotFound';

const RootNotFoundPage = () => {
    let message = 'The page you are requested is not found!';

    return <NotFound message={message} />;
};

export default RootNotFoundPage;
