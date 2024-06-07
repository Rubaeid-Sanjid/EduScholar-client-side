import { useLoaderData } from "react-router-dom";
import Reviews from "../../Component/Reviews/Reviews";

const ScholarshipDetails = () => {
  const scholarshipDetails = useLoaderData();

  const {
    _id,
    universityName,
    universityImage,
    scholarshipCategory,
    universityLocation,
    applicationDeadline,
    subjectName,
    scholarshipDescription,
    stipend,
    postDate,
    serviceCharge,
    applicationFees,
    rating,
  } = scholarshipDetails;

console.log(_id);
  return (
    <div className="container mx-auto lg:px-12 px-3 py-32">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure className="flex-1">
          <img src={universityImage} alt="" />
        </figure>

        <div className="card-body flex-1">
          <div className="flex gap-3 items-center">
            <h2 className="card-title">{universityName}</h2>

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

          <h3 className="mb-3">
            {universityLocation.city}, {universityLocation.country}
          </h3>

          <h3 className="mb-3">
            <span className="font-bold text-gray-600">Posted on:</span> {postDate}
          </h3>

          <p className="mb-3">{scholarshipDescription}</p>

          <h3 className="flex justify-between mb-2 pb-2 border-b-2 border-dotted">
            <span className="font-bold text-gray-600">Scholarship Category: </span>
            {scholarshipCategory}
          </h3>

          <h3 className="flex justify-between mb-2 pb-2 border-b-2 border-dotted">
            <span className="font-bold text-gray-600">Subject: </span>
            {subjectName}
          </h3>

          <h3 className="flex justify-between mb-2 pb-2 border-b-2 border-dotted">
            <span className="font-bold text-gray-600">Application Deadline: </span>
            {applicationDeadline}
          </h3>

          <h3 className="font-bold border-orange-400 border-b-2 py-2 text-lg w-28 mb-4">
            Cost Details
          </h3>

          <h3 className="flex justify-between mb-2 pb-2 border-b-2 border-dotted">
            <span className="font-bold text-gray-600">Application Fees: </span>
            {applicationFees}
          </h3>
          <h3 className="flex justify-between mb-2 pb-2 border-b-2 border-dotted">
            <span className="font-bold text-gray-600">Stipend: </span>
            {stipend}
          </h3>
          <h3 className="flex justify-between mb-2 pb-2 border-b-2 border-dotted">
            <span className="font-bold text-gray-600">Service Charge: </span>
            {serviceCharge}
          </h3>

          <div className="card-actions justify-end">
            <button className="btn bg-orange-400 text-white">Apply Scholarship</button>
          </div>
        </div>
      </div>
      <Reviews scholarshipId={_id}></Reviews>
    </div>
  );
};

export default ScholarshipDetails;
