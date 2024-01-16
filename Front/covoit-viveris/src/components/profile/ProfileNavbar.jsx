import React from "react";
import { Navbar } from "../header/Navbar";
import { NavLink, Route, Routes } from "react-router-dom";
import { ProfileBadges   } from "./ProfileBadges";
import { ProfileCarShares} from "./ProfileCarShares";
import { ProfileFriends  } from "./ProfileFriends";
import { ProfileSummary  } from "./ProfileSummary";
import { ProfileUpdate   } from "./ProfileUpdate";



export function ProfileNavbar(u){

    return (
        <React.Fragment>
            <div className="large-screen">
                <img className="center-picture" src={`./src/images/background_profile/background_${u.user.picture_background}.png`} alt="Photo profil" style={{ marginTop:"-25px", width: "60%", maxHeight:"150px" }}/>
                <img className="center-picture" src="./src/images/profil_picture.png" alt="Photo profil" style={{ width: "250px", marginTop: "-150px" }}/>
                <p className={`color-company center`} style={{ marginTop: "-70px" }}><strong style={{ fontSize: "22px" }}>{u.user.experience}</strong></p>
                <p className="center" style={{ marginTop: "15px" }}><strong style={{ fontSize: "30px" }}>{u.user.pseudo}</strong></p>
                <p className="center" style={{ fontSize:  "15px" }}>{u.user.job}, {u.user.city}</p>

                <div className="progress-bar center-picture" style={{ marginTop: "10px", width: "25%" }}>
                    <div className="progress" style={{ width: `${u.user.nb_carshares*1000 / u.user.kilometers}%`}}></div>
                </div>
                <p style={{ fontSize: "17px", textAlign: "center", marginTop: "5px", marginBottom: "20px" }}><strong style={{ fontSize: "20px" }}>{u.user.nb_carshares} / {u.user.kilometers}</strong></p>

                <div className="row justify-content-center">
                    <div className="col-md-2 mb-4 center">
                        <NavLink to="/profile/updateProfile">
                            <div style={{ height:"115px" }}>
                                <img className="center-picture" src="./src/images/logo/updateProfile.png" alt="Modifier profil" />
                            </div>
                        </NavLink>
                        <p> Modifier profil </p>
                    </div>
                    <div className="col-md-2 mb-4 center">
                        <NavLink to="/profile/carSharesHistory">
                            <div style={{ height:"115px", display:"flex", alignItems:"center"  }}>
                                <img className="center-picture" src="./src/images/logo/carSharesHistory.png" alt="Historique des trajets" />
                            </div>
                        </NavLink>
                        <p> Historique des trajets </p>
                    </div>
                    <div className="col-md-2 mb-4 center">
                        <NavLink to="/profile/badges">
                            <div style={{ height:"115px" }}>
                                <img className="center-picture" src="./src/images/logo/badges.png" alt="Badges" />
                            </div>
                        </NavLink>
                        <p> Badges </p>
                    </div>
                    <div className="col-md-2 mb-4 center">
                        <NavLink to="/profile/friends">
                            <div style={{ height:"115px", display:"flex", alignItems:"center" }}>
                                <img className="center-picture" src="./src/images/logo/friends.png" alt="Amis" />
                            </div>
                        </NavLink>
                        <p> Amis </p>
                    </div>
                </div>

                <Routes>
                    <Route path="updateProfile"    element={<ProfileUpdate    user={u.user}/>} />
                    <Route path="carSharesHistory" element={<ProfileCarShares user={u.user}/>} />
                    <Route path="badges"           element={<ProfileBadges    user={u.user}/>} />
                    <Route path="friends"          element={<ProfileFriends   user={u.user}/>} />
                    <Route path=""                 element={<ProfileSummary   user={u.user}/>} />
                </Routes>
            </div>

            <div className="small-screen">
                <img className="center-picture" src={`./src/images/background_profile/background_${u.user.picture_background}.png`} alt="Photo profil" style={{ width: "100%", maxHeight: "125px", marginTop:"5px" }}/>
                <img className="center-picture" src="./src/images/profil_picture.png" alt="Photo profil" style={{ width: "150px", marginTop: "-90px" }}/>
                <p className={`color-company center`} style={{ marginTop: "-46px" }}><strong style={{ fontSize: "12px" }}>{u.user.experience}</strong></p>
                <p className="center" style={{ marginTop: "10px" }}><strong style={{ fontSize: "4.5vw" }}>{u.user.pseudo}</strong></p>
                <p className="center" style={{ fontSize:  "3vw" }}>{u.user.job}, {u.user.city}</p>

                <div className="progress-bar center-picture" style={{ marginTop: "10px", width: "50%" }}>
                    <div className="progress" style={{ width: `${u.user.nb_carshares*1000 / u.user.kilometers}%`}}></div>
                </div>
                <p style={{ textAlign: "center", marginTop: "5px", marginBottom: "20px" }}><strong style={{ fontSize: "4vw" }}>{u.user.nb_carshares} / {u.user.kilometers}</strong></p>

                <div className="row justify-content-center">
                    <div className="col center">
                        <NavLink to="/profile/updateProfile">
                            <div style={{ height:"115px" }}>
                                <img className="center-picture" src="./src/images/logo/updateProfile.png" alt="Modifier profil" width="90vw"/>
                            </div>
                        </NavLink>
                        <p style={{ height:"50px", fontSize:"3.5vw" }}> Modifier profil </p>
                    </div>
                    <div className="col center">
                        <NavLink to="/profile/carSharesHistory">
                            <div style={{ height:"115px", display:"flex", alignItems:"center"}}>
                                <img className="center-picture" src="./src/images/logo/carSharesHistory.png" alt="Historique des trajets" width="90vw"/>
                            </div>
                        </NavLink>
                        <p style={{ height:"50px", fontSize:"3.5vw" }}> Historique des trajets </p>
                    </div>
                    <div className="col center">
                        <NavLink to="/profile/badges">
                            <div style={{ height:"115px" }}>
                                <img className="center-picture" src="./src/images/logo/badges.png" alt="Badges" width="55vw"/>
                            </div>
                        </NavLink>
                        <p style={{ height:"50px", fontSize:"3.5vw" }}> Badges </p>
                    </div>
                </div>

                <Routes>
                    <Route path="updateProfile"    element={<ProfileUpdate    user={u.user}/>} />
                    <Route path="carSharesHistory" element={<ProfileCarShares user={u.user}/>} />
                    <Route path="badges"           element={<ProfileBadges    user={u.user}/>} />
                    <Route path=""                 element={<ProfileSummary   user={u.user}/>} />
                </Routes>
            </div>
        </React.Fragment>
    );
}
