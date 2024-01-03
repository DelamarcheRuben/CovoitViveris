import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./webpage/HomePage.jsx";
import Schedule from "./webpage/Schedule";
import Research from "./webpage/Research";
import Ranking  from "./webpage/Ranking";
import Profile  from "./webpage/Profile";
import "./style/main.css"
import "./style/header.css"


const router = createBrowserRouter([
  {
    path: "/",
    element: <div><HomePage/></div>
  },
  {
    path: "/schedule",
    element: <div><Schedule/></div>
  },
  {
    path: "/research",
    element: <div><Research/></div>
  },
  {
    path: "/ranking",
    element: <div><Ranking/></div>
  },
  {
    path: "/profile",
    element: <div><Profile/></div>
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
