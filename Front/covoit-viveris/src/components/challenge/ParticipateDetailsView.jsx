import React from "react";
import { useWindowWidth } from "../../context/WindowWidthContext.jsx";
import {useUser} from "../../context/UserContext.jsx";
import logoXP from "../../images/icon/xp.png";


export function ParticipateDetailsView({participate}){
    const windowWidth = useWindowWidth();
    const user = useUser();

    const challengeName = participate.challenge.name;
    const challengeDescription = participate.challenge.description;
    const challengeProgress = participate.progress;
    const challengeXp = participate.challenge.bonus_exp;

    return (
        <div className="participate-details-box">
            <div className="challenge-name"><strong>{challengeName}</strong></div>
            <div className="participate-description">
                <span>{challengeDescription}</span>
            </div>
            <div className="challenge-xp">
                <strong>{challengeXp}  </strong>
                <img src={logoXP} alt="XP Logo" />
            </div>
            <div className="participate-completion">
                <span>{challengeProgress}%</span>
            </div>
        </div>
    );
}

