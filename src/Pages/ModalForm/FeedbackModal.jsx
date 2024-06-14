import PropTypes from "prop-types";
import Modal from "react-modal";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { ImCancelCircle } from "react-icons/im";

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

const FeedbackModal = ({
  isOpen,
  onRequestClose,
  selectedFeedbackScholarship,
}) => {
  const { register, handleSubmit, reset } = useForm();

  const axiosSecure = useAxiosPrivate();

  const onSubmit = async (data) => {
    const res = await axiosSecure.patch(
      `/appliedScholarship/feedback/${selectedFeedbackScholarship._id}`,
      { feedback: data.feedback }
    );

    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "center",
        title: "Congratulations!",
        icon: "success",
        text: " Your feedback has been sent.",
        showConfirmButton: false,
        timer: 3000,
      });
      reset();
      onRequestClose(true);
    }
  };
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control">
            <div className="label">
              <span className="label-text text-2xl font-semibold">
                Your Feedback
              </span>
              <button className="text-2xl" onClick={onRequestClose}>
                <ImCancelCircle />
              </button>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="feedback"
              {...register("feedback")}
            ></textarea>
          </label>
          <div className="w-full flex justify-end">
            <button className="btn bg-orange-400 text-white my-3 w-1/2">
              Send feedback
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

FeedbackModal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  selectedFeedbackScholarship: PropTypes.object,
};

export default FeedbackModal;
