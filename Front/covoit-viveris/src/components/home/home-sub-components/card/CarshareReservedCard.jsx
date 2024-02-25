import React from 'react';
import { useNavigate } from 'react-router-dom';

export function CarshareReservedCard({ carshare }) {

    const navigate = useNavigate();

    const handleDetailsClick = () => {
        navigate("/end-carshare",  {state: {idCarshare: carshare.uid}})
    };

    return (
        <div className="carshare-card">
            <div className="carshare-date">{carshare.schedule}</div>
            <div className="carshare-info">
                <span>{carshare.start_place.city} vers {carshare.end_place.city}</span>
            </div>
            <div className="carshare-driver">
                <span>avec {carshare.driver.pseudo}</span>
                <img src={`../../src/images/profil_picture_${carshare.driver.picture_profile}.png`} alt={carshare.driver.name} />
            </div>
            <button className="btn-details" onClick={handleDetailsClick}>Valider</button>
        </div>
    );
}