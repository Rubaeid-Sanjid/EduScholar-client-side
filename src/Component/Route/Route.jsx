import { createBrowserRouter } from "react-router-dom";
import Main from "../../Pages/Main/Main";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ScholarshipDetails from "../../Pages/ScholarshipDetails/ScholarshipDetails";
import Payment from "../../Pages/Payment/Payment";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import MyProfile from "../../Pages/Dashboard/User/MyProfile";
import MyApplication from "../../Pages/Dashboard/User/MyApplication";
import MyReviews from "../../Pages/Dashboard/User/MyReviews";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import ManageScholarships from "../../Pages/Dashboard/Moderator/ManageScholarships";
import AllReviews from "../../Pages/Dashboard/Moderator/AllReviews";
import AllAppliedScholarship from "../../Pages/Dashboard/Moderator/AllAppliedScholarship";
import AddScholarship from "../../Pages/Dashboard/Moderator/AddScholarship";
import ManageUsers from "../../Pages/Dashboard/Admin/ManageUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/scholarshipDetails/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetails></ScholarshipDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/scholarshipDetails/${params.id}`),
      },
      {
        path: "/payment",
        element: <Payment></Payment>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "myProfile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "myApplication",
        element: <MyApplication></MyApplication>,
      },
      {
        path: "myReviews",
        element: <MyReviews></MyReviews>,
      },
      // Moderator & Admin Route
      {
        path: "manageScholarships",
        element: <ManageScholarships></ManageScholarships>,
      },
      {
        path: "allReviews",
        element: <AllReviews></AllReviews>,
      },
      {
        path: "allAppliedScholarship",
        element: <AllAppliedScholarship></AllAppliedScholarship>,
      },
      {
        path: "addScholarship",
        element: <AddScholarship></AddScholarship>,
      },
      {
        path: "manageUsers",
        element: <ManageUsers></ManageUsers>,
      },
    ],
  },
]);
