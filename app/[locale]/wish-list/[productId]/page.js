import { addToWishlist } from '@/actions/wish-list';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const AddProductWishListPage = async ({
    searchParams: { color },
    params: { productId, locale },
}) => {
    const session = await auth();

    if (!session) {
        redirect(`/${locale}/login`);
        return null;
    }

    const response = await addToWishlist(
        session?.tokens?.accessToken,
        productId,
        color
    );
    if (response?.success) {
        redirect(`/${locale}/wish-list`);
    } else {
        redirect(`/${locale}/wish-list`);
    }

    return null;
};

export default AddProductWishListPage;
