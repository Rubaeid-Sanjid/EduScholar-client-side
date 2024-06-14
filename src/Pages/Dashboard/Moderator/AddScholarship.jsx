import Swal from "sweetalert2";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";

const AddScholarship = () => {
  const { register, handleSubmit, reset } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosPrivate();
  const axiosPublic = useAxiosPublic();

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    const imgFile = { image: data.universityImage[0] };

    const resImg = await axiosPublic.post(image_hosting_api, imgFile, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const scholarshipInfo = {
      universityName: data.universityName,
      universityImage: resImg.data.data.display_url,
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
      postedUserEmail: data.postedUserEmail,
    };

    const res = await axiosSecure.post("/scholarships", scholarshipInfo);

    if (res.data.insertedId) {
      Swal.fire({
        position: "center",
        title: "Congratulations!",
        icon: "success",
        text: "Your scholarship has been added successfully.",
        showConfirmButton: false,
        timer: 3000,
      });
      reset();
    }
  };

  return (
    <div>
      <SectionTitle title={"Add Scholarship"}></SectionTitle>

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
              defaultValue={""}
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
              defaultValue={""}
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
              defaultValue={""}
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
              defaultValue={""}
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
              defaultValue={""}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="text-lg">Scholarship category</span>
            </label>
            <select {...register("scholarshipCategory")}>
              <option value="" defaultChecked>
                Select category
              </option>
              <option value="Full-Fund">Full fund</option>
              <option value="Partial">Partial</option>
              <option value="Self-Fund">Self-fund</option>
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
              defaultValue={""}
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="text-lg">Subject category</span>
            </label>
            <select {...register("subjectName")}>
              <option value="" defaultChecked>
                Select subject
              </option>
              <option value="Agriculture">Agriculture</option>
              <option value="Engineering">Engineering</option>
              <option value="Doctor">Doctor</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="text-lg">Applying Degree</span>
            </label>
            <select {...register("degree")}>
              <option value="" defaultChecked>
                Select your degree
              </option>
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
              defaultValue={""}
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
              defaultValue={""}
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
              defaultValue={""}
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
              defaultValue={""}
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
              defaultValue={""}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="text-lg">Posted User Email</span>
            </label>
            <input
              type="text"
              placeholder="posted user email"
              className="input input-bordered"
              required
              {...register("postedUserEmail")}
              value={user.email}
            />
          </div>
        </div>

        <button className="btn bg-orange-400 text-white my-3 w-full">
          Add Scholarship
        </button>
      </form>
    </div>
  );
};

export default AddScholarship;
