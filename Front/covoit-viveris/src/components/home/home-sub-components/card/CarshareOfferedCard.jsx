import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function CarshareOfferedCard({ carshare }) {
    const navigate = useNavigate();

    const [passengers, setPassengers] = useState([]);

    useEffect(() => {


        const fetchCarshare = async () => {
          try {
            const response = await fetch("http://localhost:8080/passengers?id_carshare="+carshare.uid);
            var data_json  = await response.json();
            setPassengers(data_json);
            console.log(data_json);
    
          } catch (error) {
            console.error("Erreur lors de la récupération des passagers :", error);
            navigate("/home");
          }
        }
    
        fetchCarshare();
      }, [carshare]);

    const handleDetailsClick = () => {
        navigate("/end-carshare", { state: { idCarshare: carshare.uid } });
    };

    const handleDetailsCarshareClick = () => {
        navigate("/details-carshare", { state: { idCarshare: carshare.uid } });
    };

    return (
        <div className="carshare-card">
            <div className="carshare-date">Le {carshare.schedule}</div>
            <div className="carshare-info">
                <span>
                de {carshare.start_place.city} vers {carshare.end_place.city}
                </span>
            </div>
            <div className="col">
                <div className="row" style={{ marginBottom: "10px"}}>
                    <button className="btn-details" onClick={handleDetailsCarshareClick}>
                    Détails
                    </button>
                </div>
                {passengers.length === 0
                    ? <button className="btn-details-disabled center-picture" onClick={handleDetailsClick}disabled="true">Valider</button>
                    : <button className="btn-details center-picture" onClick={handleDetailsClick}>Valider</button>
                }
            </div>
        </div>
    );
}
