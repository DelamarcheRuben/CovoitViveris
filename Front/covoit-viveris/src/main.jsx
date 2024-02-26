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
import AdminChallenge from "./pages/AdminChallenge.jsx";
import "./style/main.css";
import "./style/header.css";
import {ThemeProvider, createTheme, StyledEngineProvider} from "@mui/material/styles";
import CarshareResearchResultsDisplay from "./components/research/CarshareResearchResultDisplay";
import {SearchResultsProvider} from "./context/SearchResultsContext";
import AdminCarshare from "./pages/AdminCarshare.jsx";
import {SnackbarProvider} from "./context/SnackbarContext";
import RegistrationDetails from "./pages/RegistrationDetails.jsx";
import ChallengeDetails from "./components/challenge/ChallengeDetails.jsx";
import DetailsCarshare from "./pages/DetailsCarshare.jsx";

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
    path: "/registrationDetails",
    element: <div><RegistrationDetails/></div>
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
    path: "/end-carshare",
    element: <div><EndCarShare/></div>
  },
  {
    path: "/details-carshare",
    element: <div><DetailsCarshare/></div>
  },
  {
    path: "research/book-carshare",
    element: <div><BookCarshare/></div>
  },
  {
    path: "/research/results",
    element: <div><CarshareResearchResultsDisplay/></div>
  },
  {
    path: "admin/challenge/",
    element: <div><AdminChallenge/></div>
  },
  {
    path: "admin/carshare/",
    element: <div><AdminCarshare/></div>
  },
  {
    path: "challenge-details/",
    element: <div><ChallengeDetails/></div>
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <StyledEngineProvider injectFirst>
      <UserProvider>
        <WindowWidthProvider>
          <ThemeProvider theme={theme}>
            <SnackbarProvider>
              <SearchResultsProvider>
                <RouterProvider router={router}/>
              </SearchResultsProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </WindowWidthProvider>
      </UserProvider>
    </StyledEngineProvider>
);