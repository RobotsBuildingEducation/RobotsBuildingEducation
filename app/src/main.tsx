import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import DecisionMap from "./experimental/DecisionMap";

// This file handles things before the app launches with route "/".
// It defines frontend routes and defines a legacy passcode that used to be used to enter the app.

//to visit the experimental component, visit https://robotsbuildingeducation.com/experimental/map

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/experimental/map",
    element: <DecisionMap />,
  },
]);

// localStorage.setItem("patreonPasscode", import.meta.env.VITE_PATREON_PASSCODE);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
