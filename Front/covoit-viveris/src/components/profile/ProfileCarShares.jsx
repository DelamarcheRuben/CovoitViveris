import React from "react";
import { useUser } from "../../context/UserContext";

export function ProfileCarShares(){
    const { user } = useUser();
    // /history-carshares?id_user={id}


    return (
        <React.Fragment>
            <p> Car Shares </p>
        </React.Fragment>
    );
}
