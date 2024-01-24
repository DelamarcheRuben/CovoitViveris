import React from "react";
import { useUser } from "../../context/UserContext";

export function ProfileCarShares(){
    const { user } = useUser();

    return (
        <React.Fragment>
            <p> Car Shares </p>
        </React.Fragment>
    );
}
