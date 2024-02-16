import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { UserProvider }        from "./context/UserContext.jsx";
import { WindowWidthProvider } from "./context/WindowWidthContext.jsx";
import Login        from "./pages/Login.jsx";
import Home         from "./pages/Home.jsx";
import Schedule     from "./pages/Schedule.jsx";
import Research     from "./pages/Research.jsx";
import Ranking      from "./pages/Ranking.jsx";
import Profile      from "./pages/Profile.jsx";
import EndCarShare  from "./pages/EndCarShare.jsx";
import BookCarshare from "./pages/BookCarShare.jsx";
import AdminChallenge from "./pages/AdminChallenge.jsx";
import "./style/main.css";
import "./style/header.css";


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
    element: <div><BookCarshare/></div>
  },
  {
    path: "admin/challenge/",
    element: <div><AdminChallenge/></div>
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <UserProvider>
      <WindowWidthProvider>
        <RouterProvider router={router}/>
      </WindowWidthProvider>
    </UserProvider>
  //</React.StrictMode>
)
