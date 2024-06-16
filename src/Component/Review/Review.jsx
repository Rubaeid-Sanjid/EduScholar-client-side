import { Rating } from "@smastrom/react-rating";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

const Review = ({ review, refetch }) => {
  const axiosSecure = useAxiosPrivate();

  const handleReviewDelete = (reviewId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/reviews/${reviewId}`);

        if (res.data.deletedCount === 1) {
          Swal.fire({
            title: "Deleted!",
            text: "Review has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };
  return (
    <div className="card items-center bg-base-100 shadow-xl">
      <div className="card-body">
            <h2 className="text-center text-xl font-semibold">{review.universityName}</h2>
            <h2 className="text-center font-medium border-b pb-2">{review.subjectName}</h2>
        <div className="flex gap-3 my-2">
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
        <div className="card-actions justify-end">
          <button
            onClick={() => handleReviewDelete(review._id)}
            className="btn bg-orange-400 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

Review.propTypes = {
  review: PropTypes.object,
  refetch: PropTypes.func,
};

export default Review;
