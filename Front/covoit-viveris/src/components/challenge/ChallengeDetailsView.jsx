import React from "react";
import { useUser } from "../../context/UserContext.jsx";
import logoXP from '../../images/icon/xp.png'; // Voici le chemin corrigé

export function ChallengeDetailsView({challenge, isParticipating}){
    const { user } = useUser();

    const handleBtnChallengeClick = () => {
        console.log("participation au challenge " + challenge.id + " de l'utilisateur " + user.pseudo);
    };

    const buttonStyle = isParticipating ? { backgroundColor: "grey", color: "white", cursor: "help" } : {};

    return (
        <div className="participate-details-box">
            <div className="challenge-name"><strong>{challenge.name}</strong></div>
            <div className="carshare-info">
                <span>{challenge.description}</span>
            </div>
            <div className="challenge-xp">
                <strong>{challenge.bonus_exp}  </strong>
                <img src={logoXP} alt="XP Logo" style={{ width: '20%', height: '20%', marginBottom: '3px' }} />
            </div>
            <div className="div-btn-challenge">
                <button disabled={isParticipating} className="btn-details" style={buttonStyle} onClick={handleBtnChallengeClick}>
                    {isParticipating ? "Vous participez déjà à ce challenge" : "Participer au Challenge"}
                </button>
            </div>
        </div>
    );
}
