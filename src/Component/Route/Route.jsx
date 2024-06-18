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
import AllScholarships from "../../Pages/AllScholarships/AllScholarships";

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
        path: "/allScholarships",
        element: <AllScholarships></AllScholarships>,
      },
      {
        path: "/scholarshipDetails/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetails></ScholarshipDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://edu-scholar-server-side.vercel.app/scholarshipDetails/${params.id}`),
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
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "myApplication",
        element: (
          <PrivateRoute>
            <MyApplication></MyApplication>
          </PrivateRoute>
        ),
      },
      {
        path: "myReviews",
        element: (
          <PrivateRoute>
            <MyReviews></MyReviews>
          </PrivateRoute>
        ),
      },
      // Moderator & Admin Route
      {
        path: "manageScholarships",
        element: (
          <PrivateRoute>
            <ManageScholarships></ManageScholarships>
          </PrivateRoute>
        ),
      },
      {
        path: "allReviews",
        element: (
          <PrivateRoute>
            <AllReviews></AllReviews>
          </PrivateRoute>
        ),
      },
      {
        path: "allAppliedScholarship",
        element: (
          <PrivateRoute>
            <AllAppliedScholarship></AllAppliedScholarship>
          </PrivateRoute>
        ),
      },
      {
        path: "addScholarship",
        element: (
          <PrivateRoute>
            <AddScholarship></AddScholarship>
          </PrivateRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <PrivateRoute>
            <ManageUsers></ManageUsers>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
