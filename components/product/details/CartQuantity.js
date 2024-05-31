'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const CartQuantity = ({ text, initialQuantity, initialProductStock }) => {
    const [quantity, setQuantity] = useState(initialQuantity);
    const [stock, setStock] = useState(initialProductStock);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const params = useMemo(() => new URLSearchParams(searchParams), [
        searchParams,
    ]);
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

        const updatedQuantity = newQuantity(+quantity);
        setQuantity(updatedQuantity);
    };

    useEffect(() => {
        const qntity = params.get('quantity');
        if (qntity) {
            const decodedQuantity = decodeURI(qntity);
            setQuantity(decodedQuantity);
        } else {
            setQuantity(1);
        }
    }, [params]);

    useEffect(() => {
        if (quantity) {
            params.set('quantity', encodeURI(quantity));
        } else {
            params.set('quantity', 1);
        }
        router.replace(`${pathname}?${params.toString()}`);
    }, [params, pathname, quantity, router]);
    return (
        <div className="mt-4">
            <h3 className="text-sm text-gray-800 uppercase mb-1">{text}</h3>
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
        </div>
    );
};

export default CartQuantity;
