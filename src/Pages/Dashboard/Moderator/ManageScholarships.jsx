import { FaEdit } from "react-icons/fa";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import useScholarships from "../../../Hooks/useScholarships";
import { MdDeleteForever } from "react-icons/md";

const ManageScholarships = () => {
  const [scholarships, refetch] = useScholarships();

  return (
    <div>
      <SectionTitle title={"Manage Scholarships"}></SectionTitle>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="text-lg">#</th>
              <th className="text-lg">Scholarship name</th>
              <th className="text-lg">University Name</th>
              <th className="text-lg">Subject Category</th>
              <th className="text-lg">Applied Degree</th>
              <th className="text-lg">Application Fees</th>
              <th className="text-lg">Action</th>
              <th className="text-lg">Action</th>
              <th className="text-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((scholarship, index) => (
              <tr key={scholarship._id} className="hover">
                <th>{index + 1}</th>
                <td>{scholarship.scholarshipName}</td>
                <td>{scholarship.universityName}</td>
                <td>{scholarship.subjectName}</td>
                <td>{scholarship.degree}</td>
                <td>{scholarship.applicationFees}</td>
                <td>
                  <button className="btn bg-orange-400 text-white">
                    Details
                  </button>
                </td>
                <td>
                  <button className="text-2xl btn bg-orange-400 text-white">
                    <FaEdit />
                  </button>
                </td>
                <td>
                  <button className="text-2xl btn bg-orange-400 text-white">
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageScholarships;
