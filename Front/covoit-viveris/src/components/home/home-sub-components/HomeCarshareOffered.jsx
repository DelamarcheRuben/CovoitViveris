import React, { useState, useEffect } from 'react';
import {useUser} from "../../../context/UserContext.jsx";
import {CarshareReservedCard} from "./card/CarshareReservedCard.jsx";
import {CarshareOfferedCard} from "./card/CarshareOfferedCard.jsx";

function HomeCarshareOffered() {

    const [carshareOffered, setCarshareOffered] = useState('');
    const { updateUser, user } = useUser();

    useEffect(() => {
        fetch(`http://localhost:8080/proposed-carshares?id_user=${user.uid}`)
            .then(response => response.json())
            .then(data => {
                setCarshareOffered(data); // Mise à jour des résultats dans le contexte
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des covoiturages reservés par l'utilisateur : ", error);
            });
    });

    return (
        <div className="home-box">
            <h4>Mes trajets</h4>
            {carshareOffered === null
                ? <p className="center">Chargement des réservations...</p> // Afficher un message de chargement
                : carshareOffered.length === 0
                    ? <p className="center"><strong style={{ fontSize: "40px" }}>Aucun Résultat</strong></p>
                    : carshareOffered.map((carshare, index) => (
                        <CarshareOfferedCard key={index} carshare={carshare} />
                    ))
            }
        </div>
    );
}

export default HomeCarshareOffered;
