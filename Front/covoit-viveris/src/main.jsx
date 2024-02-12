import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login    from "./pages/Login";
import Home     from "./pages/Home";
import Schedule from "./pages/Schedule";
import Research from "./pages/Research";
import Ranking  from "./pages/Ranking";
import Profile  from "./pages/Profile";
import "./style/main.css";
import "./style/header.css";
import { UserProvider } from "./context/UserContext";
import { ProfileNavbar } from "./components/profile/ProfileNavbar";
import EndCarShare from "./pages/EndCarShare";
import BookCarShare from "./pages/BookCarShare";



const router = createBrowserRouter([
  {
    path: "/",
    element: <div><Navigate to="/login" /></div>
  },
  {
    path: "/login",
    element: <div><Login/></div>
  },
  {
    path: "/home",
    element: <div><Home/></div>
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
    path: "/profile/*",
    element: <div><Profile/></div>
  },
  {
    path: "/endCarShare",
    element: <div><EndCarShare/></div>
  },
  {
    path: "research/bookCarShare/*",
    element: <div><BookCarShare/></div>
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router}/>
    </UserProvider>
  //</React.StrictMode>
)
