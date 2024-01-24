import React from "react";
import { Navbar }      from "../components/header/Navbar";
import { ProfileView } from "../components/profile/ProfileView";

const user = { id: 1, pseudo: "Esteban",   job: "Dev Full-Stack",   city: "Boulogne-Billancourt", nb_carshares: 549, kilometers: 8754, experience: 109, picture_background: "mountain", nb_badges: 39, start_date: "16/07/2021" }

const Profile = () => {
  return (
      <React.Fragment>
        <Navbar />
        <ProfileView />
      </React.Fragment>
      );
};

export default Profile