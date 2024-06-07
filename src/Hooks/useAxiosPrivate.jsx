import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});
const useAxiosPrivate = () => {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("token");

      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      console.log("status error in the interceptor", status);

      if (status === 401 || status === 403) {
        await logoutUser();
        navigate("/login");
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosPrivate;
