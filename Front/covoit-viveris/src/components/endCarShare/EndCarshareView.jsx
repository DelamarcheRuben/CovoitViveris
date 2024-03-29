import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import { useUser }        from "../../context/UserContext.jsx";
import { useWindowWidth } from "../../context/WindowWidthContext.jsx";
import * as levels     from "../../functions/levels.js";
import * as economyCO2     from "../../functions/economyCO2.js";
import * as time     from "../../functions/time.js";
import * as updateBadge     from "../../functions/updateBadge.js";
import {useSnackbar} from "../../context/SnackbarContext.jsx";
import {type} from "../../functions/economyCO2.js";
export function EndCarshareView(){

    const { user, updateUser } = useUser();
    const { openSnackbar } = useSnackbar();
    const windowWidth = useWindowWidth();
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    const location = useLocation();
    const [carshareId, setCarshareId] = useState('');

    var participates = null;

    const updateParticipationInfo = (challengeId, newValue) => {
        const participateToUpdate = participates.find(p => p.challenge.uid === challengeId);

        if (!participateToUpdate) {
            console.error("Aucune participation trouvée pour le challenge " + challengeId);
            return;
        }

        // Préparation des données à mettre à jour selon l'uid du challenge
        let updatedFields = {};
        switch (challengeId) {
            case 1:
                updatedFields = { kilometers: newValue };
                break;
            case 2:
                updatedFields = { different_passengers: newValue };
                break;
            case 3:
                updatedFields = { completed_rides: newValue };
                break;
            case 4:
                updatedFields = { co2_economy: newValue };
                break;
            case 5:
                updatedFields = { kilometers: newValue };
            default:
                console.error("Challenge non reconnu pour la mise à jour");
                return;
        }

        // Appel de l'API pour mettre à jour la participation
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedFields)
        };

        fetch(`http://localhost:8080/participate?challenge=${challengeId}&user=${user.uid}`, requestOptions)
            .then(response => response.ok ? response.json() : Promise.reject(`Erreur: ${response.statusText} (code: ${response.status})`))
            .then(data => {
                console.log(`Participation au challenge ${challengeId} mise à jour avec succès`, data);
                openSnackbar('Un de vos challenges a été mis à jour', 'success', {
                    label: 'Voir',
                    onClick: () => navigate('/challenge-details'),
                });
            })
            .catch(error => {
                openSnackbar('Erreur lors de la mise à jour d\'un de vos challenges', 'error');
                console.error("Erreur lors de la mise à jour de la participation", error);
            });
    };

    useEffect(() => {
        const setUserParticipates = async () => {
            try{
                const response = await fetch(`http://localhost:8080/participates?id_user=${user.uid}`);
                if (!response.ok) throw new Error('Les participations n\'ont pas pu être récupéré');
                var dataFetched = await response.json();
                participates = dataFetched;
            } catch(error) {
                console.error("Erreur lors de la récupération des données de la table 'Participate' : ", error);
            }
        }
        setUserParticipates();
    })

    useEffect(() => {
        const id = location.state?.idCarshare;
        if (id) {
            setCarshareId(id);
        }
    }, [location]);

    useEffect(() => {
        if (!carshareId) return; // Ne rien faire si carshareId n'est pas défini

        const fetchCarshare = async () => {
            try {
                const response = await fetch(`http://localhost:8080/carshare/${carshareId}`);
                if (!response.ok) throw new Error('Le covoiturage n’a pas pu être récupéré');
                var data_json = await response.json();
                var isValidated=false;
                if(user.uid===data_json.driver.uid){
                    isValidated = data_json.has_validated;
                }
                else{
                    const response = await fetch("http://localhost:8080/passenger?carshare="+carshareId+"&user="+user.uid);
                    if (!response.ok) throw new Error('Le covoiturage n’a pas pu être récupéré');
                    const reponse_valid_passenger = await response.json();
                    isValidated = reponse_valid_passenger.has_validated;
                }

                if(isValidated){
                    navigate("/home");
                }
                else
                {
                    const response_nb_passengers = await fetch("http://localhost:8080/passengers?id_carshare="+carshareId);
                    if (!response_nb_passengers.ok) throw new Error('Le covoiturage n’a pas pu être récupéré');
                    var nbPassengers = await response_nb_passengers.json();
                    nbPassengers = nbPassengers.length;
                    var economy = economyCO2.calcul_economy(data_json.distance, nbPassengers, data_json.driver.car_type);
                    economy = economy.toPrecision(3)/1000.0;
                    const time_carshare = new time.Time(0, Math.round(data_json.distance+10)); //temps du carshare en minutes (formule : temps = distance en km+10)
                    var endHour = new time.Time(parseInt(data_json.schedule.substring(11,13)), parseInt(data_json.schedule.substring(14,16)));
                    endHour.addMinutes(time_carshare.getTotalMinutes());
                    const carshare_user = {day:data_json.schedule.substring(0, 10), startHour:data_json.schedule.substring(11,16),
                        endHour:endHour.toString(), carShareTime:time_carshare.toString(), startLocation:data_json.start_place.city, endLocation:data_json.end_place.city,
                        co2Saved:economy, level:user.level, experience:user.experience, nbPeople:nbPassengers};
                    const bonus = {bonusStreak:1, bonusPollution:data_json.bonus_pollution, bonusDay: 1};
                    var nbPeople;
                    if(user.uid===data_json.driver.uid) nbPeople = nbPassengers;
                    else nbPeople=1; //si passager alors on ne gagne pas autant d'xp qu'un conducteur
                    const experience_earned = levels.calculate_experience_carShare(nbPeople, bonus.bonusStreak, bonus.bonusPollution, bonus.bonusDay);
                    const level_up  = levels.level_up(carshare_user.level, carshare_user.experience, experience_earned, 0);
                    const level_end = carshare_user.level + level_up;
                    const experience_end = levels.experience_user_end_carShare(carshare_user.level, carshare_user.experience, experience_earned);

                    setData({carShare:carshare_user, bonus:bonus, experience_earned:experience_earned,
                        level_up:level_up, level_end:level_end, experience_end:experience_end});

                    var user_copy = JSON.parse(JSON.stringify(user));

                    user_copy.level = level_end;user_copy.experience=experience_end;user_copy.co2_economy=(user_copy.co2_economy)+economy;
                    user_copy.kilometers=user_copy.kilometers+data_json.distance;user_copy.nb_carshares=user_copy.nb_carshares+1;
                    updateUser(user_copy);
                    var update_user = {uid:user.uid, level:level_end, experience:experience_end,
                        co2_economy: (user.co2_economy)+economy, kilometers:user.kilometers+data_json.distance, nb_carshares:user.nb_carshares+1};

                    var options = {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(update_user)
                    };

                    await fetch("http://localhost:8080/user/"+user.uid, options)

                    if(user.uid===data_json.driver.uid)
                    {
                        var update_carshare = {has_validated : true, co2_economy:economy, experience:experience_earned};
                        var options = {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(update_carshare)
                        };
                        fetch("http://localhost:8080/carshare/"+carshareId, options)
                        .then((res) => {
                        })
                    }
                    else
                    {
                        var update_passenger = {has_validated : true, experience:experience_earned};
                        var options = {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(update_passenger)
                        };
                        fetch("http://localhost:8080/passenger?carshare="+carshareId+"&user="+user.uid, options)
                        .then((res) => {
                        })
                    }
                    //on récupere dans 'participations' les participations de l'utilisateur


                    // Pour chaque participation, on met à jour son avancée avec les données
                    // nouvellement acquise de la fin de son covoiturage.
                    // Si le user ne participe pas à certains challenge, ça affichera un message dans la console.
                    // donc on update les informations de participation de tous les challenges.
                    updateParticipationInfo(1, data_json.distance);
                    //updateParticipationInfo(2, nb_differents_person); // Recup les infos via la route de Ruben
                    //updateParticipationInfo(3, completed_rides); // Recup les infos via la route de Ruben
                    updateParticipationInfo(4, economy);
                    updateParticipationInfo(5, data_json.distance);


                    await updateBadge.updateLevelBadge(user.uid, 0);

                    // calcul xp a faire
                    /*participates.forEach(element => {
                        if(element.has_completed === true) {
                            const level_up = levels.level_up(user.level, user.experience, element.challenge.bonus_exp, 0);
                            const level_end = user.level + level_up;
                            const experience_end = levels.experience_user_end_carShare(user.level, user.experience, element.challenge.bonus_exp);
                            var update_user = {uid:user.uid, level:level_end, experience:experience_end};

                            var options = {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(update_user)
                            };

                            fetch("http://localhost:8080/user/"+user.uid, options)
                                .then((res) => {})
                        }
                    }); */
                }

            } catch (error) {
                console.error("Erreur lors de la récupération du covoiturage :", error);
                navigate("/home");
            }
        };

        fetchCarshare();

    }, [carshareId, participates]);

    const handleClickRanking = () => {
        navigate('/ranking');
    };

    if (!data) {
        return <div>Chargement...</div>;
    }

    return (
        <React.Fragment>
            {windowWidth < 1105 && data && user &&
                <div className="endCarShare-background" style={{ minHeight:"1200px"}}>
                    <p className="center"><strong style={{ fontSize:"30px" }}>Félicitations !</strong></p>
                    <div className="center-picture" style={{ maxWidth:"300px" }}>
                        <div className="auth-horizontal-line-small" style={{ marginLeft:"75px" }}></div>
                    </div>
                    <p className="center" style={{ marginTop:"15px" }}>On espère que votre covoiturage s’est bien déroulé. <br></br>Voici un récapitulatif :</p>
                    <div className="carShare-travel-info" style={{ maxWidth:"350px" }}>
                        <p style={{ padding:"15px" }}><strong>{data.carShare.day}</strong></p>
                        <div className="col" style={{ padding: "5px"}}>
                            <div className="row center-div-picture">
                                <div className="col" style={{ display:"flex", maxWidth:"70px" }}>
                                    <p><strong>{data.carShare.startHour}</strong></p>
                                </div>
                                <div className="col" style={{ display:"flex", justifyContent:"right", maxWidth:"100px"}}>
                                    <div className="carshare-circle"></div>
                                </div>
                                <div className="col">
                                    <p style={{ fontSize:"15px" }}>{data.carShare.startLocation.city}</p>
                                </div>
                            </div>
                            <div className="row center-div-picture">
                                <div className="col" style={{ display:"flex", maxWidth:"70px", marginTop:"-15px" }}>
                                    <i style={{ fontSize:"14px" }}>{data.carShare.carShareTime}</i>
                                </div>
                                <div className="col" style={{ display:"flex", justifyContent:"right", maxWidth:"100px", marginTop:"-2px"}}>
                                    <div className="line"></div>
                                </div>
                                <div className="col">
                                </div>
                            </div>
                            <div className="row center-div-picture" >
                                <div className="col" style={{ display:"flex", maxWidth:"70px" }}>
                                    <p><strong>{data.carShare.endHour}</strong></p>
                                </div>
                                <div className="col" style={{ display:"flex", justifyContent:"right", maxWidth:"100px"}}>
                                    <div className="carshare-circle"></div>
                                </div>
                                <div className="col">
                                    <p style={{ fontSize:"15px" }}>{data.carShare.endLocation.city}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carShare-co2-saved" style={{ maxWidth:"350px" }}>
                        <div className="row">
                            <div className="col center" style={{ marginTop:"10px" }}>
                                <p><strong style={{ fontSize:"25px" }}>{data.carShare.co2Saved.toPrecision(3)/1000}kg CO<sub>2</sub> économisés</strong></p>
                            </div>
                            <div className="col" style={{ maxWidth:"150px", paddingRight:"50px", marginTop:"10px" }}>
                                <img className="center-picture" src={`../src/images/co2/co2_vert.png`} alt="Image CO2" width="80%"/>
                            </div>
                        </div>
                    </div>
                    <div className="carShare-experience" style={{ maxWidth:"350px" }}>
                        <div className="row" style={{ margin:"20px", paddingTop:"10px" }}>
                            <div className="col" style={{ marginLeft:"25px", maxWidth:"120px" }}>
                                <p style={{ fontSize:"25px" }}>{10 + data.carShare.nbPeople * 2}XP</p>
                            </div>
                            <div className="col center">
                                <p>accumulés pendant ce covoiturage</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col center" style={{ marginLeft:"35px", maxWidth:"120px" }}>
                                <p><strong style={{ fontSize:"25px" }}>x{data.bonus.bonusStreak}</strong></p>
                            </div>
                            <div className="col center">
                                <p>série journalière</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col center" style={{ marginLeft:"35px", maxWidth:"120px" }}>
                                <p><strong style={{ fontSize:"25px" }}>x{data.bonus.bonusDay}</strong></p>
                            </div>
                            <div className="col center">
                                <p>bonus du jour</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col center" style={{ marginLeft:"35px", maxWidth:"120px" }}>
                                <p><strong style={{ fontSize:"25px" }}>x{data.bonus.bonusPollution}</strong></p>
                            </div>
                            <div className="col center">
                                <p>bonus pollution</p>
                            </div>
                        </div>
                        <p className="center" style={{ marginTop:"10px" }}><strong>+{data.experience_earned} points d'expériences gagnés</strong></p>
                        <div className="profile-progress-bar center-picture" style={{ marginTop: "10px", width: "75%" }}>
                            {data.level_up > 0
                                ? <div className="profile-progress" style={{ background: `linear-gradient(to right, #fc948c 0%, #fc948c ${data.experience_end / levels.level_experience(data.level_end) * 100}%, white ${data.experience_end / levels.level_experience(data.level_end) * 100}%, white 100%)` }}></div>
                                : <div className="profile-progress" style={{ background: `linear-gradient(to right, #ff5046 0%, #ff5046 ${data.carShare.experience / levels.level_experience(data.carShare.level) * 100}%, #fc948c ${data.carShare.experience / levels.level_experience(data.carShare.level) * 100}%, #fc948c ${(data.carShare.experience + data.experience_earned) / levels.level_experience(data.carShare.level) * 100}%, white ${(data.carShare.experience + data.experience_earned) / levels.level_experience(data.carShare.level) * 100}%, white 100%)` }}></div>
                            }
                        </div>
                        <div className="row" style={{ marginTop:"10px" }}>
                            <div className="col" style={{ justifyContent:"right", display:"grid", paddingRight:"0", marginTop:"-2px" }}>
                                <div className="center-picture circle-experience">
                                    <p className="center color-company"><strong style={{ fontSize:"22px" }}>{data.carShare.level + data.level_up}</strong></p>
                                </div>
                            </div>
                            <div className="col">
                                <p><strong className="color-company" style={{ fontSize:"20px" }}>+ {data.level_up}</strong></p>
                            </div>
                        </div>
                    </div>
                    <button className="btn center-div-picture" onClick={handleClickRanking} style={{ width: "350px", marginTop:"15px", fontSize:"25px" }}>Voir mon classement</button> <br></br>

                </div>
            }

            {windowWidth >= 1105 && data &&
                <div className="endCarShare-background" style={{ minHeight:"1200px"}}>
                    <p className="center"><strong style={{ fontSize:"30px" }}>Félicitations !</strong></p>
                    <div className="center-picture" style={{ maxWidth:"300px" }}>
                        <div className="auth-horizontal-line-small" style={{ marginLeft:"75px" }}></div>
                    </div>
                    <p className="center" style={{ marginTop:"15px" }}>On espère que votre covoiturage s’est bien déroulé. <br></br>Voici un récapitulatif :</p>
                    <div className="carShare-travel-info">
                        <p style={{ padding:"15px" }}><strong>{data.carShare.day}</strong></p>
                        <div className="col" style={{ padding: "10px"}}>
                            <div className="row center-div-picture">
                                <div className="col" style={{ display:"flex", maxWidth:"100px" }}>
                                    <p><strong>{data.carShare.startHour}</strong></p>
                                </div>
                                <div className="col" style={{ display:"flex", justifyContent:"right", maxWidth:"100px"}}>
                                    <div className="carshare-circle"></div>
                                </div>
                                <div className="col">
                                    <p>{data.carShare.startLocation}</p>
                                </div>
                            </div>
                            <div className="row center-div-picture">
                                <div className="col" style={{ display:"flex", maxWidth:"100px", marginTop:"-15px" }}>
                                    <i style={{ fontSize:"14px" }}>{data.carShare.carShareTime}</i>
                                </div>
                                <div className="col" style={{ display:"flex", justifyContent:"right", maxWidth:"100px", marginTop:"-2px"}}>
                                    <div className="line"></div>
                                </div>
                                <div className="col">
                                </div>
                            </div>
                            <div className="row center-div-picture" >
                                <div className="col" style={{ display:"flex", maxWidth:"100px" }}>
                                    <p><strong>{data.carShare.endHour}</strong></p>
                                </div>
                                <div className="col" style={{ display:"flex", justifyContent:"right", maxWidth:"100px"}}>
                                    <div className="carshare-circle"></div>
                                </div>
                                <div className="col">
                                    <p>{data.carShare.endLocation}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carShare-co2-saved">
                        <div className="row">
                            <div className="col center" style={{ marginTop:"10px" }}>
                                <p><strong style={{ fontSize:"25px" }}>{data.carShare.co2Saved}kg CO<sub>2</sub> économisés</strong></p>
                            </div>
                            <div className="col" style={{ maxWidth:"150px", paddingRight:"50px", marginTop:"10px" }}>
                                <img className="center-picture" src={`../src/images/co2/co2_vert.png`} alt="Image CO2" width="90%"/>
                            </div>
                        </div>
                    </div>
                    <div className="carShare-experience">
                        <div className="row" style={{ margin:"20px", paddingTop:"10px" }}>
                            <div className="col" style={{ marginLeft:"40px" }}>
                                <p style={{ fontSize:"25px" }}>{10 + data.carShare.nbPeople * 2}XP</p>
                            </div>
                            <div className="col center">
                                <p>accumulés pendant ce covoiturage</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col center">
                                <p><strong style={{ fontSize:"25px" }}>x{data.bonus.bonusStreak}</strong></p>
                            </div>
                            <div className="col center">
                                <p>série journalière</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col center">
                                <p><strong style={{ fontSize:"25px" }}>x{data.bonus.bonusDay}</strong></p>
                            </div>
                            <div className="col center">
                                <p>bonus du jour</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col center">
                                <p><strong style={{ fontSize:"25px" }}>x{data.bonus.bonusPollution}</strong></p>
                            </div>
                            <div className="col center">
                                <p>bonus pollution</p>
                            </div>
                        </div>
                        <p className="center" style={{ marginTop:"10px" }}><strong>+{data.experience_earned} points d'expériences gagnés</strong></p>
                        <div className="profile-progress-bar center-picture" style={{ marginTop: "10px", width: "75%" }}>
                            {levels.increase_level(data.carShare.level, data.carShare.experience, levels.calculate_experience_carShare(data.carShare.nbPeople, data.bonus.bonusStreak, data.bonus.bonusPollution, data.bonus.bonusDay)) === true
                                ? <div className="profile-progress" style={{ background: `linear-gradient(to right, #fc948c 0%, #fc948c ${data.experience_end / levels.level_experience(data.level_end) * 100}%, white ${data.experience_end / levels.level_experience(data.level_end) * 100}%, white 100%)` }}></div>
                                : <div className="profile-progress" style={{ background: `linear-gradient(to right, #ff5046 0%, #ff5046 ${data.carShare.experience / levels.level_experience(data.carShare.level) * 100}%, #fc948c ${data.carShare.experience / levels.level_experience(data.carShare.level) * 100}%, #fc948c ${(data.carShare.experience + data.experience_earned) / levels.level_experience(data.carShare.level) * 100}%, white ${(data.carShare.experience + data.experience_earned) / levels.level_experience(data.carShare.level) * 100}%, white 100%)` }}></div>
                            }
                        </div>
                        <div className="row" style={{ marginTop:"10px" }}>
                            <div className="col" style={{ justifyContent:"right", display:"grid", paddingRight:"0", marginTop:"-2px" }}>
                                <div className="center-picture circle-experience">
                                    <p className="center color-company"><strong style={{ fontSize:"22px" }}>{data.carShare.level + data.level_up}</strong></p>
                                </div>
                            </div>
                            <div className="col">
                                <p><strong className="color-company" style={{ fontSize:"20px" }}>+ {data.level_up}</strong></p>
                            </div>
                        </div>
                    </div>
                    <button className="btn center-div-picture" onClick={handleClickRanking} style={{ width: "440px", marginTop:"15px", fontSize:"25px" }}>Voir mon classement</button> <br></br>

                </div>
            }
        </React.Fragment>
    );
}