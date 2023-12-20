import React from 'react';
import '../styles/carShareList.css';

function selectCarShare(name, time)
{
    alert(`You're gonna car share with ${name} for ${time} minutes.`);
}

function CarShareList()
{
    const carshare = [
        {name:"Jean", time:"10", isBest:false},
        {name:"Jacques", time:"7", isBest:false},
        {name:"Paul", time:"14", isBest:true},
        {name:"Jeanne", time:"12", isBest:false},
        {name:"Jacques", time:"23", isBest:false}
    ]
    return (<div className="carShareList">
    <h2>Liste des covoiturages</h2>
    <select className="selectCarShareList">
        {
            carshare.reduce((names, currentValue) => names.includes(currentValue) ? names : names.concat(currentValue), []).map(
                function(o, i){return <option value={o.name} key={o.name + "-" + i}>{o.name}</option>}
            )

        }
    </select>
    <ul>
        {
            carshare.map(function(o, i){
                return <li className="carShare" onClick={() => selectCarShare(o.name, o.time)} 
                key={o.name + "-" + i}>{o.name + " : " + o.time}{o.isBest ? "🔥" : null}</li>
            })
        }
    </ul>
    </div>
    );
}

export default CarShareList