import React, {useEffect, useState} from "react";
import { useUser } from "../../context/UserContext.jsx";
import { Navbar } from "../header/Navbar";
import {ChallengeDetailsView} from "./ChallengeDetailsView.jsx";
import {ParticipateDetailsView} from "./ParticipateDetailsView.jsx";

const ChallengeDetails = () => {
    const [participates, setParticipates] = useState([]);
    const [challenges, setChallenges] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        // Assurez-vous que user.uid existe avant de lancer l'appel API
        fetch(`http://localhost:8080/participates?id_user=${user.uid}`)
            .then(response => response.json())
            .then(data => {
                setParticipates(data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des données de la table 'Participate' : ", error);
            });
        fetch('http://localhost:8080/challenges')
            .then(response => response.json())
            .then(data => {
                setChallenges(data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des challenges dans la page ChallengeDetails", error)
            });
    }, [user.uid]); // Utilisez user.uid comme dépendance pour refléter l'utilisateur actuel

    // Détermine si l'utilisateur participe déjà à un challenge
    const isParticipating = (challengeId) => {
        return participates.some(participate => participate.challenge.uid === challengeId);
    };

    return (user &&
        <React.Fragment>
            <Navbar/>
            <div className="challenge-details-box">
                <h4>Challenges en cours : </h4>
                {participates.length === 0
                    ? <p className="center"><strong style={{ fontSize:"150%" }}>Pas de challenges en cours</strong></p>

                    : participates.map((participate, index) => (
                        <ParticipateDetailsView key={index} participate={participate} />
                    ))
                }
            </div>
            <div className="challenge-details-box">
                <h4>Challenge disponible : </h4>
                {challenges.length === 0
                    ? <p className="center"><strong style={{ fontSize:"150%" }}>Votre entreprise n'a pas mis en place de défi</strong></p>

                    : challenges.map((challenge, index) => (
                        <ChallengeDetailsView key={index} challenge={challenge} isParticipating={isParticipating(challenge.uid)} />
                    ))
                }
            </div>
        </React.Fragment>
    );
};

export default ChallengeDetails;
