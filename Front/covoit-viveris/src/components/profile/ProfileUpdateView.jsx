import React, { useState, useEffect }  from "react";
import { useNavigate  } from "react-router-dom";
import { useUser }        from "../../context/UserContext.jsx";
import { useWindowWidth } from "../../context/WindowWidthContext.jsx";
import CheckIcon from '@mui/icons-material/Check';
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

export function ProfileUpdateView(){

    const navigate = useNavigate();
    const windowWidth = useWindowWidth();
    const { user, updateUser } = useUser();

    const co2Emissioncar = () => {
        let val = 135;

        if(user.car_type == "Citadine - Diesel"){
            val = 115;
        }
        else if(user.car_type == "Familiale - Essence"){
            val = 160;
        }
        else if(user.car_type == "Familiale - Diesel"){
            val = 140;
        }
        else if(user.car_type == "Sportive - Essence"){
            val = 210;
        }
        else if(user.car_type == "Sportive - Diesel"){
            val = 190;
        }
        else if(user.car_type == "Electrique/Hybride"){
            val = 50;
        }
        return val;
    };

    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [job, setJob] = useState(user.job);
    const [address, setAddress] = useState(user.address.houseRoad+", "+user.address.cityPostcode);
    const [addressPlace, setAddressPlace] = useState(null);
    const [carType, setCarType] = useState(co2Emissioncar() + "|" + user.car_type);
    const [co2Emission, setCo2Emission] = useState(co2Emissioncar());
    const [pictureBackground, setPictureBackground] = useState(user.picture_background);
    const [pictureProfile, setPictureProfile] = useState(user.picture_profile);
    const [company, setCompany] = useState(user.company.uid + "|" + user.company.name);
    const { openSnackbar } = useSnackbar();

    const handleCreateClick = () => {

        if (!address || firstName == '' || lastName == '' || job == '') {
            openSnackbar('Certains champs sont erronés', 'error');
            console.log("snackbar champ erronés")
            return;
        } else {
            

            //Vérification des champs à envoyer qui existent dans ce qui a été reçu par la requête à nominatim
            var city         = null;
            var department   = null;
            var postcode     = null;
            var road         = null;
            var house_number = null;
            var latitude     = null;
            var longitude    = null;

            if(addressPlace == null){
                city         = user.address.city;
                department   = user.address.department;
                postcode     = user.address.postcode;
                road         = user.address.road;
                house_number = user.address.house_number;
                latitude     = user.address.latitude;
                longitude    = user.address.longitude;
            }
            else{
                //Vérification des différents types d'agglomérations dans l'ordre décroissant de taille
                if (typeof addressPlace.address.municipality != 'undefined') {
                    var city = addressPlace.address.municipality;
                }

                if (typeof addressPlace.address.city != 'undefined') {
                    var city = addressPlace.address.city;
                }

                if (typeof addressPlace.address.town != 'undefined') {
                    var city = addressPlace.address.town;
                }

                if (typeof addressPlace.address.village != 'undefined') {
                    var city = addressPlace.address.village;
                }

                if (typeof addressPlace.address.hamlet != 'undefined') {
                    var city = addressPlace.address.hamlet;
                }

                if (typeof addressPlace.address.county != 'undefined') {
                    var department = addressPlace.address.county;
                }

                if (typeof addressPlace.address.postcode != 'undefined') {
                    var postcode = addressPlace.address.postcode;
                }

                if (typeof addressPlace.address.road != 'undefined') {
                    var road = addressPlace.address.road;
                }

                if (typeof addressPlace.address.house_number != 'undefined') {
                    var house_number = addressPlace.address.house_number;
                }

                //Cas particulier pour Paris, où le département est aussi la ville
                if (department === null && start_city === "Paris") {
                    var department = "Paris";
                }

                latitude  = addressPlace.lat;
                longitude = addressPlace.lon;
            }

            

            let car  = carType.split("|")[1];
            let comp = company.split("|");

            var userDetails = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    job: job,
                    address: {
                        city: city,
                        department: department,
                        postcode: postcode,
                        road: road,
                        house_number: house_number,
                        latitude: latitude,
                        longitude: longitude
                    }, 
                    car_type: car,
                    picture_background: pictureBackground,
                    picture_profile: pictureProfile,
                    company:{
                        uid: parseInt(comp[0]),
                        name: comp[1]
                    }
                })
            };

            fetch("http://localhost:8080/user/" + user.uid, userDetails)
            .then((res) => {
                if (!res.ok){
                    throw new Error ("La validation des informations a échoué. Veuillez réessayer");
                    openSnackbar('La validation des informations s\'est perdue en chemin. Réessayez', 'error')
                }
                openSnackbar('Votre profil a été modifié !', 'success', );

                fetch("http://localhost:8080/user/"+user.uid)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    updateUser(data);
                });
            });
        }
    }

    const handleSelectCarTypeChange = (e) => {
        const co2Emission = e.target.value.split('|');
        setCo2Emission(co2Emission[0]);
        setCarType(e.target.value);
    };



    return (user &&
        <div className="creation-form">

            <label> Prénom :
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Entrez votre prénom"/>
            </label>

            <label> Nom de famille :
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Entrez votre nom de famille"/>
            </label>

            <label> Métier :
                <input type="text" value={job} onChange={e => setJob(e.target.value)} placeholder="Entrez votre métier"/>
            </label>

            <label> Adresse :
                <AutocompleteInput value={address} onChange={setAddress} placeholder="Entrez votre adresse" setOutput={setAddressPlace} />
            </label>

            <div className="row" style={{ marginTop:"20px" }}>
                <div className="col">
                    <label> Type de voiture :
                        <select id="background" value={carType} onChange={handleSelectCarTypeChange}>
                            <option value={"135|Citadine - Essence"}>Citadine - Essence</option>
                            <option value={"115|Citadine - Diesel"}>Citadine - Diesel</option>
                            <option value={"160|Familiale - Essence"}>Familiale - Essence</option>
                            <option value={"140|Familiale - Diesel"}>Familiale - Diesel</option>
                            <option value={"210|Sportive - Essence"}>Sportive - Essence</option>
                            <option value={"190|Sportive - Diesel"}>Sportive - Diesel</option>
                            <option value={"50|Electrique/Hybride"}>Electrique/Hybride</option>
                        </select>
                    </label>
                </div>
                <div className="col" style={{ maxWidth:"150px" }}>
                    <label> CO2 estimé :
                        <input type="text" value={co2Emission + " g/km"} disabled style={{ maxWidth:"100px" }}/>
                    </label>
                </div>
            </div>

            <label> Thème utilisateur :
                <select id="background" value={pictureBackground} onChange={e => setPictureBackground(e.target.value)}>
                    <option value={"land"}>Campagne</option>
                    <option value={"desert"}>Désert</option>
                    <option value={"forest"}>Forêt</option>
                    <option value={"sky"}>Horizon</option>
                    <option value={"mountain"}>Montagne</option>
                </select>
            </label>

            <img className="center-picture" src={`../../src/images/background_profile/background_${pictureBackground}.png`} alt="Thème de l'utilisateur" style={{ width: "100%", marginTop: "-10px" }}/>

            <div className="row" style={{ marginTop:"20px" }}>
                <div className="col">
                    <label> Avatar utilisateur :
                        <select id="background" value={pictureProfile} onChange={e => setPictureProfile(e.target.value)}>
                            <option value={"1"}>1</option>
                            <option value={"2"}>2</option>
                            <option value={"3"}>3</option>
                            <option value={"4"}>4</option>
                            <option value={"5"}>5</option>
                        </select>
                    </label>
                </div>
                <div className="col">
                    <img className="center-picture" src={`../../src/images/profil_picture_${pictureProfile}.png`} alt="Thème de l'utilisateur" style={{ width: "100%", marginTop: "-10px" }}/>
                </div>
            </div>
            
            <div className="row" style={{ marginTop:"20px" }}>
                <div className="col">
                    <label> Entreprise :
                        <select id="company" value={company} onChange={e => setCompany(e.target.value)}>
                            <option value={"1|viveris"}>Viveris</option>
                        </select>
                    </label>
                </div>
                <div className="col">
                    <img className="center-picture" src={`../../src/images/logo/logo_${company.split('|')[1]}_full.png`} alt="Logo entreprise" style={{ width: "100%", marginTop: "-10px" }}/>
                </div>
            </div>



            <button className="btn" onClick={handleCreateClick}>
                <strong style={{ fontSize: "15px", padding: "5px" }}>Valider informations</strong>
            </button>
        </div>

    );

};
