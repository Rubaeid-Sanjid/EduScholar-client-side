import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navlink = (
    <>
      <NavLink className={"my-2 lg:my-0 mx-2 text-white"}>Home</NavLink>
      <NavLink className={"my-2 lg:my-0 mx-2 text-white"}>
        All Scholarship
      </NavLink>
      <NavLink className={"my-2 lg:my-0 mx-2 "}>
        User Dashboard
      </NavLink>
      <NavLink className={"my-2 lg:my-0 mx-2 "}>
        Admin Dashboard
      </NavLink>
    </>
  );
  return (
    <div>
      <div
        className="navbar md:fixed py-5 lg:px-12 bg-black z-10"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      >
        <div className="navbar-start ">
          <div className="dropdown z-10">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52"
            >
              {navlink}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">EduScholar</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navlink}</ul>
          </div>
          <div className="navbar-end">
          <div className="avatar">
            <div className="w-16 lg:w-20 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <a className="btn btn-sm lg:btn-md ml-2 bg-orange-400 text-white border-none">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
