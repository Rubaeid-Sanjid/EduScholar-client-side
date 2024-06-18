import { useForm } from "react-hook-form";
import loginImage from "../../assets/images/signIn.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import googleLogo from "../../assets/images/google-logo-image.png";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
const Login = () => {
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const pathFrom = location.state?.from?.pathname || "/";

  const { loginUser, googleLogin } = useAuth();

  const onSubmit = (data) => {
    loginUser(data.email, data.password)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Log-In successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(pathFrom, { replace: true });
      })
      .catch((err) => {
        console.log(err.code.split("/")[1]);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        console.log(result);
        const userInfo = {
          user_email: result.user.email,
          user_name: result.user.displayName,
          user_password: result.user.uid,
          user_photo: result.user.photoURL,
          role: "user",
        };

        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your account has been created",
              showConfirmButton: false,
              timer: 2000,
            });
            navigate(pathFrom, { replace: true });
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div>
              <img src={loginImage} alt="" />
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="text-center mt-5">
                <h1 className="text-4xl lg:text-5xl font-bold">Login now!</h1>
              </div>
              <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
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
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    className="input input-bordered"
                    required
                    {...register("password")}
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-[45%] left-[90%] cursor-pointer"
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </div>

                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button
                    onClick={handleGoogleLogin}
                    className="w-full px-4 py-2 border flex justify-center gap-2 rounded-lg mb-3"
                  >
                    <img
                      className="w-6 h-6"
                      src={googleLogo}
                      alt="google logo"
                    />
                    <span>Login with Google</span>
                  </button>

                  <button className="btn bg-orange-400 text-white">
                    Login
                  </button>
                </div>
                <p className="text-center">
                  New here ? Create an account{" "}
                  <Link to={"/signUp"} className="text-orange-400 underline">
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
