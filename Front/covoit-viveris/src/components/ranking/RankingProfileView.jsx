import React, { useEffect, useState } from "react";
import { useWindowWidth } from "../../context/WindowWidthContext";

export function RankingProfileView(u){

    const windowWidth = useWindowWidth();
    const [badges, setBadges] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/ownedbadges?user_id=" + u.user.uid)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
            setBadges(data);
        });
    }, [u.user.uid]);

    useEffect(() => {
        if (badges.length > 0) {
            console.log(badges[0].level);
        }
    }, [badges]);

    let marginClass;

    if (u.user.level < 10) {
        marginClass = 'margin1';
    } else if (u.user.level < 100) {
        marginClass = 'margin2';
    } else {
        marginClass = 'margin3';
    }


    return (
        <React.Fragment>
            {windowWidth < 1105 && badges.length > 0 &&
            <div className="small-screen">
                <div className="ranking-profile-view-small" style={{ maxWidth: "290px" }}>
                    <div className="column">
                        <div className="" style={{ marginTop: "5px" }}>
                            <img src={`../../src/images/profile_picture/profile_picture_${u.user.picture_profile}.png`} alt="Photo profil" width="90px"/>
                            <p className={`color-company ${marginClass}-small-ranking`} style={{ marginTop: "-27px" }}><strong style={{ fontSize:"10px" }}>{u.user.level}</strong></p>
                        </div>
                        <div className="row" style={{ lineHeight: "20px"}}>
                            <p style={{ marginTop: "5px"}}><strong style={{ fontSize: "14px" }}>{u.user.pseudo}</strong></p>
                            <p style={{ marginTop: "2px", fontSize:  "10px" }}>{u.user.job}, {u.user.address.city}</p>
                            <p style={{ marginTop: "-7px" }}><em style={{ fontSize:  "9px" }}>{u.user.nb_carshares} covoiturages, {u.user.kilometers} km parcourus</em></p>
                            <div className="column" style={{ marginTop: "5px"}}>
                                <img className="column-item-badge" src={`../../src/images/badge/covoitureur_${badges[0].level}.png`} alt="Badge 1" width="25px" height="25px"/>
                                <img className="column-item-badge" src={`../../src/images/badge/covoitureur_consecutif_${badges[1].level}.png`} alt="Badge 2" width="25px" height="25px"/>
                                <img className="column-item-badge" src={`../../src/images/badge/kilometrage_${badges[2].level}.png`} alt="Badge 3" width="25px" height="25px"/>
                                <img className="column-item-badge" src={`../../src/images/badge/eco_citoyen_${badges[3].level}.png`} alt="Badge 4" width="25px" height="25px"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }

            
            {windowWidth >= 1105 && badges.length > 0 &&
            <div className="large-screen">
                <div className="ranking-profile-view">
                    <div className="profile-background" style={{ backgroundImage: `url(./src/images/background_profile/background_${u.user.picture_background}.png)` }}>
                    </div>

                    <div className="column" style={{ marginTop: "-85px"}}>
                        <div className="" style={{ minWidth:"200px", marginTop:"20px" }}>
                            <img className="center-picture" src={`../../src/images/profile_picture/profile_picture_${u.user.picture_profile}.png`} alt="Photo profil" width="75%"/>
                            <p className={`color-company ${marginClass}-ranking`} style={{ marginTop: "-33px" }}><strong>{u.user.level}</strong></p>
                        </div>
                        <div className="row" style={{ lineHeight: "20px"}}>
                            <img src="../../src/images/exp/exp_level_1.png" alt="Photo profil" style={{ marginTop: "70px", width: "90%" }}/>
                            <p style={{ marginTop: "15px", fontSize: "20px" }}><strong>{u.user.pseudo}</strong></p>
                            <p style={{ fontSize:  "14px" }}>{u.user.job}, {u.user.address.city}</p>
                            <p><em style={{ fontSize:  "13px" }}>{u.user.nb_carshares} covoiturages, {u.user.kilometers} km parcourus</em></p>
                            <div className="column" style={{ marginTop: "10px"}}>
                                <img className="column-item-badge" style={{ width:"35px" }} src={`../../src/images/badge/covoitureur_${badges[0].level}.png`} alt="Badge 1"/>
                                <img className="column-item-badge" style={{ width:"35px" }} src={`../../src/images/badge/covoitureur_consecutif_${badges[1].level}.png`} alt="Badge 2"/>
                                <img className="column-item-badge" style={{ width:"35px" }} src={`../../src/images/badge/kilometrage_${badges[2].level}.png`} alt="Badge 3"/>
                                <img className="column-item-badge" style={{ width:"35px" }} src={`../../src/images/badge/eco_citoyen_${badges[3].level}.png`} alt="Badge 4"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }

        </React.Fragment>
    );
}