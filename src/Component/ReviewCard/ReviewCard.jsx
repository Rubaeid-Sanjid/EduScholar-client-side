import PropTypes from "prop-types";

import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ReviewCard = ({ review }) => {
  return (
    <div className="card shadow-xl p-6 items-center">
      <div className="card-body">
        <div className="flex gap-3 mb-2">
          <div className="avatar">
            <div className="w-16 rounded-full">
              <img src={review.reviewerImage} />
            </div>
          </div>

          <div>
            <h2 className="card-title">{review.reviewerName}</h2>
            <h2 className="text-gray-500">
              <span>Posted On:</span> {review.reviewDate}
            </h2>
          </div>
        </div>

        <p>{review.reviewerComments}</p>
        <div className="card-actions justify-center my-2">
          <Rating
            style={{ maxWidth: 180 }}
            value={review.ratingPoint}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.object,
};

export default ReviewCard;
