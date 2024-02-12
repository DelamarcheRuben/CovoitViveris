import React from "react";
import { Navbar  } from "../components/header/Navbar";
import { useUser } from "../context/UserContext";

const Home = () => {
  const { user } = useUser();

  return (
    <React.Fragment>
      <Navbar />
      <p>{user.pseudo}/{user.uid}</p>
    </React.Fragment>
  );
}

export default Home;
