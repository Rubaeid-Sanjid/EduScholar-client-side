import { useForm } from "react-hook-form";
import signUpImage from "../../assets/images/signUp.jpg";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {user} = useAuth();
  console.log(user);
  
  const onSubmit = (data) => {
    console.log(data)

    
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
                      The password don't have a special character or a capital letter
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
