import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import Modal from "react-modal";

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

const UpdateReviewModalForm = ({ isOpen, onRequestClose, updateReview }) => {
  const { register, handleSubmit, reset } = useForm();

  const axiosSecure = useAxiosPrivate();

  const onSubmit = async (data) => {
    const updatedReviewInfo = {
      reviewDate: data.date,
      ratingPoint: parseFloat(data.rating),
      reviewerComments: data.comment,
    };

    const res = await axiosSecure.patch(`/reviews/${updateReview._id}`, updatedReviewInfo);
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your review has been updated",
        showConfirmButton: false,
        timer: 3000,
      });
      reset();
      onRequestClose(true);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <h2 className="text-center text-3xl font-bold">
        Update your review here
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span className="text-lg">Rating point</span>
          </label>
          <input
            type="number"
            placeholder="Rating point"
            className="input input-bordered"
            max={5}
            min={1}
            step="any"
            required
            {...register("rating")}
            defaultValue={updateReview.ratingPoint}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="text-lg">Review comment</span>
          </label>

          <textarea
            placeholder="comment"
            className="textarea textarea-bordered textarea-md w-full"
            required
            {...register("comment")}
            defaultValue={updateReview.reviewerComments}
          ></textarea>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="text-lg">Review date</span>
          </label>

          <input
            type="date"
            className="input input-bordered"
            required
            {...register("date")}
            defaultValue={updateReview.reviewDate}
          />
        </div>

        <button className="btn bg-orange-400 text-white my-3 w-full">
          Repost Review
        </button>
      </form>
      <button className="btn w-full" onClick={onRequestClose}>
        Close
      </button>
    </Modal>
  );
};

UpdateReviewModalForm.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  updateReview: PropTypes.object,
};

export default UpdateReviewModalForm;
