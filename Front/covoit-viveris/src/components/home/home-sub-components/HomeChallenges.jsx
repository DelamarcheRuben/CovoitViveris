import React, { useState, useEffect } from 'react';
import {ChallengeHomeView} from "../../challenge/ChallengeHomeView.jsx";
import {useUser} from "../../../context/UserContext.jsx";

function HomeChallenges() {
    const [challenges, setChallenges] = useState('');
    const user = useUser();

    const handleDetailsClick = () => {
        // TODO: Faire la page détails et insérer ici un navigate(/details/idCarshare)
        console.log(user);
    };

    useEffect(() => {
        console.log("Appel API pour récupérer les challenges");
        fetch(`http://localhost:8080/challenges`)
            .then(response => response.json())
            .then(data => {
                setChallenges(data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des challenges : ", error);
            });
    }, []);

    return (
        <div className="home-box">
            <h4>Challenges en cours</h4>
            <button className="btn-details" onClick={handleDetailsClick}>Détails</button>
            {challenges.length === 0
            ? <p className="center"><strong style={{ fontSize:"150%" }}>Pas de challenges en cours</strong></p>
            : challenges.map((challenge, index) => (
                <ChallengeHomeView key={index} challenge={challenge} /> /*<p> test {index}</p>*/
            ))}
        </div>


    );
}

export default HomeChallenges;
