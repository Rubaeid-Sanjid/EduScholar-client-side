import { Link } from "react-router-dom";
import errorImg from "../../assets/images/404-error-page-not-found.png";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div>
        <img src={errorImg} alt="" />
      </div>
      <Link to={'/'}><button className="btn bg-orange-500 text-white">Go to Home</button></Link>
    </div>
  );
};

export default ErrorPage;
