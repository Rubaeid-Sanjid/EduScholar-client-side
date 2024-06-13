import Modal from "react-modal";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import useAuth from "../../../Hooks/useAuth";
import UpdateReviewModalForm from "../../ModalForm/UpdateReviewModalForm";

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

    const getReviews = async () => {
      const res = await axiosSecure.get(`/reviews/by-email/${user.email}`);
      console.log(res.data);
      setUserReviews(res.data);
    };

    getReviews();
  }, []);

  const onRequestClose = () => {
    setIsModalOpen(false);
    navigate("/dashboard");
  };

  const handleEdit = (selectedReview) => {
    setUpdateReview(selectedReview);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h2 className="text-3xl lg:text-4xl font-medium text-center my-8">
        My Reviews
      </h2>
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
                <th></th>
                <th>Scholarship name</th>
                <th>University name</th>
                <th>Review comments</th>
                <th>Review date</th>
                <th>Action</th>
                <th>Action</th>
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
                      onClick={()=>handleEdit(review)}
                      className="btn bg-orange-400 text-white btn-md"
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button className="btn bg-orange-400 text-white btn-md">
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
      {updateReview && <UpdateReviewModalForm
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        updateReview={updateReview}
      ></UpdateReviewModalForm>}
    </div>
  );
};

MyReviews.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
};
export default MyReviews;
