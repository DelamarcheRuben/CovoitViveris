import React from 'react';
import { useNavigate } from 'react-router-dom';

export function CarshareOfferedCard({ carshare }) {
    const navigate = useNavigate();

    const handleDetailsClick = () => {
        navigate("/end-carshare",  {state: {idCarshare: carshare.uid}})
    };

    return (
        <div className="carshare-card">
            <div className="carshare-date">Le {carshare.schedule}</div>
            <div className="carshare-info">
                <span>de {carshare.start_place.city} vers {carshare.end_place.city}</span>
            </div>
            <button className="btn-details" onClick={handleDetailsClick}>Valider</button>
        </div>
    );
}
