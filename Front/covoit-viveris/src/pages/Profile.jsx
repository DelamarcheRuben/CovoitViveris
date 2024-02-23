import React from "react";
import { Navbar }      from "../components/header/Navbar";
import { ProfileView } from "../components/profile/ProfileView";
import { WindowWidthProvider } from "../context/WindowWidthContext";

const Profile = () => {
  
  return (
    <React.Fragment>
      <WindowWidthProvider>
        <Navbar />
        <ProfileView />
      </WindowWidthProvider>
    </React.Fragment>
  );
};

export default Profile;