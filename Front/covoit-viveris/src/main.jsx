import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";
import { WindowWidthProvider } from "./context/WindowWidthContext.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Schedule from "./pages/Schedule.jsx";
import Research from "./pages/Research.jsx";
import Ranking from "./pages/Ranking.jsx";
import Profile from "./pages/Profile.jsx";
import EndCarShare from "./pages/EndCarShare.jsx";
import BookCarshare from "./pages/BookCarShare.jsx";
import "./style/main.css";
import "./style/header.css";
import {ThemeProvider, createTheme, StyledEngineProvider} from "@mui/material/styles";

// Création d'un thème personnalisé avec les couleurs de votre site
const theme = createTheme({
  palette: {
    primary: {
      main: "#FF5046", // Couleur principale
    },
    secondary: {
      main: "#FC948C", // Couleur secondaire
    },
    // Ajoutez d'autres couleurs comme nécessaire
  },
  components: {
    // Style pour les Tabs
    MuiTabs: {
      styleOverrides: {
        flexContainer: {
          justifyContent: "center", // Centre les onglets
        },
      },
    },
    // Style pour les Tab
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': { // Style pour l'onglet sélectionné
            color: "#FC585C", // Couleur secondaire plus foncée
          },
        },
      },
    },
  },
});


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
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <StyledEngineProvider injectFirst>
      <UserProvider>
        <WindowWidthProvider>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router}/>
          </ThemeProvider>
        </WindowWidthProvider>
      </UserProvider>
    </StyledEngineProvider>
);