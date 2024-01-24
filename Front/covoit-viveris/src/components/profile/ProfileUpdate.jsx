import React from "react";
import { useUser } from "../../context/UserContext";

export function ProfileUpdate(){
    const { user } = useUser();

    return (
        <React.Fragment>
            <p> Update Profil </p>
        </React.Fragment>
    );
}
