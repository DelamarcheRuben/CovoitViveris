import React from "react";
import { useUser } from "../../context/UserContext";

export function ProfileFriends(){
    const { user } = useUser();

    return (
        <React.Fragment>
            <p> Friends </p>
        </React.Fragment>
    );
}
