import React, {useEffect} from "react";
import { useWindowWidth } from "../../context/WindowWidthContext.jsx";
import {useUser} from "../../context/UserContext.jsx";


export function ParticipateHomeView({participate}){
    const windowWidth = useWindowWidth();
    const user = useUser();

    const challengeName = participate.challenge.name;
    const challengeDescription = participate.challenge.description;
    const challengeProgress = participate.progress;

    return (
        <div className="carshare-card">
            <div className="challenge-name"><strong>{challengeName}</strong></div>
            <div className="carshare-info">
                <span>{challengeDescription}</span>
            </div>
            <div className="carshare-completion">
                <span>{challengeProgress}%</span>
            </div>
        </div>
    );
}