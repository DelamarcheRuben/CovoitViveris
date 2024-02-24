import React from 'react';
import { useNavigate } from 'react-router-dom';

export function CarshareOfferedCard({ carshare }) {
    const navigate = useNavigate();

    const handleDetailsClick = () => {
        // TODO: Faire la page détails et insérer ici un navigate(/details/idCarshare)
        console.log('Affichage des détails pour', carshare.id);
    };

    return (
        <div className="carshare-card">
            <div className="carshare-date">Le {carshare.schedule}</div>
            <div className="carshare-info">
                <span>de {carshare.start_place.city} vers {carshare.end_place.city}</span>
            </div>
            <button className="btn-details" onClick={handleDetailsClick}>Détails</button>
        </div>
    );
}
