import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import Scholarship from "../Scholarship/Scholarship";
import { axiosPublic } from "../../Hooks/useAxiosPublic";

const Scholarships = () => {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    axiosPublic.get("/scholarships").then((res) => {
      setScholarships(res.data);
    });
  }, []);

  const sortedScholarships = scholarships.sort((a, b) => {
    const firstItem = parseInt(a.applicationFees.split("$")[1]);
    const secondItem = parseInt(b.applicationFees.split("$")[1]);

    if (firstItem === secondItem) {
      return new Date(b.postDate) - new Date(a.postDate);
    }

    return firstItem - secondItem;
  });

  return (
    <div className="container mx-auto px-3 lg:px-12 my-8 lg:my-14">
      <SectionTitle
        title={"Top Scholarships for Your Bright Future"}
        subtitle={
          "Discover and Apply to the Best Scholarships at Leading Universities Worldwide"
        }
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedScholarships.map((scholarshipItem) => (
          <Scholarship
            key={scholarshipItem._id}
            scholarshipItem={scholarshipItem}
          ></Scholarship>
        ))}
      </div>
      <Link className="flex justify-center my-6" to={'/allScholarships'}>
        <button className="btn bg-orange-400 text-white">
          All Scholarships
        </button>
      </Link>
    </div>
  );
};

export default Scholarships;
