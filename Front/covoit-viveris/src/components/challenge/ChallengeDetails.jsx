import React from "react";
import { useUser } from "../../context/UserContext.jsx";
import { Navbar } from "../header/Navbar";

const ChallengeDetails = () => {
    const { user } = useUser();

    return (user &&
        <React.Fragment>
            <Navbar />
            <div>
                <p> Challenge Details - {user.id} </p>
            </div>
        </React.Fragment>
    );
};

export default ChallengeDetails;
