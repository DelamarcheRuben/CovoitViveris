import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useSearchResults } from '../../context/SearchResultsContext';
import {useUser} from "../../context/UserContext.jsx";
import {BookCarshareViewMap} from "../booking/BookCarshareViewMap.jsx"; // Assurez-vous que le chemin d'accès est correct


const UserLocationMarker = ({ userLocation, locationDenied }) => {
    const map = useMap();
    const { user } = useUser();

    useEffect(() => {
        if (userLocation && !locationDenied) {
            const userMarkerIcon = L.icon({
                iconUrl: '../../../src/images/icon/maison.png', // Utilisez une icône rouge ici pour la position de l'utilisateur
                iconSize: [25, 25],
                iconAnchor: [12, 24],
                popupAnchor: [0, -24],
            });

            L.marker(userLocation, { icon: userMarkerIcon }).addTo(map);
        }
    }, [userLocation, map, locationDenied]);

    return null;
};

const CarshareResearchMap = () => {
    const { searchResults } = useSearchResults(); // Accès aux résultats de recherche via le contexte
    const [userLocation, setUserLocation] = useState(null);
    const [locationDenied, setLocationDenied] = useState(true);
    const [selectedCarshare, setSelectedCarshare] = useState(null);
    const { user } = useUser();

    const handleMarkerClick = (carshare) => {
        setSelectedCarshare(carshare); // Mettre à jour l'état avec le covoiturage sélectionné
    };

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

    return (user &&
        <div className="mapContainer" style={{ position: 'relative', height: '400px' }}>
            {!locationDenied && (
                <>
                    <MapContainer
                        center={userLocation || [48.866667, 2.333333]}
                        zoom={12}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {searchResults.map((carshare, index) => (
                            <Marker
                                key={index}
                                position={[carshare.start_place.latitude, carshare.start_place.longitude]}
                                eventHandlers={{ click: () => handleMarkerClick(carshare) }}
                            >
                                <Popup>
                                    Départ: {carshare.start_place.road}<br />
                                    Arrivée: {carshare.end_place.road}<br />
                                    Place restantes : {carshare.max_passenger}<br />
                                </Popup>
                            </Marker>
                        ))}
                        {userLocation && <UserLocationMarker userLocation={userLocation} locationDenied={locationDenied} />}
                    </MapContainer>
                    {selectedCarshare && <BookCarshareViewMap carshare={selectedCarshare} />}
                </>
            )}
            {locationDenied && (
                <div className="overlay">
                    <p>Autorisez l'accès à votre localisation pour pouvoir voir les covoiturages disponibles autour de vous.</p>
                </div>
            )}
        </div>
    );
};

export default CarshareResearchMap;