import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Component/Route/Route";
import AuthProvider from "./Component/AuthProvider/AuthProvider";
import ScholarshipProvider from "./Component/ScholarshipContext/ScholarshipProvider";
// In your main component or App.js
import Modal from "react-modal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ScholarshipProvider>
        <AuthProvider>
          <RouterProvider router={router}></RouterProvider>
        </AuthProvider>
      </ScholarshipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
