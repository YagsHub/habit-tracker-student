import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";
import GuestDashboard from "./GuestDashboard/GuestDashboard.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserDashboard from "./HomePage/UserDashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/guestdashboard",
    element: <GuestDashboard />,
  },

  {
    path: "/user-dashboard",
    element: <UserDashboard />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
