import React from 'react';

export function CarshareOfferedCard({ carshare }) {
    return (
        <div className="carshare-card">
            <div className="carshare-date"> Le {carshare.schedule}</div>
            <div className="carshare-info">
                <span>de {carshare.start_place.city} vers {carshare.end_place.city}</span>
            </div>
            <button className="btn-details" >Détails</button>
        </div>
    );
}