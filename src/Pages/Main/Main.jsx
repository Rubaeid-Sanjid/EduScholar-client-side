import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../Component/Navbar/Navbar";

const Main = () => {
    const location = useLocation();

    const removeNavbarFooter = location.pathname.includes('/login') || location.pathname.includes('/signUp');

    return (
        <div>
            {!removeNavbarFooter && <Navbar></Navbar>}
            <Outlet></Outlet>
        </div>
    );
};

export default Main;