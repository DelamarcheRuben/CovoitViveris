import React, { useEffect } from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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

const CarshareResearchMap = ({ carshares, userLocation, locationDenied }) => {
    let defaultPosition; // Coordonnées de Paris
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation([position.coords.latitude, position.coords.longitude]);
                defaultPosition = [position.coords.latitude, position.coords.longitude];
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

    const mapStyle = locationDenied ? { filter: 'grayscale(100%)' } : {};

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

export { CarshareResearchMap }