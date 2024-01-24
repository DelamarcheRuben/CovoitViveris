import React from "react";

export function RankingProfileView(u){

    let marginClass;

    if (u.user.experience < 10) {
        marginClass = 'margin1';
    } else if (u.user.experience < 100) {
        marginClass = 'margin2';
    } else {
        marginClass = 'margin3';
    }

    return (
        <React.Fragment>
            <div className="small-screen">
                <div className="ranking-profile-view-small" style={{ maxWidth: "290px"}}>

                    <div className="column">
                        <div className="" style={{ marginTop: "-5px" }}>
                            <img src="./src/images/profil_picture.png" alt="Photo profil" width="110px"/>
                            <p className={`color-company ${marginClass}-small`} style={{ marginTop: "-38px" }}><strong style={{ fontSize:"10px" }}>{u.user.experience}</strong></p>
                        </div>
                        <div className="row" style={{ lineHeight: "20px"}}>
                            <p style={{ marginTop: "5px"}}><strong style={{ fontSize: "14px" }}>{u.user.pseudo}</strong></p>
                            <p style={{ marginTop: "2px", fontSize:  "10px" }}>{u.user.job}, {u.user.city}</p>
                            <p style={{ marginTop: "-7px" }}><em style={{ fontSize:  "10px" }}>{u.user.nb_carshares} covoiturages, {u.user.kilometers} km parcourus</em></p>
                            <div className="column" style={{ marginTop: "5px"}}>
                                <img className="column-item-badge" src="./src/images/badge/badge_1.png" alt="Badge 1" width="20px" height="20px"/>
                                <img className="column-item-badge" src="./src/images/badge/badge_2.png" alt="Badge 2" width="20px" height="20px"/>
                                <img className="column-item-badge" src="./src/images/badge/badge_3.png" alt="Badge 3" width="20px" height="20px"/>
                                <img className="column-item-badge" src="./src/images/badge/badge_4.png" alt="Badge 4" width="20px" height="20px"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
            
            <div className="large-screen">
                <div className="ranking-profile-view">
                    <div className="profile-background" style={{ backgroundImage: `url(./src/images/background_profile/background_${u.user.picture_background}.png)` }}>

                    </div>
                    <div className="column" style={{ marginTop: "-85px"}}>
                        <div className="">
                            <img src="./src/images/profil_picture.png" alt="Photo profil"/>
                            <p className={`color-company ${marginClass}`} style={{ marginTop: "-58px" }}><strong>{u.user.experience}</strong></p>
                        </div>
                        <div className="row" style={{ lineHeight: "20px"}}>
                            <img src="./src/images/exp/exp_level_1.png" alt="Photo profil" style={{ marginTop: "70px", width: "90%" }}/>
                            <p style={{ marginTop: "15px", fontSize: "20px" }}><strong>{u.user.pseudo}</strong></p>
                            <p style={{ fontSize:  "14px" }}>{u.user.job}, {u.user.city}</p>
                            <p><em style={{ fontSize:  "14px" }}>{u.user.nb_carshares} covoiturages, {u.user.kilometers} km parcourus</em></p>
                            <div className="column" style={{ marginTop: "10px"}}>
                                <img className="column-item-badge" src="./src/images/badge/badge_1.png" alt="Badge 1"/>
                                <img className="column-item-badge" src="./src/images/badge/badge_2.png" alt="Badge 2"/>
                                <img className="column-item-badge" src="./src/images/badge/badge_3.png" alt="Badge 3"/>
                                <img className="column-item-badge" src="./src/images/badge/badge_4.png" alt="Badge 4"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    );
}