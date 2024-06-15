import Modal from "react-modal";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import useAuth from "../../../Hooks/useAuth";
import UpdateReviewModalForm from "../../ModalForm/UpdateReviewModalForm";
import Swal from "sweetalert2";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "1000",
    width: "50%",
    maxHeight: "80vh",
    overflowY: "auto",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: "999",
  },
};

const MyReviews = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userReviews, setUserReviews] = useState(null);
  const [updateReview, setUpdateReview] = useState(null);

  const axiosSecure = useAxiosPrivate();
  const { user } = useAuth();

  useEffect(() => {
    if (location.pathname === "/dashboard/myReviews") {
      setIsModalOpen(true);
    }
    getReviews();
  }, []);

  const getReviews = async () => {
    const res = await axiosSecure.get(`/reviews/by-email/${user.email}`);
    console.log(res.data);
    setUserReviews(res.data);
  };

  const onRequestClose = () => {
    setIsModalOpen(false);
    navigate("/dashboard");
  };

  const handleEditReview = (selectedReview) => {
    setUpdateReview(selectedReview);
    setIsModalOpen(true);
  };

  const handleDeleteReview = (selectedReviewId) => {
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
        const res = await axiosSecure.delete(`/reviews/${selectedReviewId}`);
        if (res.data.deletedCount === 1) {
          Swal.fire({
            title: "Deleted!",
            text: "Your review has been deleted.",
            icon: "success",
          });
          getReviews();
        }
      }
    });
  };

  return (
    <div>
      <SectionTitle title={"My Reviews"}></SectionTitle>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
      >
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="text-lg">#</th>
                <th className="text-lg">Scholarship name</th>
                <th className="text-lg">University name</th>
                <th className="text-lg">Review comments</th>
                <th className="text-lg">Review date</th>
                <th className="text-lg">Action</th>
                <th className="text-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {userReviews?.map((review, idx) => (
                <tr key={review._id} className="hover">
                  <th>{idx + 1}</th>
                  <td>{review.scholarshipName}</td>
                  <td>{review.universityName}</td>
                  <td>{review.reviewerComments}</td>
                  <td>{review.reviewDate}</td>
                  <td>
                    <button
                      onClick={() => handleEditReview(review)}
                      className="btn bg-orange-400 text-white btn-md"
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="btn bg-orange-400 text-white btn-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="btn w-full" onClick={onRequestClose}>
          Close
        </button>
      </Modal>
      {updateReview && (
        <UpdateReviewModalForm
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          updateReview={updateReview}
        ></UpdateReviewModalForm>
      )}
    </div>
  );
};

MyReviews.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
};
export default MyReviews;
