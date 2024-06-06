import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Scholarship = ({ scholarshipItem }) => {
  const {
    _id,
    universityName,
    universityImage,
    scholarshipCategory,
    universityLocation,
    applicationDeadline,
    subjectName,
    applicationFees,
    rating,
  } = scholarshipItem;
  return (
    <div>
      <div className="card bg-base-100 rounded-none shadow-xl">
        <figure className="h-[250px]">
          <img
            src={universityImage}
            alt="University Image"
            className="h-full w-full"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title mb-4">{universityName}</h2>
          <h3 className="flex justify-between mb-2 pb-2 border-b-2">
            <span className="font-bold">Category: </span>
            {scholarshipCategory}
          </h3>
          <h3 className="flex justify-between mb-2 pb-2 border-b-2">
            <span className="font-bold">University Location: </span>
            {universityLocation.city}, {universityLocation.country}
          </h3>
          <h3 className="flex justify-between mb-2 pb-2 border-b-2">
            <span className="font-bold">Application Deadline: </span>
            {applicationDeadline}
          </h3>
          <h3 className="flex justify-between mb-2 pb-2 border-b-2">
            <span className="font-bold">Subject: </span>
            {subjectName}
          </h3>
          <h3 className="flex justify-between mb-2 pb-2 border-b-2">
            <span className="font-bold">Application Fees: </span>
            {applicationFees}
          </h3>
          <div className="flex justify-between">
            <h3 className="font-bold">Rating:</h3>
            <div className="badge badge-outline rating rating-sm">
              <input
                type="radio"
                name="rating-6"
                className="mask mask-star-2 bg-orange-400 mr-1"
                checked
              />
              {rating}
            </div>
          </div>
          <div className="card-actions justify-end mt-4">
            <Link to={`/scholarshipDetails/${_id}`}>
              <button className="btn bg-orange-400 text-white">
                Scholarship Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
Scholarship.propTypes = {
  scholarshipItem: PropTypes.object,
};
export default Scholarship;
