'use client';

import { updateCartItemQuantity } from '@/actions/cart';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';

const ProductQuantity = ({
    initialQuantity,
    productId,
    initialProductStock,
    colorId,
}) => {
    const router = useRouter();
    const [quantity, setQuantity] = useState(initialQuantity);
    const [stock, setStock] = useState(initialProductStock);
    const { data: session } = useSession();
    if (!session) {
        redirect(`/login`);
    }
    const accessToken = session?.tokens?.accessToken;

    const handleQuantity = async (action) => {
        const newQuantity = (prevQuantity) => {
            if (action === 'decrement' && prevQuantity > 1) {
                setStock((prev) => prev + 1);
                return prevQuantity - 1;
            } else if (
                action === 'increment' &&
                stock > 0 &&
                prevQuantity < 5
            ) {
                setStock((prev) => prev - 1);
                return prevQuantity + 1;
            }
            return prevQuantity;
        };

        const updatedQuantity = newQuantity(quantity);

        if (updatedQuantity !== quantity) {
            setQuantity(updatedQuantity);

            try {
                await updateCartItemQuantity(
                    accessToken,
                    productId,
                    colorId,
                    updatedQuantity
                );
                router.refresh();
            } catch (error) {
                setQuantity(quantity);
            }
        }
    };
    return (
        <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
            <div
                onClick={() => handleQuantity('decrement')}
                className={`h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none ${
                    quantity === 1 && 'cursor-not-allowed bg-gray-200'
                }`}
            >
                -
            </div>
            <div className="h-8 w-8 text-base flex items-center justify-center">
                {quantity}
            </div>
            <div
                onClick={() => handleQuantity('increment')}
                className={`h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none ${
                    (quantity === 5 || stock === 0) &&
                    'cursor-not-allowed bg-gray-200'
                }`}
            >
                +
            </div>
        </div>
    );
};

export default ProductQuantity;
