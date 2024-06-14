import PropTypes from "prop-types";
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

const AppliedScholarshipDetailsModal = ({
  isOpen,
  onRequestClose,
  selectedAppliedScholarship,
}) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
      >
        <div className="card lg:card-side bg-base-100">
          <div className="card-body">
            <div className="space-y-2">
              <h2 className="mb-4 text-2xl font-semibold text-center">
                {selectedAppliedScholarship.universityName}
              </h2>
              <h2 className="text-xl flex justify-between">
                <span className="font-medium">Scholarship Name: </span>
                {selectedAppliedScholarship.scholarshipName}
              </h2>
              <h2 className="text-xl flex justify-between">
                <span className="font-medium">Scholarship Category: </span>
                {selectedAppliedScholarship.category}
              </h2>
              <h2 className="text-xl flex justify-between">
                <span className="font-medium">Degree: </span>
                {selectedAppliedScholarship.degree}
              </h2>
              <h2 className="text-xl flex justify-between">
                <span className="font-medium">Subject: </span>
                {selectedAppliedScholarship.subject}
              </h2>
              <h2 className="text-xl flex justify-between">
                <span className="font-medium">Application Fees: </span>
                {selectedAppliedScholarship.applicationFees}
              </h2>
            </div>

            <div className="mt-6 space-y-2">
              <h2 className="text-2xl font-semibold text-center">
                Applied User
              </h2>
              <h2 className="text-xl flex justify-between">
                <span className="font-medium">User name: </span>
                {selectedAppliedScholarship.userName}
              </h2>
              <h2 className="text-xl flex justify-between">
                <span className="font-medium">User email: </span>
                {selectedAppliedScholarship.userEmail}
              </h2>
              <h2 className="text-xl flex justify-between">
                <span className="font-medium">User address: </span>
                {selectedAppliedScholarship.address}
              </h2>
            </div>
          </div>
        </div>
        <button className="btn w-full" onClick={onRequestClose}>
          Close
        </button>
      </Modal>
    </div>
  );
};

AppliedScholarshipDetailsModal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  selectedAppliedScholarship: PropTypes.object,
};

export default AppliedScholarshipDetailsModal;
