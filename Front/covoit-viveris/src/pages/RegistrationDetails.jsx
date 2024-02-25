import React from "react";
import { useUser } from "../context/UserContext.jsx";
import RegistrationDetailsView from "../components/account/RegistrationDetailsView.jsx";

const RegistrationDetails = () => {
  const { user } = useUser();

  return (
    <React.Fragment>
      <RegistrationDetailsView/>
    </React.Fragment>
  );
}

export default RegistrationDetails;
