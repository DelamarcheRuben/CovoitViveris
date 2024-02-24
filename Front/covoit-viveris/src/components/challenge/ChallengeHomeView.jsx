import React, {useEffect} from "react";
import { useWindowWidth } from "../../context/WindowWidthContext.jsx";
import {useUser} from "../../context/UserContext.jsx";


export function ChallengeHomeView({challenge}){
    const windowWidth = useWindowWidth();
    const user = useUser();

    return (
        <div className="carshare-card">
            <div className="carshare-date"><strong>{challenge.name}</strong></div>
            <div className="carshare-info">
                <span>{challenge.description}</span>
            </div>
            <div className="carshare-completion">
                <span>{user.user.pseudo} / {challenge.goal}</span>
            </div>
        </div>
    );
}