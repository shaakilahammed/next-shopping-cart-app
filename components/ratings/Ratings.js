import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Ratings = () => {
    return (
        <div className="flex items-center">
            <div className="flex gap-1 text-sm text-yellow-400">
                <span>
                    <FontAwesomeIcon icon={faStar} />
                </span>
                <span>
                    <FontAwesomeIcon icon={faStar} />
                </span>
                <span>
                    <FontAwesomeIcon icon={faStar} />
                </span>
                <span>
                    <FontAwesomeIcon icon={faStar} />
                </span>
            </div>
            <div className="text-xs text-gray-500 ml-3">(150)</div>
        </div>
    );
};

export default Ratings;
