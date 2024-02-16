import React, { useState } from "react";
import { useWindowWidth } from "../../context/WindowWidthContext.jsx";

const CarshareResearchForm = () => {
    const windowWidth = useWindowWidth();

    const [startPlace, setStartPlace] = useState('');
    const [endPlace, setEndPlace] = useState('');
    const [startDate, setStartDate] = useState('');

    const handleSearchClick = () => {
        console.log("Recherche en cours pour", { startPlace, endPlace, startDate });
        // Implémentez la logique pour afficher CarshareResearchList avec les résultats ici
    };

    return (
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
                    />
                </label>

                <label> Lieu d'arrivée :
                    <input
                        type="text"
                        value={endPlace}
                        onChange={e => setEndPlace(e.target.value)}
                        placeholder="Entrez l'adresse d'arrivée"
                        autoComplete="off"
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
