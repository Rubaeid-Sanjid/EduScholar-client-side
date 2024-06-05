import { useForm } from "react-hook-form";
import signUpImage from "../../assets/images/signUp.jpg";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { axiosPublic } from "../../Hooks/useAxiosPublic";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const { createUser, updateUser } = useAuth();

  const onSubmit = async(data) => {

    const imgFile = {image: data.photo[0]}

    const res = await axiosPublic.post(image_hosting_api, imgFile, {
      headers: {'Content-Type': 'multipart/form-data'}
    })

    createUser(data.email, data.password)
    .then(()=> {
      updateUser(data.name, res.data.data.display_url)
      .then(() => {
        Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your account has been created",
        showConfirmButton: false,
        timer: 1500
      });
      }).catch((error) => {
        console.log(error);
      });
      
    })
    .catch(errors=>console.log(errors))
  };

  return (
    <div className="hero min-h-screen my-12">
      <div className="hero-content flex-col">
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div>
            <img src={signUpImage} alt="" />
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="text-center mt-5">
              <h1 className="text-4xl lg:text-5xl font-bold">Sign Up Now!</h1>
            </div>
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                  required
                  {...register("name")}
                />
              </div>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Upload Your Photo</span>
                </div>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs"
                  {...register("photo")}
                />
              </label>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  {...register("email")}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  {...register("password", {
                    minLength: 6,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                  })}
                />
                {errors.password?.type === "minLength" && (
                  <p role="alert" className="text-red-600 mt-1">
                    The password is less than 6 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p role="alert" className="text-red-600 mt-1">
                    The password don't have a special character or a capital
                    letter
                  </p>
                )}

                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-orange-400 text-white">
                  Sign Up
                </button>
              </div>
              <p className="text-center">
                Already have an account ?{" "}
                <Link to={"/login"} className="text-orange-400 underline">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
