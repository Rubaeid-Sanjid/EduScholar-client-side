import { useForm } from "react-hook-form";
import loginImage from "../../assets/images/signIn.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import googleLogo from "../../assets/images/google-logo-image.png"
const Login = () => {
  const {
    register,
    handleSubmit,
    // setError,
    // formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const pathFrom = location.state?.from?.pathname || '/';

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
        navigate(pathFrom, {replace: true})
      })
      .catch((err) => {
        console.log(err.code.split('/')[1]);
        // setError("email", { message: err.code.split('/')[1] });
        // setError("password", { message: err.code.split('/')[1] });
      });
  };

  const handleGoogleLogin = ()=>{
    googleLogin()
    .then(()=>{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Log-In successful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(pathFrom, {replace: true})
    })
    .catch(error =>{
      console.log(error);
    })
  }
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
                  {/* {errors.email && (
                    <p role="alert" className="text-red-600 mt-1">
                      {errors.email.message}
                    </p>
                  )} */}
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
                    {...register("password")}
                  />
                  {/* {errors.password && (
                    <p role="alert" className="text-red-600 mt-1">
                      {errors.password.message}
                    </p>
                  )} */}
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
                <img className="w-6 h-6" src={googleLogo} alt="google logo" />
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