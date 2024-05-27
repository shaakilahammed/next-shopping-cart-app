'use client';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const Search = ({ dict }) => {
    const [query, setQuery] = useState('');
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const params = useMemo(() => new URLSearchParams(searchParams), [
        searchParams,
    ]);

    const handleSubmit = () => {
        if (query !== '') {
            params.set('q', encodeURI(query));
        } else {
            params.delete('q');
        }
        if (pathname.includes('shop')) {
            router.replace(`${pathname}?${params.toString()}`);
        } else {
            router.replace(`/shop?${params.toString()}`);
        }
    };

    useEffect(() => {
        const q = params.get('q');
        if (q) {
            const decodedQuery = decodeURI(q);
            setQuery(decodedQuery);
        }
    }, [params]);
    return (
        <div className="w-full max-w-xl relative flex">
            <span className="absolute left-4 top-3 text-lg text-gray-400 hidden md:block">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
            <form onSubmit={handleSubmit} className="flex">
                <input
                    type="text"
                    name="search"
                    id="search"
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex"
                    placeholder={dict.header.searchHere}
                />
                <button className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex md:items-center">
                    {dict.header.search}
                </button>
            </form>
        </div>
    );
};

export default Search;
