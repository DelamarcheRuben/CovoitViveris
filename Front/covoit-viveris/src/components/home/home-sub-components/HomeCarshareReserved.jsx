import React, { useState, useEffect } from 'react';
import {useUser} from "../../../context/UserContext.jsx";
import {useSearchResults} from "../../../context/SearchResultsContext.jsx";
import {useNavigate} from "react-router-dom";
import {ParticipateHomeView} from "../../challenge/ParticipateHomeView.jsx";
import {CarshareReservedCard} from "./card/CarshareReservedCard.jsx";

function HomeCarshareReserved() {
    const [carshareReserved, setCarshareReserved] = useState('');
    const { updateUser, user } = useUser();

    useEffect(() => {
        fetch(`http://localhost:8080/booked-carshares?id_user=${user.uid}`)
            .then(response => response.json())
            .then(data => {
                setCarshareReserved(data); // Mise à jour des résultats dans le contexte
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des covoiturages reservés par l'utilisateur : ", error);
            });
    }, [user.id]);

    return (user &&
        <div className="home-box">
            <h4>Mes reservations</h4>
            {carshareReserved === null
                ? <p className="center">Chargement des réservations...</p> // Afficher un message de chargement
                : carshareReserved.length === 0
                    ? <p className="center"><strong style={{ fontSize: "150%" }}>Aucune Réservation</strong></p>
                    : carshareReserved.map((carshare, index) => (
                        <CarshareReservedCard key={index} carshare={carshare} />
                    ))
            }
        </div>
    );
}

export default HomeCarshareReserved;
