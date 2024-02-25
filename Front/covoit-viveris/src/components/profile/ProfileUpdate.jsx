import React from "react";
import { useUser } from "../../context/UserContext";
import { ProfileUpdateView } from "./ProfileUpdateView.jsx";

export function ProfileUpdate(){
    const { user } = useUser();

    return (user &&
        <React.Fragment>
            <ProfileUpdateView />
        </React.Fragment>
    );
}
