import React, { useState, useEffect } from 'react';
import {CarshareResearchView} from "../../research/CarshareResearchView.jsx";
import {ChallengeView} from "../../challenge/ChallengeView.jsx";

function HomeWeeklyChallenge() {
    const [weeklyChallenge, setWeeklyChallenge] = useState('');

    useEffect(() => {
        console.log("Appel API pour récupérer les challenges");
        fetch(`http://localhost:8080/challenges`)
            .then(response => response.json())
            .then(data => {
                setWeeklyChallenge(data);
                console.log(data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des challenges : ", error);
            });
    }, []);

    return (
        <div className="home-box">
            <h4>Défi de la semaine</h4>
            {weeklyChallenge.length === 0
            ? <p className="center"><strong style={{ fontSize:"40px" }}>Aucun Résultat</strong></p>
            : weeklyChallenge.map((weeklyChallenge, index) => (
                <ChallengeView key={index} challenge={weeklyChallenge} />
            ))}
        </div>


    );
}

export default HomeWeeklyChallenge;
