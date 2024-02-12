import React, { useState, useEffect } from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useUser } from "../../context/UserContext.jsx";

// Composant pour gérer le marqueur de l'utilisateur
const UserLocationMarker = ({ userLocation }) => {
    const map = useMap();

    useEffect(() => {
        if (userLocation) {
            const userMarkerIcon = L.icon({
                iconUrl: '../../../src/images/icon/maison.png', // Remplacez par le chemin de votre icône
                iconSize: [25, 25], // Taille de l'icône
            });

            L.marker(userLocation, { icon: userMarkerIcon }).addTo(map);
        }
    }, [userLocation, map]);

    return null;
};

// Dans CarshareMap.jsx ou dans votre fichier de composant de carte

const CarshareMap = ({ carshares, userLocation, locationDenied }) => {
    const defaultPosition = [48.8566, 2.3522]; // Coordonnées de Paris

    const mapStyle = locationDenied ? { filter: 'grayscale(100%)' } : {};

    // Styles pour le conteneur de la carte
    const mapContainerStyle = {
        height: '500px', // Hauteur fixe pour la carte
        width: '80%', // Largeur à 80% pour centrer la carte
        margin: '20px auto', // Centrer le conteneur de la carte sur la page
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)', // Ombre portée similaire à CarshareCreation
    };

    return (
        <div className="mapContainer">
            <MapContainer center={defaultPosition} zoom={13} style={{ height: '100%', width: '100%', ...mapStyle }}>
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
                {userLocation && <UserLocationMarker userLocation={userLocation} />}
            </MapContainer>
            {locationDenied && (
                <div className="overlay">
                    Autorisez l'accès à votre localisation pour pouvoir voir les covoiturages disponibles autour de vous.
                </div>
            )}
        </div>
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

const CarshareResearch = () => {
    const [carshares, setCarshares] = useState([]);
    const [showMap, setShowMap] = useState(false);
    const { user } = useUser();
    const [userLocation, setUserLocation] = useState(null);
    const [locationDenied, setLocationDenied] = useState(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation([position.coords.latitude, position.coords.longitude]);
                setLocationDenied(false);
            },
            () => {
                setLocationDenied(true);
            }
        );

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
                <CarshareMap carshares={carshares} userLocation={userLocation} locationDenied={locationDenied} />
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