import Modal from 'react-modal';
import PropTypes from 'prop-types';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '1000',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: '999',
  },
};

const ModalForm = ({ isOpen, onRequestClose, scholarships }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <h2>Form Title</h2>
      <form>
        <div>
          <label htmlFor="name">Name: {scholarships.universityName}</label>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

ModalForm.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  scholarships: PropTypes.object,
};

export default ModalForm;
