'use client';
import { getBaseUrl } from '@/utils/utils';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';

const DeleteButton = ({ accessToken, productId, colorId }) => {
    const router = useRouter();
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${getBaseUrl()}/api/wish-list`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, colorId }),
            });

            const data = await response.json();
            console.log(data);
            if (response.ok) {
                return;
            } else {
                router.push('/login');
            }
        } catch (error) {
            router.push('/login');
        }
    };
    return (
        <form onSubmit={submitHandler}>
            <button
                type="submit"
                className="text-gray-600 cursor-pointer hover:text-primary"
            >
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </form>
    );
};

export default DeleteButton;
