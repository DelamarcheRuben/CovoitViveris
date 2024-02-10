import React from "react";
import { useState, useEffect } from 'react';
import { useUser } from "../../context/UserContext";

const Carsharecreation = () => {
    const [startPlace, setStartPlace] = useState('');
    const [endPlace, setEndPlace] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [numSeats, setNumSeats] = useState(1);
    const [message, setMessage] = useState('');

    const { user } = useUser();

    const handleCreateClick = () => {

            if (startPlace === '' || endPlace === '' || startDate === '' || startTime === '') {
                setMessage("Certains champs n'ont pas été remplis");
            }
            else {

                //TODO: Changer cette requête pour qu'elle fonctionne. En l'état le serveur affiche l'erreur suivante :
                //WARN 9416 --- [nio-8080-exec-7] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [org.springframework.web.HttpMediaTypeNotSupportedException: Content-Type 'text/plain;charset=UTF-8' is not supported]
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        max_passenger:  numSeats ,
                        is_Full: 'false',
                        schedule: ( startDate  + " " +  startTime ),
                        start_place:  startPlace ,
                        end_place:  endPlace ,
                        //TODO: Calculer distance et bonus_polution avant de faire cette requête POST
                        UID_driver: user.uid 
                    })
                };
                fetch('http://localhost:8080/carshare', options).then((res) => { });
                
                //Réinitialise la page en mesure temporaire tant que la gestion de la requête n'est pas finie
                //Il faut récupérer le résultat de la requête puis rediriger l'utilisateur en fonction du résultat
                setMessage("Requête de création de covoiturage envoyée");
                setStartPlace('');
                setEndPlace('');
                setStartDate('');
                setNumSeats('1');
                
            }
    }

    return (
           <React.Fragment>
            {window.innerWidth < 1105 && user &&
                //TODO: Gestion de la version mobile du site. Pour l'instant seule la version ordi a été écrite
                <div className="small-screen">
                    <p className="center" style={{ marginBottom: "20px" }}>Placeholder version mobile </p>
                </div>}
            {window.innerWidth >= 1105 && user &&
                <div className="large-screen">
                    <p className="center" style={{ marginBottom: "20px" }}>{message} </p>
                    <p className="center" style={{ marginBottom: "20px" }}><strong style={{ fontSize: "25px" }}>Proposer un trajet</strong> </p>
                    <div className="scheduling-form" style={{ boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)", padding: "5%", width: "70%", marginLeft: "15%" }}>

                        <label style={{ marginBottom: "20px" }}> Lieu de départ :<br></br>
                            <input className="input-stylish" type="text" name="start" value={startPlace} onChange={e => setStartPlace(e.target.value)} />
                        </label>
                        <br></br>
                        <label style={{ marginBottom: "20px" }}> Lieu d'arrivée :<br></br>
                            <input className="input-stylish" type="text" name="end" value={endPlace} onChange={e => setEndPlace(e.target.value)} />
                        </label>
                        <br></br>
                        <label style={{ marginBottom: "20px" }}> Date et heure de départ :<br></br>
                            <input type="date" name="dateStart" value={startDate} onChange={e => setStartDate(e.target.value)} />
                            <input type="time" name="timeStart" value={startTime} onChange={e => setStartTime(e.target.value)} />
                        </label>
                        <br></br>
                        <label style={{ width: "70%", marginBottom: "30px" }}> Nombre de places :<br></br>
                            <input className="input-stylish" type="number" name="seats" min="1" max="10" value={numSeats} onChange={e => setNumSeats(e.target.value)} style={{ width: "10%" }} />
                        </label>
                        <div>
                            <button className="btn" onClick={handleCreateClick}>
                                <strong style={{ fontSize: "15px", padding: "5px" }}>Je propose un trajet</strong>
                        </button>
                        </div>
                    </div>
                </div>}

        </React.Fragment>
    );

};

export default Carsharecreation



