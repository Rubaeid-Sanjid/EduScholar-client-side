import { useContext } from "react";
import { AuthContext } from "../Component/AuthProvider/AuthProvider";

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;