import React from "react";
import { useState, useEffect } from 'react';
import { useLocation, NavLink, Routes, Route } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { ProfileNavbar  } from "./ProfileNavbar";
import { ProfileFriends } from "./ProfileFriends";

export function ProfileView(u){
    const { user } = useUser();

    const location = useLocation();
    const [currentUrl, setCurrentUrl] = useState("profile");

    useEffect(() => {
        if(location.pathname == "/profile/friends"){
            setCurrentUrl("friends");
        }
        else{
            setCurrentUrl("profile");
        }
    }, [location.pathname]);


    return (
        <React.Fragment>
            
            {window.innerWidth < 1105 && 
            <div className="small-screen" style={{ height:"50px", marginTop: "-10px" }}>
                <div className="row flex-nowrap">
                    <div className="col center" >
                        <NavLink to="/profile" className={`nav-link ${currentUrl === "profile" ? 'active-link' : ''}`} style={{ height:"33px"}}>
                            <p style={{ fontSize:"25px" }}> Moi </p>
                        </NavLink>
                    </div>    
                    <div className="col center">
                        <NavLink to="/profile/friends" className={`nav-link ${currentUrl === "friends" ? 'active-link' : ''}`} style={{ height:"33px"}}>
                            <p style={{ fontSize:"25px" }}> Amis </p>                        
                        </NavLink>
                    </div>
                </div>
                <Routes>
                    <Route path="friends" element={<ProfileFriends />} />
                    <Route path="*"       element={<ProfileNavbar  />} />
                </Routes>
            </div>}

            {window.innerWidth >= 1105 && 
            <div className="large-screen">
                <ProfileNavbar />
            </div>
            }
        </React.Fragment>

    );
}