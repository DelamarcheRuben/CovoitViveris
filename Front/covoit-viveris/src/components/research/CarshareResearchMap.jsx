import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useUser } from '../../context/UserContext.jsx';

const UserLocationMarker = ({ userLocation }) => {
    const map = useMap();

    useEffect(() => {
        if (userLocation) {
            const userMarkerIcon = L.icon({
                iconUrl: '../../../src/images/icon/maison.png',
                iconSize: [25, 25],
            });

            L.marker(userLocation, { icon: userMarkerIcon }).addTo(map);
        }
    }, [userLocation]);

    return null;
};

const CarshareResearchMap = () => {
    const { user } = useUser();
    const [carshares, setCarshares] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [locationDenied, setLocationDenied] = useState(true); // Default to true for initial state

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                setUserLocation([position.coords.latitude, position.coords.longitude]);
                setLocationDenied(false);
            },
            () => {
                setLocationDenied(true);
            },
            { enableHighAccuracy: true }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    useEffect(() => {
        if (!locationDenied) {
            fetch(`http://localhost:8080/not-full-carshares?id_user=${user.uid}`)
                .then(response => response.json())
                .then(data => setCarshares(data))
                .catch(error => console.error('Erreur lors de la récupération des covoiturages:', error));
        }
    }, [user.uid, locationDenied, userLocation]);

    return (
        <div className="mapContainer" style={{ position: 'relative' }}>
            <MapContainer
                center={userLocation || [48.866667, 2.333333]}
                zoom={12}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    opacity={locationDenied ? 0.2 : 1}
                />
                {carshares.map(carshare => (
                    <Marker key={carshare.uid} position={[carshare.start_place.latitude, carshare.start_place.longitude]}>
                        {!locationDenied && (
                            <Popup>
                                Départ: {carshare.start_place.road}<br />
                                Arrivée: {carshare.end_place.road}<br />
                                Distance: {carshare.distance} km<br />
                                Place max: {carshare.max_passenger}<br />
                                Est plein: {carshare.is_Full ? 'Oui' : 'Non'}
                            </Popup>
                        )}
                    </Marker>
                ))}
                {userLocation && <UserLocationMarker userLocation={userLocation} />}
            </MapContainer>
            {locationDenied &&
                <div className="overlay" style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", pointerEvents: 'none' }}>
                    <p style={{ margin: 20 }}>Autorisez l'accès à votre localisation pour pouvoir voir les covoiturages disponibles autour de vous.</p>
                </div>
            }
        </div>
    );
};

export { CarshareResearchMap };
