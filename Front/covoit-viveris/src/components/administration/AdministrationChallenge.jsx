import React, { useState } from "react";
import { useUser }         from "../../context/UserContext";
import { useWindowWidth }  from "../../context/WindowWidthContext";

const AdministrationChallenge = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [goal, setGoal] = useState(0);
    const [type, setType] = useState('empty');
    const [bonus_exp, setBonusExp] = useState(10);
    const [end_date, setEndDate] = useState('');
    const [message, setMessage] = useState('');

    const handleCreateClick = () => {

        if (name === '' || description === '' || goal === '' || type === '' || end_date === '') {
            setMessage("Certains champs n'ont pas été remplis");
        }
        else {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name:name,
                    description:description,
                    goal:goal,
                    bonus_exp:bonus_exp,
                    expired_date:end_date + " 00:00",
                    type:type
                })
            };

            fetch('http://localhost:8080/challenge', options).then((res) => { });
            
            setMessage("Requête de création de covoiturage envoyée");
            setName("");
            setDescription('');
            setGoal(0);
            setType('empty');
            setBonusExp(10);
            setEndDate('');
            
        }
}
    return(
        <React.Fragment>

            <p className="center" style={{ marginBottom: "20px" }}>{message} </p>

            <div className="form_challenge" style={{display:"flex", flexDirection:"column"}}>
                <label htmlFor="name">Nom du challenge : <input id="name" value={name} onChange={e => setName(e.target.value)}></input></label>
                
                <label htmlFor="descr">Description : <input id="descr" value={description} onChange={e => setDescription(e.target.value)}></input></label>

                <label htmlFor="goal">Objectif : <input id="goal" type="number" min="0" value={goal} onChange={e => setGoal(e.target.value)}></input></label>

                <select id="typeChallenge" value={type} onChange={e => setType(e.target.value)}>
                    <option value="empty"></option>
                    <option value="nbCarshares">Nombre de covoiturages</option>
                    <option value="nbKilometres">Nombre de kilomètres</option>
                    <option value="nbPassengers">Nombre de passagers différents</option>
                    <option value="nbDayStreak">Nombre de jours consécutifs</option>
                    <option value="nbCo2">Quantité de CO2 économisé</option>
                </select>

                <label htmlFor="exp">Expérience bonus : <input id="exp" type="number" min="10" value={bonus_exp} onChange={e => setBonusExp(e.target.value)}></input></label>

                <label htmlFor="end_date">Date de fin : <input id="end_date" type="date" min={new Date().toISOString().split("T")[0]} value={end_date} onChange={e => setEndDate(e.target.value)}></input></label>

                <button onClick={handleCreateClick}>Créer le challenge</button>
            </div>
        </React.Fragment>
    )
};

export default AdministrationChallenge