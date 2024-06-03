import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";

const Scholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  useEffect(() => {
    fetch("scholarship.json")
      .then((res) => res.json())
      .then((data) => setScholarships(data));
  }, []);
  return (
    <div className="container mx-auto px-3 lg:px-12 my-8 lg:my-14">
      <SectionTitle
        title={"Top Scholarships for Your Bright Future"}
        subtitle={
          "Discover and Apply to the Best Scholarships at Leading Universities Worldwide"
        }
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scholarships.map((scholarshipItem) => (
          <div
            className="card bg-base-100 shadow-xl"
            key={scholarshipItem._id}
          >
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{scholarshipItem.universityName}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scholarships;
