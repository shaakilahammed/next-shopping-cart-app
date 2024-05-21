import { faChevronRight, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const Breadcrumb = ({ children }) => {
    return (
        <div className="container py-4 flex items-center gap-3">
            <Link href="/" className="text-primary text-base">
                <FontAwesomeIcon icon={faHouse} />
            </Link>
            <span className="text-sm text-gray-400">
                <FontAwesomeIcon icon={faChevronRight} />
            </span>
            {children}
        </div>
    );
};

export default Breadcrumb;
