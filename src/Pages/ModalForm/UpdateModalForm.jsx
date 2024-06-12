import Modal from "react-modal";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

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

const UpdateModalForm = ({ isOpen, onRequestClose, selectedScholarship }) => {
  const { register, handleSubmit } = useForm();

  const axiosSecure = useAxiosPrivate();
  const axiosPublic = useAxiosPublic();

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (data) => {

    let photoUrl = selectedScholarship.photo;

    if (data.photo && data.photo[0]) {
      const imgFile = new FormData();
      imgFile.append("image", data.photo[0]);

      const resImg = await axiosPublic.post(image_hosting_api, imgFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      photoUrl = resImg.data.data.display_url;
    }

    const updatedAppliedScholarshipInfo = {
      phone: data.phone,
      photo: photoUrl,
      address: data.address,
      gender: data.gender,
      degree: data.degree,
      ssc: data.ssc,
      hsc: data.hsc,
      date: new Date(),
    };

    const res = await axiosSecure.patch(
      `/appliedScholarship/${selectedScholarship._id}`,
      updatedAppliedScholarshipInfo
    );

    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "center",
        title: "Congratulations!",
        icon: "success",
        text: " Your application has been updated.",
        showConfirmButton: false,
        timer: 3000,
      });
      onRequestClose(true);
    }
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <h2 className="text-center text-3xl font-bold">Update form</h2>
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
            defaultValue={selectedScholarship?.phone}
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
            defaultChecked
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
            defaultValue={selectedScholarship?.address}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="text-lg">Gender</span>
          </label>
          <select
            {...register("gender")}
            defaultValue={selectedScholarship?.gender}
          >
            <option value="">Select gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="text-lg">Applying Degree</span>
          </label>
          <select
            {...register("degree")}
            defaultValue={selectedScholarship?.degree}
          >
            <option value="">Select your degree</option>
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
            defaultValue={selectedScholarship?.ssc}
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
            defaultValue={selectedScholarship?.hsc}
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
            value={selectedScholarship?.universityName}
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
            value={selectedScholarship?.category}
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
            value={selectedScholarship?.subject}
          />
        </div>

        <button className="btn bg-orange-400 text-white my-3 w-full">
          Apply Update
        </button>
      </form>
      <button className="btn w-full" onClick={onRequestClose}>
        Close
      </button>
    </Modal>
  );
};

UpdateModalForm.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  selectedScholarship: PropTypes.object,
};

export default UpdateModalForm;
