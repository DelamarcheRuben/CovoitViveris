import React from 'react';

export function CarshareReservedCard({ carshare }) {
    return (
        <div className="carshare-card">
            <div className="carshare-date">{carshare.schedule}</div>
            <div className="carshare-info">
                <span>{carshare.start_place.city} vers {carshare.end_place.city}</span>
            </div>
            <div className="carshare-driver">
                <span>avec {carshare.driver.pseudo}</span>
                <img src={carshare.driver.profilePictureUrl} alt={carshare.driver.name} />
            </div>
        </div>
    );
}