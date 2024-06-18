import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
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

const ScholarshipEditModal = ({
  isOpen,
  onRequestClose,
  scholarship,
  refetch,
}) => {
  const { register, handleSubmit } = useForm();

  const axiosSecure = useAxiosPrivate();
  const axiosPublic = useAxiosPublic();

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    let photoUrl = scholarship.universityImage;

    if (data.universityImage && data.universityImage[0]) {
      const imgFile = new FormData();
      imgFile.append("image", data.universityImage[0]);

      const resImg = await axiosPublic.post(image_hosting_api, imgFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      photoUrl = resImg.data.data.display_url;
    }

    const updatedScholarshipInfo = {
      universityName: data.universityName,
      universityImage: photoUrl,
      scholarshipName: data.scholarshipName,
      scholarshipCategory: data.scholarshipCategory,
      universityLocation: { country: data.country, city: data.city },
      universityRank: data.universityRank,
      applicationDeadline: data.applicationDeadline,
      subjectName: data.subjectName,
      scholarshipDescription: data.scholarshipDescription,
      degree: data.degree,
      stipend: data.stipend,
      postDate: data.postDate,
      serviceCharge: data.serviceCharge,
      applicationFees: data.applicationFees,
      rating: parseFloat(data.rating),
    };

    const res = await axiosSecure.patch(
      `/scholarships/${scholarship._id}`,
      updatedScholarshipInfo
    );
    
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "center",
        title: "Congratulations!",
        icon: "success",
        text: "Your scholarship data has been updated.",
        showConfirmButton: false,
        timer: 3000,
      });
      onRequestClose(true);
      refetch();
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
      >
        <h2 className="text-2xl font-semibold text-center my-6">Update Scholarship Data</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="container mx-auto px-3 lg:px-12"
        >
          <div className="lg:grid grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="text-lg">Scholarship Name</span>
              </label>
              <input
                type="text"
                placeholder="Scholarship Name"
                className="input input-bordered"
                required
                {...register("scholarshipName")}
                defaultValue={scholarship.scholarshipName}
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
                defaultValue={scholarship.universityName}
              />
            </div>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="text-lg">University image</span>
              </div>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
                {...register("universityImage")}
              />
            </label>

            <div className="form-control">
              <label className="label">
                <span className="text-lg">University World rank</span>
              </label>
              <input
                type="text"
                placeholder="University World rank"
                className="input input-bordered"
                required
                {...register("universityRank")}
                defaultValue={scholarship.universityRank}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="text-lg">University Country</span>
              </label>
              <input
                type="text"
                placeholder="University Country"
                className="input input-bordered"
                required
                {...register("country")}
                defaultValue={scholarship.universityLocation.country}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="text-lg">University city</span>
              </label>
              <input
                type="text"
                placeholder="University city"
                className="input input-bordered"
                required
                {...register("city")}
                defaultValue={scholarship.universityLocation.city}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="text-lg">University Rating</span>
              </label>
              <input
                type="number"
                placeholder="university rating"
                className="input input-bordered"
                required
                max={5}
                min={1}
                step="any"
                {...register("rating")}
                defaultValue={scholarship.rating}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="text-lg">Scholarship category</span>
              </label>
              <select
                {...register("scholarshipCategory")}
                defaultValue={scholarship.scholarshipCategory}
              >
                <option value="">Select category</option>
                <option value="Full-Fund">Full fund</option>
                <option value="Partial">Partial</option>
                <option value="SelfFund">Self-fund</option>
              </select>
            </div>

            <div className="form-control col-span-2">
              <label className="label">
                <span className="text-lg">Scholarship Description</span>
              </label>

              <textarea
                placeholder="scholarship description"
                className="textarea textarea-bordered textarea-md w-full"
                required
                {...register("scholarshipDescription")}
                defaultValue={scholarship.scholarshipDescription}
              ></textarea>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="text-lg">Subject category</span>
              </label>
              <select
                {...register("subjectName")}
                defaultValue={scholarship.subjectName}
              >
                <option value="">Select subject</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Engineering">Engineering</option>
                <option value="Doctor">Doctor</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="text-lg">Applying Degree</span>
              </label>
              <select {...register("degree")} defaultValue={scholarship.degree}>
                <option value="">Select your degree</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Masters">Masters</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="text-lg">Tuition fees</span>
              </label>
              <input
                type="text"
                placeholder="tuition fees per semester"
                className="input input-bordered"
                required
                {...register("stipend")}
                defaultValue={scholarship.stipend}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="text-lg">Application fees</span>
              </label>
              <input
                type="text"
                placeholder="Application fees"
                className="input input-bordered"
                required
                {...register("applicationFees")}
                defaultValue={scholarship.applicationFees}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="text-lg">Service charge</span>
              </label>
              <input
                type="text"
                placeholder="service charge"
                className="input input-bordered"
                required
                {...register("serviceCharge")}
                defaultValue={scholarship.serviceCharge}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="text-lg">Application Deadline</span>
              </label>
              <input
                type="date"
                placeholder="application deadline"
                className="input input-bordered"
                required
                {...register("applicationDeadline")}
                defaultValue={scholarship.applicationDeadline}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="text-lg">Scholarship post Date</span>
              </label>
              <input
                type="date"
                className="input input-bordered"
                required
                {...register("postDate")}
                defaultValue={scholarship.postDate}
              />
            </div>
          </div>

          <button className="btn bg-orange-400 text-white my-3 w-full">
            Update Scholarship
          </button>
        <button className="btn w-full" onClick={onRequestClose}>
        Close
      </button>
        </form>
      </Modal>
    </div>
  );
};

ScholarshipEditModal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  scholarship: PropTypes.object,
  refetch: PropTypes.func,
};

export default ScholarshipEditModal;
