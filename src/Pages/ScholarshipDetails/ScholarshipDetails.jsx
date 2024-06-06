import { useLoaderData } from "react-router-dom";

const ScholarshipDetails = () => {
  const scholarshipDetails = useLoaderData();
  const {
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
  return (
    <div>
      <h2>{universityName}</h2>
    </div>
  );
};

export default ScholarshipDetails;
