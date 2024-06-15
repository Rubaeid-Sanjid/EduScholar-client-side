import { FaEdit } from "react-icons/fa";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import useScholarships from "../../../Hooks/useScholarships";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import ScholarshipEditModal from "../../ModalForm/ScholarshipEditModal";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";

const ManageScholarships = () => {
  const [scholarships, refetch] = useScholarships();

  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleScholarshipEdit = (scholarship) => {
    setIsModalOpen(true);
    setSelectedScholarship(scholarship);
  };

  const axiosSecure = useAxiosPrivate();

  const handleDeleteScholarship = (scholarshipId) => {
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
        const res = await axiosSecure.delete(`/scholarships/${scholarshipId}`);

        if (res.data.deletedCount === 1) {
          Swal.fire({
            title: "Deleted!",
            text: "Your scholarship data has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };
  return (
    <div>
      <SectionTitle title={"Manage Scholarships"}></SectionTitle>
      <div className="overflow-x-auto container mx-auto px-3 lg:px-12">
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
                  <Link to={`/scholarshipDetails/${scholarship._id}`}>
                    <button className="btn bg-orange-400 text-white">
                      Details
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleScholarshipEdit(scholarship)}
                    className="text-2xl btn bg-orange-400 text-white"
                  >
                    <FaEdit />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteScholarship(scholarship._id)}
                    className="text-2xl btn bg-orange-400 text-white"
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedScholarship && (
        <ScholarshipEditModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          scholarship={selectedScholarship}
          refetch={refetch}
        ></ScholarshipEditModal>
      )}
    </div>
  );
};

export default ManageScholarships;
