import React, { useState, useEffect } from 'react';
import { ChallengeHomeView } from "../../challenge/ChallengeHomeView.jsx";
import { useUser } from "../../../context/UserContext.jsx";

function HomeChallenges() {
    const [participates, setParticipates] = useState([]);
    const { user } = useUser();

    const handleBtnChallengeClick = () => {
        // TODO: Faire la page détails et insérer ici un navigate(/details/idCarshare)
        console.log(user);
        console.log(participates);
    };

    useEffect(() => {
        // Assurez-vous que user.uid existe avant de lancer l'appel API
        if(user && user.uid) {
            fetch(`http://localhost:8080/participates?id_user=${user.uid}`)
                .then(response => response.json())
                .then(data => {
                    setParticipates(data);
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération des données de la table 'Participate' : ", error);
                });
        }
    }, [user.uid]); // Utilisez user.uid comme dépendance pour refléter l'utilisateur actuel

    return (
        <div className="home-box">
            <h4>Challenges en cours</h4>
            {participates.length === 0
                ? <p className="center"><strong style={{ fontSize:"150%" }}>Pas de challenges en cours</strong></p>
                : <ChallengeHomeView key={participates[0].uid} participate={participates[0]} />
            }
            <div className="div-btn-challenge">
                <button className="btn-details" onClick={handleBtnChallengeClick}>Voir tous les challenges</button>
            </div>
        </div>
    );
}

export default HomeChallenges;
