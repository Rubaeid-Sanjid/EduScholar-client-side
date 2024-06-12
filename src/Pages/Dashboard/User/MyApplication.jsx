import { Link } from "react-router-dom";
import useAppliedScholarship from "../../../Hooks/useAppliedScholarship";
import Swal from "sweetalert2";
import { useState } from "react";
import UpdateModalForm from "../../ModalForm/UpdateModalForm";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import ReviewModalForm from "../../ModalForm/ReviewModalForm";

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
      <h2 className="text-3xl lg:text-4xl font-medium text-center my-8">
        My Application
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>University Name</th>
              <th>University Address</th>
              <th>Feedback</th>
              <th>Subject Category</th>
              <th>Applied Degree</th>
              <th>Application Fees</th>
              <th>Service Charge</th>
              <th>Application Status</th>
              <th>Action</th>
              <th>Action</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myAppliedScholarship.map((appliedScholarship, idx) => (
              <tr key={appliedScholarship._id}>
                <th>{idx + 1}</th>
                <td>{appliedScholarship.universityName}</td>
                <td>{appliedScholarship.address}</td>
                <td>{appliedScholarship.feedback}</td>
                <td>{appliedScholarship.subject}</td>
                <td>{appliedScholarship.degree}</td>
                <td>{appliedScholarship.applicationFees}</td>
                <td>{appliedScholarship.serviceCharge}</td>
                <td>{appliedScholarship.status}</td>
                <td>
                  <Link to={`/scholarshipDetails/${appliedScholarship._id}`}>
                    <button className="btn-sm bg-orange-400 text-white btn">
                      Details
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleEdit(appliedScholarship, appliedScholarship.status)
                    }
                    className="btn-sm bg-orange-400 text-white btn"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleCancel(appliedScholarship._id)}
                    className="btn-sm bg-orange-400 text-white btn"
                  >
                    Cancel Apply
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleReview(appliedScholarship.scholarshipId)
                    }
                    className="btn-sm bg-orange-400 text-white btn"
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
