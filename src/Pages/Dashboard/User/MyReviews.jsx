import Modal from "react-modal";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

    useEffect(()=>{
        if(location.pathname === '/dashboard/myReviews'){
            setIsModalOpen(true);
        }
    },[])

    const onRequestClose=()=>{
        setIsModalOpen(false);
        navigate('/dashboard')
    }
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
        
        <button className="btn w-full" onClick={onRequestClose}>
        Close
      </button>
      </Modal>
    </div>
  );
};

MyReviews.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  // scholarship: PropTypes.object,
};
export default MyReviews;
