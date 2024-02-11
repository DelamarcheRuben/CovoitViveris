import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { geocodeAddress } from "../../functions/geocode.js";
import {useUser} from "../../context/UserContext.jsx";

// Le composant pour la carte
const CarshareMap = ({ carshares }) => {
    const defaultPosition = [48.8566, 2.3522]; // Coordonnées de Paris

    return (
        <MapContainer center={defaultPosition} zoom={13} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {carshares.map(carshare => (
                <Marker
                    key={carshare.uid}
                    position={carshare.position} // La position est maintenant une propriété dans l'objet carshare
                >
                    <Popup>
                        Départ: {carshare.start_place}<br />
                        Arrivée: {carshare.end_place}<br />
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
                    Départ: {carshare.start_place} - Arrivée: {carshare.end_place}
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
        fetch('http://localhost:8080/not-full-carshares?id_user=1')
            .then(response => response.json())
            .then(async (data) => {
                // Géocoder les adresses et ajouter les positions aux objets carshare
                const geocodedData = await Promise.all(data.map(async (carshare) => {
                    const position = await geocodeAddress(carshare.start_place);
                    return { ...carshare, position };
                }));

                setCarshares(geocodedData);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des covoiturages:', error);
            });
    }, [ user ]);

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
