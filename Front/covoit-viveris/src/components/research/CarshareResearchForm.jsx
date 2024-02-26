import React, { useState } from "react";
import { useWindowWidth } from "../../context/WindowWidthContext.jsx";
import {useUser} from "../../context/UserContext.jsx";
import {useSearchResults} from "../../context/SearchResultsContext.jsx";
import {useNavigate} from "react-router-dom";
import * as time     from "../../functions/time.js";

const CarshareResearchForm = () => {
    const [startPlace, setStartPlace] = useState('');
    const [endPlace, setEndPlace] = useState('');
    const [startDate, setStartDate] = useState('');
    const { updateUser, user } = useUser();
    const { updateSearchResults } = useSearchResults(); // Utiliser le contexte de résultats de recherche
    const navigate = useNavigate();

    const handleSearchClick = () => {
        console.log("Recherche en cours pour", { startPlace, endPlace, startDate });
        fetch(`http://localhost:8080/sorted-carshares?id_user=${user.uid}&date=${startDate}`)
            .then(response => response.json())
            .then(data => {
                data.map((d, i) =>{
                    const time_carshare = new time.Time(0, Math.round(d.distance+10)); //temps du carshare en minutes (formule : temps = distance en km+10)
                    var endHour = new time.Time(parseInt(d.schedule.substring(11,13)), parseInt(d.schedule.substring(14,16)));
                    endHour.addMinutes(time_carshare.getTotalMinutes());
                    d.endHour = endHour.toString();
                    d.duration = time_carshare.toString();
                    return d;
                });
                updateSearchResults(data); // Mise à jour des résultats dans le contexte
                navigate("/research/results"); // Naviguer vers la page de résultats
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des covoiturages triés : ", error);
            });
    };

    return (user &&
        <React.Fragment>
            <div className="scheduling-form">
                <p className="center" style={{ marginBottom: "20px" }}><strong style={{ fontSize: "25px" }}>Rechercher un trajet</strong></p>

                <label> Lieu de départ :
                    <input
                        type="text"
                        value={startPlace}
                        onChange={e => setStartPlace(e.target.value)}
                        placeholder="Entrez l'adresse de départ"
                        autoComplete="off"
                        disabled={true}
                    />
                </label>

                <label> Lieu d'arrivée :
                    <input
                        type="text"
                        value={endPlace}
                        onChange={e => setEndPlace(e.target.value)}
                        placeholder="Entrez l'adresse d'arrivée"
                        autoComplete="off"
                        disabled={true}
                    />
                </label>

                <label> Date de départ :
                    <input
                        type="date"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                    />
                </label>

                <button className="btn" onClick={handleSearchClick}>
                    <strong style={{ fontSize: "15px", padding: "5px" }}>Rechercher</strong>
                </button>
            </div>
        </React.Fragment>
    );
};

export default CarshareResearchForm;
