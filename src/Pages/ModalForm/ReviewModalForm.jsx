import PropTypes from "prop-types";

import { useForm } from "react-hook-form";
import Modal from "react-modal";
import useAuth from "../../Hooks/useAuth";

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

const ReviewModalForm = ({ isOpen, onRequestClose, scholarship }) => {
  const { register, handleSubmit, reset } = useForm();

  const { user } = useAuth();

  const onSubmit = (data) => {
    const reviewInfo = {
      scholarshipId: scholarship?._id,
      reviewerImage: user?.photoURL,
      reviewerName: user?.displayName,
      reviewerEmail: user?.email,
      reviewDate: data.date,
      ratingPoint: data.rating,
      reviewerComments: data.comment,
      scholarshipName: scholarship?.scholarshipCategory,
      universityName: scholarship?.universityName,
    };
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <h2 className="text-center text-3xl font-bold">
        Please, Provide your review here
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span className="text-lg">Rating point</span>
          </label>
          <input
            type="text"
            placeholder="Rating point"
            className="input input-bordered"
            required
            {...register("rating")}
            defaultValue={""}
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
            defaultValue={""}
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
            defaultValue={""}
          />
        </div>

        <button className="btn bg-orange-400 text-white my-3 w-full">
          Post Review
        </button>
      </form>
      <button className="btn w-full" onClick={onRequestClose}>
        Close
      </button>
    </Modal>
  );
};
ReviewModalForm.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  scholarship: PropTypes.object,
};
export default ReviewModalForm;
