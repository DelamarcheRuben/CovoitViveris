import React, { useState, useEffect } from 'react';
import {useUser} from "../../../context/UserContext.jsx";
import {CarshareOfferedCard} from "./card/CarshareOfferedCard.jsx";

function HomeCarshareOffered() {

    const [carshareOffered, setCarshareOffered] = useState('');
    const { user } = useUser();

    useEffect(() => {
        fetch(`http://localhost:8080/proposed-carshares?id_user=${user.uid}`)
            .then(response => response.json())
            .then(data => {
                var filtered_data = []; //we remove carshares that are already validated
                for (let index = 0; index < data.length; index++) {
                    if(!data[index].has_validated) filtered_data.push(data[index]);
                }
                setCarshareOffered(filtered_data); // Mise à jour des résultats dans le contexte
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des covoiturages reservés par l'utilisateur : ", error);
            });
    }, [user.id]);

    return (user &&
        <div className="home-box">
            <h4>Mes trajets</h4>
            {carshareOffered === null
                ? <p className="center">Chargement des réservations...</p> // Afficher un message de chargement
                : carshareOffered.length === 0
                    ? <p className="center"><strong style={{ fontSize: "150%" }}>Aucun covoiturage proposé</strong></p>
                    : carshareOffered.map((carshare, index) => (
                        <CarshareOfferedCard key={index} carshare={carshare} />
                    ))
            }
        </div>
    );
}

export default HomeCarshareOffered;
