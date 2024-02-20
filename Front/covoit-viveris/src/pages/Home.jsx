import React from "react";
import { Navbar  } from "../components/header/Navbar";
import { useUser } from "../context/UserContext";
import HomeComponent from "../components/home/HomeComponent.jsx";

const Home = () => {
  const { user } = useUser();

  return (
    <React.Fragment>
        <Navbar />
        <HomeComponent/>
    </React.Fragment>
  );
}

export default Home;
