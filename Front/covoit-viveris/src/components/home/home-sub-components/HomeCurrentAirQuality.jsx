// HomeCurrentAirQuality.jsx
import React, { useState, useEffect } from 'react';

function HomeCurrentAirQuality({ location }) {
    const [airQualityIndex, setAirQualityIndex] = useState('Loading...');
    const parisCoordinates = { lat: 48.8566, lng: 2.3522 }; // Coordonnées de Paris

    const getAirQualityColor = (index) => {
        if (index <= 40) return 'green';
        if (index <= 70) return '#c3b700';
        if (index <= 150) return 'orange';
        if (index <= 200) return 'red';
        return 'maroon'; // Pour les valeurs supérieures à 200
    };

    useEffect(() => {
        const fetchAirQuality = async () => {
            try {
                // Remplacez 'YOUR_API_KEY' par votre clé API OpenAQ
                const apiKey = 'YOUR_API_KEY';
                const response = await fetch(
                    `https://api.openaq.org/v2/latest?limit=100&page=1&offset=0&sort=desc&coordinates=${parisCoordinates.lat},${parisCoordinates.lng}&radius=1000&order_by=lastUpdated&dump_raw=false&apikey=${apiKey}`
                    //`https://api.openaq.org/v2/latest?coordinates=${parisCoordinates.lat},${parisCoordinates.lng}&radius=1000&limit=1&order_by=distance&sort=asc&apikey=${apiKey}`
                );
                const data = await response.json();
                // Vous pouvez adapter ce traitement selon la structure des données retournées par l'API
                if (data && data.results && data.results.length > 0) {
                    setAirQualityIndex(null);
                    for (let i = 0; i < data.results.length; i++) {
                        if(data.results[0].measurements[0].parameter==="no2"){
                            const airQualityIndex = data.results[0].measurements[0].value;
                            setAirQualityIndex(airQualityIndex);
                        }
                    }
                } else {
                    // Gérer le cas où aucune donnée n'est disponible pour Paris
                    setAirQualityIndex(null);
                }
            } catch (error) {
                console.error('Error fetching air quality:', error);
                // Gérer les erreurs de requête
                setAirQualityIndex(null);
            }
        };

        fetchAirQuality();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const airQualityStyle = {
        backgroundColor: airQualityIndex !== null ? getAirQualityColor(airQualityIndex) : 'grey',
    };

    return (
        <div className="home-box">
            <h4>Qualité de l'air</h4>
            <div className="air-quality-rectangle" style={airQualityStyle}>
                {airQualityIndex !== null ? (
                    <p>
                        Indice de qualité de l'air pour Paris : {airQualityIndex}
                    </p>
                ) : (
                    <p>Aucune donnée de qualité de l'air disponible pour Paris.</p>
                )}
            </div>
        </div>
    );
}

export default HomeCurrentAirQuality;

// API KEY for OpenAQ API : e0d91085ef33b13f360b37bf4ecebebf8ac3f5f1ab44c039fd6f767b46565234
