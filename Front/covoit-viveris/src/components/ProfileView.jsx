import React from "react";

export function ProfileView(u){

    let marginClass;

    if (u.user.experience < 10) {
        marginClass = 'margin1';
    } else if (u.user.experience < 100) {
        marginClass = 'margin2';
    } else {
        marginClass = 'margin3';
    }

    return (
        <div className="profile-view" >
            <div className="profile-background" style={{ backgroundImage: `url(./src/images/background_profile/background_${u.user.picture}.png)` }}>

            </div>
            <div className="column" style={{ marginTop: "-85px"}}>
                <div className="">
                    <img src="./src/images/profil_picture.png" alt="Photo profil"/>
                    <p className={`color-company ${marginClass}`} style={{ marginTop: "-58px" }}><strong>{u.user.experience}</strong></p>
                </div>
                <div className="row" style={{ lineHeight: "20px"}}>
                    <img src="./src/images/exp/exp_level_1.png" alt="Photo profil" style={{ marginTop: "70px", width: "90%" }}/>
                    <p style={{ marginTop: "15px", fontSize: "20px" }}><strong>{u.user.name}</strong></p>
                    <p style={{ fontSize:  "14px" }}>{u.user.job}, {u.user.location}</p>
                    <p><em style={{ fontSize:  "14px" }}>{u.user.carShares} covoiturages, {u.user.kilometers} km parcourus</em></p>
                    <div className="column" style={{ marginTop: "10px"}}>
                        <img className="column-item-badge" src="./src/images/badge/badge_1.png" alt="Badge 1"/>
                        <img className="column-item-badge" src="./src/images/badge/badge_2.png" alt="Badge 2"/>
                        <img className="column-item-badge" src="./src/images/badge/badge_3.png" alt="Badge 3"/>
                        <img className="column-item-badge" src="./src/images/badge/badge_4.png" alt="Badge 4"/>
                    </div>
                </div>
            </div>
        </div>
    );
}