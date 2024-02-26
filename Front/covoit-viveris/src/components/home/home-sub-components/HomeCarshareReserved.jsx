import React, { useState, useEffect } from 'react';
import {useUser} from "../../../context/UserContext.jsx";
import {useSearchResults} from "../../../context/SearchResultsContext.jsx";
import {useNavigate} from "react-router-dom";
import {ChallengeHomeView} from "../../challenge/ChallengeHomeView.jsx";
import {CarshareReservedCard} from "./card/CarshareReservedCard.jsx";

function HomeCarshareReserved() {
    const [carshareReserved, setCarshareReserved] = useState('');
    const { updateUser, user } = useUser();

    useEffect(() => {
        const fetchCarshares = async () => {
            try
            {
                var reponse = await fetch(`http://localhost:8080/booked-carshares?id_user=${user.uid}`)
                var carshares = await reponse.json();
                var filtered_carshares = [];
                var reponse = await fetch(`http://localhost:8080/passengers?id_user=${user.uid}`)
                var passengers = await reponse.json();
                for (let i = 0; i < carshares.length; i++) {
                    for (let j = 0; j < passengers.length; j++) {
                        if(passengers[j].uid.uid_carshare===carshares[i].uid)
                        {
                            if(!passengers[j].has_validated) filtered_carshares.push(carshares[i]);
                            break;
                        }
                    }
                }
                setCarshareReserved(filtered_carshares); // Mise à jour des résultats dans le contexte
            }catch(error)
            {
                console.error("Erreur lors de la récupération des covoiturages reservés par l'utilisateur : ", error);
            }
        }
        fetchCarshares();
        

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
