import React from "react";
import { Navbar  } from "../components/header/Navbar";
import { useUser } from "../context/UserContext";
import AdministrationChallenge from "../components/administration/AdministrationChallenge";
import AdministrationCarshare from "../components/administration/AdministrationCarshare.jsx";

const AdminCarshare = () => {
  // const { user } = useUser();

  return (
    <React.Fragment>
      <Navbar />
      <AdministrationCarshare/>
    </React.Fragment>
  );
}

export default AdminCarshare;
