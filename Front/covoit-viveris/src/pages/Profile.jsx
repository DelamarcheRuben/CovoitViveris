import React from "react";
import { Navbar }      from "../components/header/Navbar";
import { ProfileView } from "../components/profile/ProfileView";

const Profile = () => {

  return (
    <React.Fragment>
      <Navbar />
      <ProfileView />
    </React.Fragment>
  );
};

export default Profile