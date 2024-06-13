import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
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
            {user?.role === "admin" ? (
              <>
                <li>
                  <NavLink to={"adminProfile"}>Admin Profile</NavLink>
                </li>
              </>
            ) : user?.role === "moderator" ? (
              <>
                <li>
                  <NavLink to={"myProfile"}>My Profile</NavLink>
                </li>
                <li>
                  <NavLink to={"manageScholarships"}>
                    Manage Scholarships
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"allReviews"}>All reviews</NavLink>
                </li>
                <li>
                  <NavLink to={"allAppliedScholarship"}>
                    All applied Scholarship{" "}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"addScholarship"}>Add Scholarship</NavLink>
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
            <div className="divider"></div>
            <li>
              <NavLink to={"/"} className={"my-2 lg:my-0 mx-2"}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={"/AllScholarship"} className={"my-2 lg:my-0 mx-2"}>
                All Scholarship
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
