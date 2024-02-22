import React, { useState, useEffect }  from "react";
import { useUser }        from "../../context/UserContext.jsx";
import { useWindowWidth } from "../../context/WindowWidthContext.jsx";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {useSnackbar} from "../../context/SnackbarContext.jsx";

const AutocompleteInput = ({ value, onChange, placeholder, setOutput }) => {

    const [suggestions, setSuggestions] = useState([]);
    const [timer, setTimer] = useState(null);

    // Fonction de nettoyage pour le timer
    useEffect(() => {
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [timer]);

    const handleInputChange = (event) => {
        const query = event.target.value;
        onChange(query); // Mise à jour de l'état du parent avec la valeur de l'input

        // Annuler la recherche précédente en cours
        if (timer) {
            clearTimeout(timer);
        }

        // Configuration d'un nouveau délai
        const newTimer = setTimeout(() => {
            if (query.length >= 3) {
                const url = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=fr&limit=5&addressdetails=1&q=${encodeURIComponent(query)}`;

                fetch(url)
                    .then((response) => response.json())
                    .then((data) => {
                        setSuggestions(data);
                    })
                    .catch((error) => {
                        console.error('Erreur lors de la recherche d\'adresses:', error);
                    });
            } else {
                setSuggestions([]);
            }
        }, 500); // 500ms de délai

        setTimer(newTimer);
    };

    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={handleInputChange}
                placeholder={placeholder}
                autoComplete="off"
            />
            {suggestions.length > 0 && (
                <ul style={{ position: 'absolute', zIndex: 1000 }}>
                    {suggestions.slice(0, 5).map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                onChange(suggestion.display_name);
                                setOutput(suggestion);
                                setSuggestions([]);
                            }}
                        >
                            {suggestion.display_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const CarshareCreation = () => {

    const windowWidth = useWindowWidth();

    const [startName, setStartName] = useState('');
    const [startPlace, setStartPlace] = useState('');
    const [endName, setEndName] = useState('');
    const [endPlace, setEndPlace] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [numSeats, setNumSeats] = useState(1);
    const [hasComeback, setHasComeback] = useState("sans");
    const { snackbar, openSnackbar, closeSnackbar } = useSnackbar();

    const { user } = useUser();

    const handleCreateClick = () => {

        if (!startPlace || !endPlace || !startDate || !startTime) {
            openSnackbar('Certains champs sont erronés', 'error');
            console.log("snackbar champ erronés")
            return;
        } else {
            //Vérification des champs à envoyer qui existent dans ce qui a été reçu par la requête à nominatim
            var start_city = null;
            var start_department = null;
            var start_postcode = null;
            var start_road = null;
            var start_house_number = null;

            //Vérification des différents types d'agglomérations dans l'ordre décroissant de taille
            if (typeof startPlace.address.municipality != 'undefined') {
                var start_city = startPlace.address.municipality;
            }

            if (typeof startPlace.address.city != 'undefined') {
                var start_city = startPlace.address.city;
            }

            if (typeof startPlace.address.town != 'undefined') {
                var start_city = startPlace.address.town;
            }

            if (typeof startPlace.address.village != 'undefined') {
                var start_city = startPlace.address.village;
            }

            if (typeof startPlace.address.hamlet != 'undefined') {
                var start_city = startPlace.address.hamlet;
            }

            if (typeof startPlace.address.county != 'undefined') {
                var start_department = startPlace.address.county;
            }

            if (typeof startPlace.address.postcode != 'undefined') {
                var start_postcode = startPlace.address.postcode;
            }

            if (typeof startPlace.address.road != 'undefined') {
                var start_road = startPlace.address.road;
            }

            if (typeof startPlace.address.house_number != 'undefined') {
                var start_house_number = startPlace.address.house_number;
            }

            //Cas particulier pour Paris, où le département est aussi la ville
            if (start_department === null && start_city === "Paris") {
                var start_department = "Paris";
            }

            //On effectue les mêmes vérifications qu'avec endPlace
            var end_city = null;
            var end_department = null;
            var end_postcode = null;
            var end_road = null;
            var end_house_number = null;

            if (typeof endPlace.address.municipality != 'undefined') {
                var end_city = endPlace.address.municipality;
            }

            if (typeof endPlace.address.city != 'undefined') {
                var end_city = endPlace.address.city;
            }

            if (typeof endPlace.address.town != 'undefined') {
                var end_city = endPlace.address.town;
            }

            if (typeof endPlace.address.village != 'undefined') {
                var end_city = endPlace.address.village;
            }

            if (typeof endPlace.address.hamlet != 'undefined') {
                var end_city = endPlace.address.hamlet;
            }

            if (typeof endPlace.address.county != 'undefined') {
                var end_department = endPlace.address.county;
            }

            if (typeof endPlace.address.postcode != 'undefined') {
                var end_postcode = endPlace.address.postcode;
            }

            if (typeof endPlace.address.road != 'undefined') {
                var end_road = endPlace.address.road;
            }

            if (typeof endPlace.address.house_number != 'undefined') {
                var end_house_number = endPlace.address.house_number;
            }

            if (end_department === null && end_city === "Paris") {
                var end_department = "Paris";
            }

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    max_passenger: numSeats,
                    is_Full: 'false',
                    schedule: startDate + ' ' + startTime,

                    start_place: {
                        city: start_city,
                        department: start_department,
                        postcode: start_postcode,
                        road: start_road,
                        house_number: start_house_number,
                        latitude: startPlace.lat,
                        longitude: startPlace.lon
                    },

                    end_place: {
                        city: end_city,
                        department: end_department,
                        postcode: end_postcode,
                        road: end_road,
                        house_number: end_house_number,
                        latitude: endPlace.lat,
                        longitude: endPlace.lon
                    },

                    comeback: (hasComeback==="avec"),

                    //TODO: Calculer distance et bonus_pollution avant de faire cette requête POST
                    driver: {
                        uid: user.uid
                    }

                })

            };

            let apiSuccess;
            fetch('http://localhost:8080/carshare', options)
                .then((res) => {
                    if (!res.ok) throw new Error('La réponse du serveur indique un échec.');
                    return res.json(); // ou res.text() si la réponse n'est pas en JSON
                })
                .then((data) => {
                    // La requête a réussi, gestion du succès
                    openSnackbar('Votre covoiturage est en ligne !', 'success');
                    setStartPlace('');
                    setStartName('');
                    setEndPlace('');
                    setEndName('');
                    setStartDate('');
                    setStartTime('');
                    setNumSeats('1');
                    setHasComeback("sans");
                    // Réinitialisation des champs du formulaire ici
                })
                .catch((error) => {
                    // La requête a échoué, gestion de l'échec
                    openSnackbar('La création du covoiturage a échoué.', 'error');
                });
        }
    }

    return (user &&
        <div className="creation-form">
            <p className="center" style={{ marginBottom: "20px" }}><strong style={{ fontSize: "25px" }}>Planifier un trajet</strong></p>

            <label> Lieu de départ :
                <AutocompleteInput value={startName} onChange={setStartName} placeholder="Entrez l'adresse de départ" setOutput={setStartPlace} />
                
            </label>

            <label> Lieu d'arrivée :
                <AutocompleteInput value={endName} onChange={setEndName} placeholder="Entrez l'adresse d'arrivée" setOutput={setEndPlace} />
            </label>

            <br></br>
            <label style={{ marginBottom: "20px" }}> Date et heure de départ :<br></br>
                            <input width="20%" type="date" name="dateStart" value={startDate} onChange={e => setStartDate(e.target.value)} />
                            <input type="time" name="timeStart" value={startTime} onChange={e => setStartTime(e.target.value)} />
            </label>

            <div>
                <select id="comeback" value={hasComeback} onChange={e => setHasComeback(e.target.value)}>
                    <option value={"sans"}>Sans aller-retour</option>
                    <option value={"avec"}>Avec aller-retour</option>
                </select>
            </div>
            <label style={{ marginTop:"10px" }}> Nombre de places :
                <input className="center-picture" type="number" name="seats" min="1" max="10" value={numSeats} onChange={e => setNumSeats(e.target.value)} style={{ width: "20%" }} />
            </label>


            <button className="btn" onClick={handleCreateClick}>
                <strong style={{ fontSize: "15px", padding: "5px" }}>Proposer le covoiturage</strong>
            </button>
        </div>

    );

};

export default CarshareCreation



