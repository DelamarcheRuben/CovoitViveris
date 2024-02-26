import React, {useEffect, useState} from "react";
import { useWindowWidth } from "../../context/WindowWidthContext.jsx";
import {useUser} from "../../context/UserContext.jsx";
import logoXP from "../../images/icon/xp.png";


export function ParticipateDetailsView({participate}){
    const windowWidth = useWindowWidth();
    const user = useUser();

    const [timeRemaining, setTimeRemaining] = useState('');

    const challengeName = participate.challenge.name;
    const challengeDescription = participate.challenge.description;
    const challengeProgress = participate.progress;
    const challengeXp = participate.challenge.bonus_exp;
    const challengeTimeEnd = participate.end_date;

    useEffect(() => {
        const calculateTimeRemaining = () => {
            const now = new Date();
            const endDateStr = participate.end_date;
            const endDate = new Date(endDateStr.replace(' ', 'T'));

            if (isNaN(endDate)) {
                console.error('La date de fin est invalide.');
                return 'Date de fin invalide';
            }

            const timeLeft = endDate - now;

            if (timeLeft > 0) {
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                return `${days}j, ${hours}h, ${minutes}min, ${seconds}s`;
            } else {
                return 'Terminé';
            }
        };

        const intervalId = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);

        // Nettoyage de l'interval lorsque le composant est démonté
        return () => clearInterval(intervalId);
    }, [participate.challenge.end_date]); // Dépendance au temps de fin du défi


    return (
        <div className="participate-details-box">
            <div className="challenge-name"><strong>{participate.challenge.name}</strong></div>
            <div className="participate-description">
                <span>{participate.challenge.description}</span>
            </div>
            <div className="participate-time">
                {timeRemaining == 'Terminé' ? <strong><p className="time-over"> {timeRemaining} </p></strong> : <p> {timeRemaining} </p>}
            </div>
            <div className="challenge-xp">
                <strong>{participate.challenge.bonus_exp}</strong>
                <img src={logoXP} alt="XP Logo" />
            </div>
            <div className="participate-progress">
                <div className="progress-bar-challenge">
                    <div
                        className="progress-bar-challenge-fill"
                        style={{ width: `${participate.progress}%` }}
                    ></div>
                </div>
                <p>{participate.progress}%</p>
            </div>
        </div>
    );
}

