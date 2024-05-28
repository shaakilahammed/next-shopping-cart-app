'use client';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const PriceFilter = ({ title, minText, maxText }) => {
    const [error, setError] = useState('');
    const [values, setValues] = useState({
        min: '',
        max: '',
    });
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const params = useMemo(() => new URLSearchParams(searchParams), [
        searchParams,
    ]);

    const handleChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        const name = e.target.name;

        if (name === 'min') {
            if (value >= 0 && value <= values.max) {
                setValues((prev) => ({ ...prev, min: value }));
                setError('');
            } else {
                setError('Minimum price must be >= 0 & <= maximum price');
            }
        }
        if (name === 'max') {
            if (value >= 0 && value >= values.min) {
                setValues((prev) => ({ ...prev, max: value }));
                setError('');
            } else {
                setError('Maximum price must be >= 0 & >= minimum price');
            }
        }
    };

    useEffect(() => {
        const min = params.get('min');
        const max = params.get('max');
        if (min) {
            const decodedMin = decodeURI(min);
            setValues((prev) => ({ ...prev, min: decodedMin }));
        }
        if (max) {
            const decodedMax = decodeURI(max);
            setValues((prev) => ({ ...prev, max: decodedMax }));
        }
    }, [params]);

    useEffect(() => {
        if (values.min) {
            params.set('min', encodeURI(values.min));
        } else {
            params.delete('min');
        }
        if (values.max) {
            params.set('max', encodeURI(values.max));
        } else {
            params.delete('max');
        }
        router.replace(`${pathname}?${params.toString()}`);
    }, [pathname, router, params, values.min, values.max]);
    return (
        <div className="pt-4">
            <div className="flex justify-between items-center mb-3">
                <span className="text-xl text-gray-800 uppercase font-medium">
                    {title}
                </span>
                <button
                    className="text-lg  hover:text-red-600 px-2 py-1 text-red-500 rounded-sm flex items-center"
                    onClick={() =>
                        setValues({
                            min: '',
                            max: '',
                        })
                    }
                >
                    <FontAwesomeIcon icon={faClose} />
                </button>
            </div>
            <div className="mt-4 flex items-center">
                <input
                    type="number"
                    name="min"
                    id="min"
                    onChange={handleChange}
                    value={values.min}
                    min={0}
                    max={values.max}
                    className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                    placeholder={minText}
                />
                <span className="mx-3 text-gray-500">-</span>
                <input
                    type="number"
                    max={1000}
                    min={values.min}
                    name="max"
                    id="max"
                    value={values.max}
                    onChange={handleChange}
                    className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                    placeholder={maxText}
                />
            </div>
            {error && (
                <span className="text-red-500 text-sm font-normal">
                    {error}
                </span>
            )}
        </div>
    );
};

export default PriceFilter;
