import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../Component/Navbar/Navbar";
import Footer from "../../Component/Footer/Footer";

const Main = () => {
    const location = useLocation();

    const removeNavbarFooter = location.pathname.includes('/login') || location.pathname.includes('/signUp');

    return (
        <div>
            {!removeNavbarFooter && <Navbar></Navbar>}
            <Outlet></Outlet>
            {!removeNavbarFooter && <Footer></Footer>}
        </div>
    );
};

export default Main;