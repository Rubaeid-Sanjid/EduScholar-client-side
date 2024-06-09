import Modal from "react-modal";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import Swal from "sweetalert2";

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

const ModalForm = ({ isOpen, onRequestClose, scholarships }) => {
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();

  const {user} = useAuth();
const axiosSecure = useAxiosPrivate();

  const onSubmit = async (data) => {

    const appliedScholarshipInfo = {
      ...data,
      userName: user.displayName,
      userEmail: user.email,
      scholarshipId: scholarships._id,
      date: new Date(),
      }

    const res = await axiosSecure.post('/appliedScholarship', appliedScholarshipInfo);

    if(res.data.insertedId){
      Swal.fire({
        position: "center",
        title: "Congratulations!",
        icon: "success",
        text: " Your application has been successfully submitted.",
        showConfirmButton: false,
        timer: 3000,
      });
      reset();
    }
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <h2 className="text-center text-3xl font-bold">Please, Fill up this form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span className="text-lg">Phone Number</span>
          </label>
          <input
            type="text"
            placeholder="phone number"
            className="input input-bordered"
            required
            {...register("phone")}
            defaultValue={""}
          />
        </div>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="text-lg">Upload Your Photo</span>
          </div>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            {...register("photo")}
          />
        </label>

        <div className="form-control">
          <label className="label">
            <span className="text-lg">Address</span>
          </label>
          <input
            type="text"
            placeholder="village, district, country"
            className="input input-bordered"
            required
            {...register("address")}
            defaultValue={""}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="text-lg">Gender</span>
          </label>
          <select {...register("gender")}>
          <option value="" defaultChecked>Select gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="text-lg">Applying Degree</span>
          </label>
          <select {...register("degree")}>
            <option value="" defaultChecked>Select your degree</option>
            <option value="diploma">Diploma</option>
            <option value="bachelor">Bachelor</option>
            <option value="masters">Masters</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="text-lg">SSC Result</span>
          </label>
          <input
            type="text"
            placeholder="SSC Result"
            className="input input-bordered"
            required
            {...register("ssc")}
            defaultValue={""}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="text-lg">HSC result</span>
          </label>
          <input
            type="text"
            placeholder="HSC result"
            className="input input-bordered"
            required
            {...register("hsc")}
            defaultValue={""}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="text-lg">University name</span>
          </label>
          <input
            type="text"
            placeholder="university name"
            className="input input-bordered"
            required
            {...register("universityName")}
            value={scholarships.universityName}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="text-lg">Scholarship category</span>
          </label>
          <input
            type="text"
            placeholder="scholarship category"
            className="input input-bordered"
            required
            {...register("category")}
            value={scholarships.scholarshipCategory}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="text-lg">Subject Category</span>
          </label>
          <input
            type="text"
            placeholder="subject Category"
            className="input input-bordered"
            required
            {...register("subject")}
            value={scholarships.subjectName}
          />
        </div>

        <button className="btn bg-orange-400 text-white my-3 w-full">Apply</button>
      </form>
      <button className="btn w-full" onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

ModalForm.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  scholarships: PropTypes.object,
};

export default ModalForm;
