import React from "react";
import { Navbar } from "../components/header/Navbar";
import { useNavigate } from "react-router-dom";
import * as levels from "../functions/levels";


const EndCarShare = () => {
  const navigate = useNavigate();
    
  const carShare = {day:"Lundi 12 février 2024", startHour:"08:45", endHour:"10:00", carShareTime:"1h15", startLocation:"5 Rue Velpeau, 91620 Antony", endLocation:"Boulogne-Billancourt", co2Saved:895, nbPeople:3};
  const data = {bonusStreak:1.2, bonusPollution:1.5, bonusDay: 1.5};
  const user = {level:0, experience: 0};

  const experience_earned = levels.calculate_experience_carShare(carShare.nbPeople, data.bonusStreak, data.bonusPollution, data.bonusDay); 
  const level_up  = levels.level_up(user.level, user.experience, experience_earned, 0); 
  const level_end = user.level + level_up;
  const experience_end = levels.experience_user_end_carShare(user.level, user.experience, experience_earned);


  const handleClickRanking = () => {
    navigate('/ranking');
  };

  return (
    <React.Fragment>
        <Navbar />
        <div className="endCarShare-background" style={{ minHeight:"1200px"}}>
            <p className="center"><strong style={{ fontSize:"30px" }}>Félicitations !</strong></p>
            <div className="center-picture" style={{ maxWidth:"300px" }}>
                <div className="auth-horizontal-line-small" style={{ marginLeft:"75px" }}></div>
            </div>
            <p className="center" style={{ marginTop:"15px" }}>On espère que votre covoiturage s’est bien déroulé. <br></br>Voici un récapitulatif :</p>
            <div className="carShare-travel-info">
                <p style={{ padding:"15px" }}><strong>{carShare.day}</strong></p>
                <div className="col" style={{ padding: "10px"}}>
                    <div className="row center-div-picture">
                        <div className="col" style={{ display:"flex", maxWidth:"100px" }}>
                            <p><strong>{carShare.startHour}</strong></p>
                        </div>
                        <div className="col" style={{ display:"flex", justifyContent:"right", maxWidth:"100px"}}>
                            <div className="circle"></div>
                        </div>
                        <div className="col">
                            <p>{carShare.startLocation}</p>
                        </div>
                    </div>
                    <div className="row center-div-picture">
                        <div className="col" style={{ display:"flex", maxWidth:"100px", marginTop:"-15px" }}>
                            <i style={{ fontSize:"14px" }}>{carShare.carShareTime}</i>
                        </div>
                        <div className="col" style={{ display:"flex", justifyContent:"right", maxWidth:"100px", marginTop:"-2px"}}>
                            <div className="line"></div>
                        </div>
                        <div className="col">
                        </div>
                    </div>
                    <div className="row center-div-picture" >
                        <div className="col" style={{ display:"flex", maxWidth:"100px" }}>
                            <p><strong>{carShare.endHour}</strong></p>
                        </div>
                        <div className="col" style={{ display:"flex", justifyContent:"right", maxWidth:"100px"}}>
                            <div className="circle"></div>
                        </div>
                        <div className="col">
                            <p>{carShare.endLocation}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="carShare-co2-saved">
                <div className="row">
                    <div className="col center" style={{ marginTop:"10px" }}>
                        <p><strong style={{ fontSize:"25px" }}>{carShare.co2Saved}g CO<sub>2</sub> économisés</strong></p>
                    </div>
                    <div className="col" style={{ maxWidth:"150px", paddingRight:"50px", marginTop:"10px" }}>
                        <img className="large-screen center-picture" src={`../src/images/co2/co2_vert.png`} alt="Image CO2" width="90%"/>
                    </div>
                </div>
            </div>
            <div className="carShare-experience">
                <div className="row" style={{ margin:"20px", paddingTop:"10px" }}>
                    <div className="col" style={{ marginLeft:"40px" }}>
                        <p style={{ fontSize:"25px" }}>{10 + carShare.nbPeople * 2}0XP</p>
                    </div>
                    <div className="col center">
                        <p>accumulés pendant ce covoiturage</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col center">
                        <p><strong style={{ fontSize:"25px" }}>x{data.bonusStreak}</strong></p>
                    </div>
                    <div className="col center">
                        <p>série journalière</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col center">
                        <p><strong style={{ fontSize:"25px" }}>x{data.bonusDay}</strong></p>
                    </div>
                    <div className="col center">
                        <p>bonus du jour</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col center">
                        <p><strong style={{ fontSize:"25px" }}>x{data.bonusPollution}</strong></p>
                    </div>
                    <div className="col center">
                        <p>bonus pollution</p>
                    </div>
                </div>
                <p className="center" style={{ marginTop:"10px" }}><strong>+{experience_earned} points d'expériences gagnés</strong></p>
                <div className="profile-progress-bar center-picture" style={{ marginTop: "10px", width: "75%" }}>
                    {levels.increase_level(user.level, user.experience, levels.calculate_experience_carShare(carShare.nbPeople, data.bonusStreak, data.bonusPollution, data.bonusDay)) === true 
                        ? <div className="profile-progress" style={{ background: `linear-gradient(to right, #fc948c 0%, #fc948c ${experience_end / levels.level_experience(level_end) * 100}%, white ${experience_end / levels.level_experience(level_end) * 100}%, white 100%)` }}></div> 
                        : <div className="profile-progress" style={{ background: `linear-gradient(to right, #ff5046 0%, #ff5046 ${user.experience / levels.level_experience(user.level) * 100}%, #fc948c ${user.experience / levels.level_experience(user.level) * 100}%, #fc948c ${(user.experience + experience_earned) / levels.level_experience(user.level) * 100}%, white ${(user.experience + experience_earned) / levels.level_experience(user.level) * 100}%, white 100%)` }}></div>
                    }
                </div>
                <div className="row" style={{ marginTop:"10px" }}>
                    <div className="col" style={{ justifyContent:"right", display:"grid", paddingRight:"0", marginTop:"-2px" }}>
                        <div className="center-picture circle-experience">
                            <p className="center color-company"><strong style={{ fontSize:"22px" }}>{user.level + level_up}</strong></p>
                        </div>
                    </div>
                    <div className="col">
                        <p><strong className="color-company" style={{ fontSize:"20px" }}>+ {level_up}</strong></p>
                    </div>
                </div>
            </div>
            <button className="btn center-div-picture" onClick={handleClickRanking} style={{ width: "440px", marginTop:"15px", fontSize:"25px" }}>Voir mon classement</button> <br></br>

        </div>
    </React.Fragment>
  );
}

export default EndCarShare;