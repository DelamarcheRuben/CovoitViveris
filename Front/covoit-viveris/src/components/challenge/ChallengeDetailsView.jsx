import React from "react";
import { useUser } from "../../context/UserContext.jsx";
import logoXP from '../../images/icon/xp.png';
import {useSnackbar} from "../../context/SnackbarContext.jsx";
import {useNavigate} from "react-router-dom"; // Voici le chemin corrigé

export function ChallengeDetailsView({challenge, isParticipating}){
    const { user } = useUser();
    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const handleBtnChallengeClick = () => {
        console.log("participation au challenge " + challenge.uid + " de l'utilisateur " + user.pseudo + user.uid);

        // Préparer le corps de la demande
        const participateData = {
            challenge: challenge.uid, // Assurez-vous que c'est l'ID correct du challenge
            user: user.id, // Assurez-vous que c'est l'ID correct de l'utilisateur
            // Vous pouvez ajouter d'autres champs requis par votre API ici
        };

        // Configurer les options de la requête
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(participateData) // Convertir les données en JSON
        };

        // Envoyer la requête PUT
        fetch('http://localhost:8080/participate', requestOptions) // Remplacez par l'URL de votre API
            .then(response => {
                if (!response.ok) {
                    // Si la réponse n'est pas ok (par exemple, pas un statut 200), lancer une erreur avec le statut pour la traiter dans le bloc catch
                    openSnackbar('Erreur lors de l\'inscription au challenge', 'error', {
                        label: 'Voir mes défis',
                        onClick: () => navigate('/challenge-details'),
                    });
                    throw new Error(`Erreur: ${response.statusText} (code: ${response.status})`);
                }
                return response.json(); // Si tout va bien, continuer à traiter la réponse
            })
            .then(data => {
                console.log(data);
                openSnackbar('Vous participez au Défis \'' + challenge.name + '\' !', 'success', {
                    label: 'Voir mes défis',
                    onClick: () => navigate('/challenge-details'),
                });
            }) // Afficher les données reçues (ou traiter l'ajout avec succès)
            .catch(error => {
                openSnackbar('Erreur lors de l\'inscription au challenge', 'error', {
                    label: 'Voir mes défis',
                    onClick: () => navigate('/challenge-details'),
                });
            }); // Gérer les erreurs éventuelles
        navigate('/home');

    };

    const buttonStyle = isParticipating ? { backgroundColor: "grey", color: "white", cursor: "help" } : {};

    return (
        <div className="participate-details-box">
            <div className="challenge-name"><strong>{challenge.name}</strong></div>
            <div className="carshare-info">
                <span>{challenge.description}</span>
            </div>
            <div className="challenge-xp">
                <strong>{challenge.bonus_exp}</strong>
                <img src={logoXP} alt="XP Logo"/>
            </div>
            <div className="div-btn-challenge">
                <button disabled={isParticipating} className="btn-details" style={buttonStyle} onClick={handleBtnChallengeClick}>
                    {isParticipating ? "Vous participez déjà à ce challenge" : "Participer au Challenge"}
                </button>
            </div>
        </div>
    );
}

/*
openSnackbar('La réservation a échoué', 'error');
openSnackbar('Le covoiturage a été réservé', 'success');
openSnackbar('Vous avez un nouvel ami !', 'success', {
    label: 'Voir mes Amis',
    onClick: () => navigate('/profile/friends/'),
}
 */
