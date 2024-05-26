import { getRatingsyProductId } from '@/actions/ratings';
import { getAverageRating } from '@/utils/utils';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Ratings = async ({ productId }) => {
    const ratings = await getRatingsyProductId(productId);
    const averageRating = getAverageRating(ratings);
    const fullRating = Math.floor(averageRating);
    return (
        <div className="flex items-center">
            <div className="flex gap-1 text-sm text-yellow-400 items-center">
                {averageRating === 0 ? (
                    <span>No ratings yet</span>
                ) : (
                    Array(fullRating)
                        .fill(null)
                        .map((item, index) => (
                            <span key={index}>
                                <FontAwesomeIcon key={index} icon={faStar} />
                            </span>
                        ))
                )}
                {averageRating > 0 && averageRating - fullRating > 0 && (
                    <FontAwesomeIcon icon={faStarHalfStroke} />
                )}
            </div>
            <div className="text-xs text-gray-500 ml-3">
                ({ratings?.length})
            </div>
        </div>
    );
};

export default Ratings;
