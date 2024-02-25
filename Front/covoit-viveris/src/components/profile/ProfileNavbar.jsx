import React, { useState, useEffect } from "react";
import { useLocation, NavLink, Route, Routes } from "react-router-dom";
import { useUser }         from "../../context/UserContext.jsx";
import { useWindowWidth }  from "../../context/WindowWidthContext.jsx";
import { ProfileBadges   } from "./ProfileBadges.jsx";
import { ProfileCarShares} from "./ProfileCarShares.jsx";
import { ProfileFriends  } from "./ProfileFriends.jsx";
import { ProfileSummary  } from "./ProfileSummary.jsx";
import { ProfileUpdate   } from "./ProfileUpdate.jsx";
import * as levels from "../../functions/levels.js"


export function ProfileNavbar(){

    const { user } = useUser();
    const windowWidth = useWindowWidth();

    const location = useLocation();
    const [currentUrl, setCurrentUrl] = useState("profile");

    useEffect(() => {
        if(location.pathname == "/profile/updateProfile"){
            setCurrentUrl("updateProfile");
        }
        else if(location.pathname == "/profile/carSharesHistory"){
            setCurrentUrl("carSharesHistory");
        }
        else if(location.pathname == "/profile/badges"){
            setCurrentUrl("badges");
        }
        else if(location.pathname == "/profile/friends"){
            setCurrentUrl("friends");
        }
        else{
            setCurrentUrl("profile");
        }
    }, [location.pathname]);

    const contentLabel = () => {
        let currentUrl = location.pathname;
        
        let label = "Profil";
        if(currentUrl === "/profile/updateProfile"){
            label = "Modifier profil";
        }
        else if(currentUrl === "/profile/carSharesHistory"){
            label = "Historiques des trajets";
        }
        else if(currentUrl === "/profile/badges"){
            label = "Badges";
        }
        else if(currentUrl === "/profile/friends"){
            label = "Amis";
        }
        else{
            label = "Profil";
        }
        return label;
    };

    return (user &&
        <React.Fragment>

            {user && windowWidth < 1105 && 
            <div className="small-screen">
                <img className="center-picture" src={`../../src/images/background_profile/background_${user.picture_background}.png`} alt="Photo profil" style={{ width: "100%", maxHeight: "125px", marginTop:"5px" }}/>
                <img className="center-picture" src={`../../src/images/profil_picture_${user.picture_profile}.png`} alt="Photo profil" style={{ width: "150px", marginTop: "-90px" }}/>
                <p className="color-company center" style={{ marginTop: "-46px" }}><strong style={{ fontSize: "12px" }}> {user.level} </strong></p>
                <p className="center" style={{ marginTop: "10px" }}><strong style={{ fontSize: "4.5vw" }}>{user.pseudo}</strong></p>
                <p className="center" style={{ fontSize:  "3vw" }}>{user.job}, {user.address.city}</p>

                <div className="profile-progress-bar center-picture" style={{ marginTop: "10px", width: "50%" }}>
                    <div className="profile-progress" style={{ width: `${(user.experience/levels.level_experience(user.level))*100}%`}}></div>
                </div>
                <p className="center" style={{ marginTop: "5px", marginBottom: "20px" }}><strong style={{ fontSize: "4vw" }}>{user.experience} / {levels.level_experience(user.level)}</strong></p>

                <div className="row justify-content-center" style={{ marginBottom:"25px" }}>
                    <div className="col center">
                        <NavLink to="/profile/updateProfile">
                            <div style={{ height:"100%" }}>
                                <img className="center-picture" src="../../src/images/logo/updateProfile.png" alt="Modifier profil" width="70vw"/>
                            </div>
                        </NavLink>
                        <p className={`${currentUrl === "updateProfile" ? 'active-link' : ''}`} style={{ fontSize:"3vw", marginTop:"5px" }}> Modifier profil </p>
                    </div>
                    <div className="col center">
                        <NavLink to="/profile/carSharesHistory">
                            <div className="center-div-picture" style={{ height:"100%" }}>
                                <img className="center-picture" src="../../src/images/logo/carSharesHistory.png" alt="Historique des trajets" width="70vw"/>
                            </div>
                        </NavLink>
                        <p className={`${currentUrl === "carSharesHistory" ? 'active-link' : ''}`} style={{ fontSize:"3vw", marginTop:"5px" }}> Historique des trajets </p>
                    </div>
                    <div className="col center">
                        <NavLink to="/profile/badges">
                            <div style={{ height:"100%" }}>
                                <img className="center-picture" src="../../src/images/logo/badges.png" alt="Badges" width="55vw"/>
                            </div>
                        </NavLink>
                        <p className={`${currentUrl === "badges" ? 'active-link' : ''}`} style={{ fontSize:"3vw", marginTop:"5px" }}> Badges </p>
                    </div>
                </div>

                {contentLabel() !== "Profil" ? (
                    <div className="row" style={{ marginTop:"10px", marginBottom:"10px" }}>
                        <div className="col center">
                            <div className="profile-horizontal-line" style={{ marginLeft:"auto" }}></div>
                        </div>
                        <div className="col center" style={{ maxWidth:"400px" }}>
                            <p><strong style={{ fontSize: "25px" }}>{contentLabel()}</strong></p>
                        </div>
                        <div className="col center">
                            <div className="profile-horizontal-line"></div>
                        </div>
                    </div>
                ) : null}

                <Routes>
                    <Route path="updateProfile"    element={<ProfileUpdate    />} />
                    <Route path="carSharesHistory" element={<ProfileCarShares />} />
                    <Route path="badges"           element={<ProfileBadges    />} />
                    <Route path=""                 element={<ProfileSummary   />} />
                </Routes>
            </div>
            }

            {user && windowWidth >= 1105 && 
            <div className="large-screen">
                <img className="center-picture" src={`../../src/images/background_profile/background_${user.picture_background}.png`} alt="Photo profil" style={{ marginTop:"-25px", width: "60%", maxHeight:"150px" }}/>
                <img className="center-picture" src={`../../src/images/profil_picture_${user.picture_profile}.png`} alt="Photo profil" style={{ width: "250px", marginTop: "-150px" }}/>
                <p className={`color-company center`} style={{ marginTop: "-70px" }}><strong style={{ fontSize: "22px" }}>{user.level}</strong></p>
                <p className="center" style={{ marginTop: "15px" }}><strong style={{ fontSize: "30px" }}>{user.pseudo}</strong></p>
                <p className="center" style={{ fontSize:  "15px" }}>{user.job}, {user.address.city}</p>

                <div className="profile-progress-bar center-picture" style={{ marginTop: "10px", width: "25%" }}>
                    <div className="profile-progress" style={{ width: `${(user.experience/levels.level_experience(user.level))*100}%`}}></div>
                </div>
                <p className="center" style={{ fontSize: "17px", marginTop: "5px", marginBottom: "20px" }}><strong style={{ fontSize: "20px" }}>{user.experience} / {levels.level_experience(user.level)}</strong></p>

                <div className="row justify-content-center" style={{ marginBottom:"25px" }}>
                    <div className="col-md-2 mb-4 center">
                        <NavLink to="/profile/updateProfile">
                            <div style={{ height:"115px" }}>
                                <img className="center-picture" src="../../src/images/logo/updateProfile.png" alt="Modifier profil" />
                            </div>
                        </NavLink>
                        <p className={`${currentUrl === "updateProfile" ? 'active-link' : ''}`}> Modifier profil </p>
                    </div>
                    <div className="col-md-2 mb-4 center">
                        <NavLink to="/profile/carSharesHistory">
                            <div className="center-div-picture" style={{ height:"115px" }}>
                                <img className="center-picture" src="../../src/images/logo/carSharesHistory.png" alt="Historique des trajets" />
                            </div>
                        </NavLink>
                        <p className={`${currentUrl === "carSharesHistory" ? 'active-link' : ''}`}> Historique des trajets </p>
                    </div>
                    <div className="col-md-2 mb-4 center">
                        <NavLink to="/profile/badges">
                            <div style={{ height:"115px" }}>
                                <img className="center-picture" src="../../src/images/logo/badges.png" alt="Badges" />
                            </div>
                        </NavLink>
                        <p className={`${currentUrl === "badges" ? 'active-link' : ''}`}> Badges </p>
                    </div>
                    <div className="col-md-2 mb-4 center">
                        <NavLink to="/profile/friends">
                            <div className="center-div-picture" style={{ height:"115px" }}>
                                <img className="center-picture" src="../../src/images/logo/friends.png" alt="Amis" />
                            </div>
                        </NavLink>
                        <p className={`${currentUrl === "friends" ? 'active-link' : ''}`}> Amis </p>
                    </div>
                </div>

                {contentLabel() !== "Profil" ? (
                    <div className="row" style={{ marginTop:"10px", marginBottom:"10px" }}>
                        <div className="col center">
                            <div className="profile-horizontal-line" style={{ marginLeft:"auto" }}></div>
                        </div>
                        <div className="col center" style={{ maxWidth:"400px" }}>
                            <p><strong style={{ fontSize: "35px" }}>{contentLabel()}</strong></p>
                        </div>
                        <div className="col center">
                            <div className="profile-horizontal-line"></div>
                        </div>
                    </div>
                ) : null}

                <Routes>
                    <Route path="updateProfile"    element={<ProfileUpdate    />} />
                    <Route path="carSharesHistory" element={<ProfileCarShares />} />
                    <Route path="badges"           element={<ProfileBadges    />} />
                    <Route path="friends"          element={<ProfileFriends   />} />
                    <Route path=""                 element={<ProfileSummary   />} />
                </Routes>

            </div>
            }
        </React.Fragment>
    );
}
