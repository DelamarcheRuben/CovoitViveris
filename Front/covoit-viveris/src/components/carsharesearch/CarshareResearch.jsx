import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useUser } from "../../context/UserContext.jsx";

// Le composant pour la carte
const CarshareMap = ({ carshares }) => {
    const defaultPosition = [48.8566, 2.3522]; // Coordonnées de Paris

    return (
        <MapContainer center={defaultPosition} zoom={13} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {carshares.map(carshare => (
                <Marker
                    key={carshare.uid}
                    position={[carshare.start_place.latitude, carshare.start_place.longitude]}
                >
                    <Popup>
                        Départ: {carshare.start_place.road}<br />
                        Arrivée: {carshare.end_place.road}<br />
                        Distance: {carshare.distance} km<br />
                        Place max: {carshare.max_passenger}<br />
                        Est plein: {carshare.is_Full ? 'Oui' : 'Non'}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

// Le composant pour la liste des covoiturages
const CarshareList = ({ carshares }) => {
    return (
        <div style={{ marginTop: '20px' }}>
            {carshares.map(carshare => (
                <div key={carshare.uid} style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '10px' }}>
                    Départ: {carshare.start_place.fullAddress} - Arrivée: {carshare.end_place.fullAddress}
                </div>
            ))}
        </div>
    );
};

// Le composant parent qui gère l'affichage de la carte ou de la liste et récupère les données
const CarshareResearch = () => {
    const [carshares, setCarshares] = useState([]);
    const [showMap, setShowMap] = useState(false);
    const { user } = useUser();

    useEffect(() => {
        fetch('http://localhost:8080/not-full-carshares?id_user=1') // Assurez-vous que l'ID utilisateur est correctement passé
            .then(response => response.json())
            .then((data) => {
                setCarshares(data); // Pas besoin de géocodage supplémentaire
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des covoiturages:', error);
            });
    }, [user]);

    return (
        <div>
            {showMap ? (
                <CarshareMap carshares={carshares} />
            ) : (
                <CarshareList carshares={carshares} />
            )}
            <button onClick={() => setShowMap(!showMap)}>
                {showMap ? 'Voir la liste' : 'Voir la carte'}
            </button>
        </div>
    );
};

export { CarshareMap, CarshareList, CarshareResearch };