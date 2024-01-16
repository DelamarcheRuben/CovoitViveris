import React from "react";
import { useState } from 'react';
import { NavLink, Routes, Route } from "react-router-dom";
import { ProfileNavbar  } from "./ProfileNavbar";
import { ProfileFriends } from "./ProfileFriends";

export function ProfileView(u){

    const [currentUrl, setCurrentUrl] = useState("profile");

    function handleClick (url){
        // Ajoutez votre logique personnalisée ici
        if(url == "profile"){
            setCurrentUrl("profile");
        }
        else{
            setCurrentUrl("friends");
        }
    };

    return (
        <React.Fragment>
            <div className="small-screen" style={{ height:"50px", marginTop: "-10px" }}>
                <div className="row flex-nowrap">
                    <div className="col center" >
                        <NavLink to="/profile" className={`nav-link ${currentUrl === "profile" ? 'active-link' : ''}`} 
                                 onClick={() => handleClick("profile")}
                                 style={{ height:"33px"}}>
                            <p style={{ fontSize:"25px" }}> Moi </p>
                        </NavLink>
                    </div>    
                    <div className="col center">
                        <NavLink to="/profile/friends" className={`nav-link ${currentUrl === "friends" ? 'active-link' : ''}`} 
                                 onClick={() => handleClick("friends")}
                                 style={{ height:"33px"}}>
                            <p style={{ fontSize:"25px" }}> Amis </p>                        
                        </NavLink>
                    </div>
                </div>
                <Routes>
                    <Route path="friends" element={<ProfileFriends user={u.user}/>} />
                    <Route path="*"        element={<ProfileNavbar  user={u.user}/>} />
                </Routes>
            </div>

            <div className="large-screen">
                <ProfileNavbar user={u.user} />
            </div>
        </React.Fragment>

    );
}