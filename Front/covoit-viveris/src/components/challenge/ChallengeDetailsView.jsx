import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext.jsx";
import logoXP from '../../images/icon/xp.png';
import { useSnackbar } from "../../context/SnackbarContext.jsx";
import { useNavigate } from "react-router-dom";

export function ChallengeDetailsView({ challenge, isParticipating }) {
    const { user } = useUser();
    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const now = new Date();

        // Utilisez la deadline du challenge pour calculer la endDate
        const deadlineDate = new Date(now);
        deadlineDate.setDate(now.getDate() + challenge.deadline);

        // Mettez à jour l'état avec les dates formatées
        setStartDate(formatDate(now));
        setEndDate(formatDate(deadlineDate));;

    }, [challenge.uid, challenge.deadline]); // Assurez-vous d'inclure challenge.uid comme dépendance si nécessaire


    const formatDate = (date) => {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    };

    const handleBtnChallengeClick = () => {
        console.log(`Participation au challenge ${challenge.uid} de l'utilisateur ${user.pseudo}${user.uid}`);

        let participateData = generateParticipateData(challenge.uid);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(participateData)
        };

        fetch('http://localhost:8080/participate', requestOptions)
            .then(response => response.ok ? response.json() : Promise.reject(`Erreur: ${response.statusText} (code: ${response.status})`))
            .then(data => {
                openSnackbar(`Vous participez au Défis '${challenge.name}' !`, 'success', {
                    label: 'Voir mes défis',
                    onClick: () => navigate('/challenge-details'),
                });
            })
            .catch(error => {
                openSnackbar('Erreur lors de l\'inscription au challenge', 'error', {
                    label: 'Voir mes défis',
                    onClick: () => navigate('/challenge-details'),
                });
                console.error(error);
            });
        navigate('/home');
    };

    const generateParticipateData = (challengeId) => {
        let participateData = {
            uid: {
                uid_challenge: challengeId,
                uid_user: user.uid,
            },
            challenge: { uid: challengeId },
            user: { uid: user.uid },
            progress: 0.0,
            start_date: startDate,
            end_date: endDate,
            has_completed: false,
            kilometers: null,
            co2_economy: null,
        };

        switch (challengeId) {
            case 1:
                participateData.kilometers = 0;
                break;
            case 4:
                participateData.co2_economy = 0;
                break;
            case 5:
                participateData.kilometers = 0;
                break;
            default:
                break;
        }

        return participateData;
    };

    const buttonStyle = isParticipating ? { backgroundColor: "grey", color: "white", cursor: "not-allowed" } : {};

    return (user &&
        <div className="participate-details-box">
            <div className="challenge-name"><strong>{challenge.name}</strong></div>
            <div className="carshare-info">
                <span>{challenge.description}</span>
            </div>
            <div className="participate-time">
                <p>{challenge.deadline} jours</p>
            </div>
            <div className="challenge-xp">
                <strong>{challenge.bonus_exp}</strong>
                <img src={logoXP} alt="XP Logo" />
            </div>
            <div className="div-btn-challenge">
                <button disabled={isParticipating} className="btn-details" style={buttonStyle} onClick={handleBtnChallengeClick}>
                    {isParticipating ? "Vous participez déjà à ce challenge" : "Participer au Challenge"}
                </button>
            </div>
        </div>
    );
}
