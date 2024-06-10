import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const isAdmin = false;
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn bg-orange-400 text-white drawer-button lg:hidden"
          >
            Open Sidebar
          </label>
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {isAdmin ? (
              <>
                <li>
                  <NavLink to={"myProfile"}>Admin Profile</NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to={"myProfile"}>My Profile</NavLink>
                </li>
                <li>
                  <NavLink to={"myApplication"}>My Application</NavLink>
                </li>
                <li>
                  <NavLink to={"myReviews"}>My Reviews</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
