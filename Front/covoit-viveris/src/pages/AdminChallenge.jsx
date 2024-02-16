import React from "react";
import { Navbar  } from "../components/header/Navbar";
import { useUser } from "../context/UserContext";
import AdministrationChallenge from "../components/administration/AdministrationChallenge";

const Home = () => {
  // const { user } = useUser();

  return (
    <React.Fragment>
      <Navbar />
      <AdministrationChallenge/>
    </React.Fragment>
  );
}

export default Home;
