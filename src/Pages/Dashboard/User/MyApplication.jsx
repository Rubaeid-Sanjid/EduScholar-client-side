import { Link } from "react-router-dom";
import useAppliedScholarship from "../../../Hooks/useAppliedScholarship";
import Swal from "sweetalert2";
import { useState } from "react";
import UpdateModalForm from "../../ModalForm/UpdateModalForm";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import ReviewModalForm from "../../ModalForm/ReviewModalForm";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";

const MyApplication = () => {
  const [myAppliedScholarship, refetch] = useAppliedScholarship();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scholarship, setScholarship] = useState(null);
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  const axiosSecure = useAxiosPrivate();

  const handleEdit = (appliedScholarship, status) => {
    if (status === "Processing") {
      Swal.fire({
        icon: "error",
        title: "Sorry! Can not Edit. Application is processing",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
    } else {
      setSelectedScholarship(appliedScholarship);
      setIsModalOpen(true);
    }
  };

  const handleReview = async (scholarshipId) => {
    setIsModalOpen(true);

    const res = await axiosSecure.get(`/scholarships/${scholarshipId}`);
    setScholarship(res.data);
  };

  const handleCancel = (appliedScholarshipId) => {
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
        const res = await axiosSecure.delete(
          `/appliedScholarship/${appliedScholarshipId}`
        );

        if (res.data.deletedCount === 1) {
          Swal.fire({
            title: "Deleted!",
            text: "Your application has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };
  return (
    <div>
      <SectionTitle title={"My Applications"}></SectionTitle>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="text-lg">#</th>
              <th className="text-lg">University Name</th>
              <th className="text-lg">University Address</th>
              <th className="text-lg">Feedback</th>
              <th className="text-lg">Subject Category</th>
              <th className="text-lg">Applied Degree</th>
              <th className="text-lg">Application Fees</th>
              <th className="text-lg">Service Charge</th>
              <th className="text-lg">Application Status</th>
              <th className="text-lg">Action</th>
              <th className="text-lg">Action</th>
              <th className="text-lg">Action</th>
              <th className="text-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {myAppliedScholarship.map((appliedScholarship, idx) => (
              <tr key={appliedScholarship._id}>
                <th>{idx + 1}</th>
                <td>{appliedScholarship.universityName}</td>
                <td>{appliedScholarship.address}</td>
                <td className="text-red-500">{appliedScholarship.feedback}</td>
                <td>{appliedScholarship.subject}</td>
                <td>{appliedScholarship.degree}</td>
                <td>{appliedScholarship.applicationFees}</td>
                <td>{appliedScholarship.serviceCharge}</td>
                {appliedScholarship.status === "Rejected" ? (
                  <td className="text-red-600">{appliedScholarship.status}</td>
                ) : (
                  <td className="text-green-600">
                    {appliedScholarship.status}
                  </td>
                )}
                <td>
                  <Link to={`/scholarshipDetails/${appliedScholarship._id}`}>
                    <button className="btn-md bg-orange-400 text-white btn">
                      Details
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleEdit(appliedScholarship, appliedScholarship.status)
                    }
                    className="btn-md bg-orange-400 text-white btn"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleCancel(appliedScholarship._id)}
                    className="btn-md bg-orange-400 text-white btn"
                  >
                    Cancel apply
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleReview(appliedScholarship.scholarshipId)
                    }
                    className="btn-md bg-orange-400 text-white btn"
                  >
                    Add review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedScholarship && (
        <UpdateModalForm
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          selectedScholarship={selectedScholarship}
          refetch={refetch}
        />
      )}
      <ReviewModalForm
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        scholarship={scholarship}
      />
    </div>
  );
};

export default MyApplication;
