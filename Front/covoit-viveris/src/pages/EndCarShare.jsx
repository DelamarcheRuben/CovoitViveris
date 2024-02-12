import React, { useState, useEffect } from 'react';
import { Navbar } from "../components/header/Navbar";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import * as levels from "../functions/levels";


const EndCarShare = () => {
  const id_carshare = 1;
  const navigate = useNavigate();
  const { user } = useUser();
  const [data, setData] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/carshare/"+id_carshare)
    .then((res) => {
        return res.json();
    })
    .then((data_json) => {
        const carShareUser = {day:data_json.schedule.substring(0, 10), startHour:data_json.schedule.substring(11,16), 
        endHour:"10:00", carShareTime:"1h15", startLocation:data_json.start_place, endLocation:data_json.end_place, 
        co2Saved:895, level:user.level, experience:user.experience, nbPeople:data_json.max_passenger};
        const bonus = {bonusStreak:1.2, bonusPollution:1.5, bonusDay: 1.5};
        const experience_earned = levels.calculate_experience_carShare(carShareUser.nbPeople, bonus.bonusStreak, bonus.bonusPollution, bonus.bonusDay); 
        const level_up  = levels.level_up(carShareUser.level, carShareUser.experience, experience_earned, 0); 
        const level_end = carShareUser.level + level_up;
        const experience_end = levels.experience_user_end_carShare(carShareUser.level, carShareUser.experience, experience_earned);

        setData({carShare:carShareUser, bonus:bonus, experience_earned:experience_earned, 
            level_up:level_up, level_end:level_end, experience_end:experience_end});

        var update_user = {uid:user.uid, level:level_end, experience:experience_end}
        const options = {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(update_user)
        };
        fetch("http://localhost:8080/user/"+user.uid, options)
        .then((res) => {
        })
    });
  }, [user]);


  const handleClickRanking = () => {
    navigate('/ranking');
  };

  return (
    <React.Fragment>
        <Navbar />

        {window.innerWidth < 1105 && data && 
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
                            <p style={{ fontSize:"15px" }}>{data.carShare.startLocation}</p>
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
                            <p style={{ fontSize:"15px" }}>{data.carShare.endLocation}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="carShare-co2-saved" style={{ maxWidth:"350px" }}>
                <div className="row">
                    <div className="col center" style={{ marginTop:"10px" }}>
                        <p><strong style={{ fontSize:"25px" }}>{data.carShare.co2Saved}g CO<sub>2</sub> économisés</strong></p>
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

        {window.innerWidth >= 1105 && data && 
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
                        <p><strong style={{ fontSize:"25px" }}>{data.carShare.co2Saved}g CO<sub>2</sub> économisés</strong></p>
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

export default EndCarShare;