import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Component/Route/Route";
import AuthProvider from "./Component/AuthProvider/AuthProvider";
import ScholarshipProvider from "./Component/ScholarshipContext/ScholarshipProvider";
// In your main component or App.js
import Modal from "react-modal";

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ScholarshipProvider>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </ScholarshipProvider>
  </React.StrictMode>
);
