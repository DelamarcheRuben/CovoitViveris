import React, { useState, useEffect } from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useUser } from "../../context/UserContext.jsx";
import {CarshareResearchView} from "./CarshareResearchView.jsx";

const CarshareResearchList = () => {
    const { user } = useUser();
    const [carShareList, setCarShareList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/not-full-carshares?id_user=" + user.uid)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setCarShareList(data);
            });
    }, []);

    return (
        <React.Fragment>
            {carShareList && carShareList.length == 0
                ?
                <p className="center"><strong style={{ fontSize:"40px" }}>Aucun Résultat</strong></p>
                :
                carShareList.map((carshare, index) => (
                    <React.Fragment key={index}>
                        {/* Display medal + user if user is in the top 3 otherwise display user only */}
                        {carshare.driver.uid == user.uid ? (
                            <div></div>
                        ) : (
                            <CarshareResearchView key={index} carshare={carshare} />
                        )}

                    </React.Fragment>
                ))}
        </React.Fragment>
    );
}

export { CarshareResearchList };
