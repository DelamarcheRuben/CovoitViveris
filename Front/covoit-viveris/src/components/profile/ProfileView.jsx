import React, { useState, useEffect } from "react";
import { useLocation, NavLink, Routes, Route } from "react-router-dom";
import { useUser }        from "../../context/UserContext";
import { useWindowWidth } from "../../context/WindowWidthContext";
import { ProfileNavbar  } from "./ProfileNavbar";
import { ProfileFriends } from "./ProfileFriends";

export function ProfileView(u){

    const { user } = useUser();
    const windowWidth = useWindowWidth();

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

    // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // useEffect(() => {
    //     const handleResize = () => {
    //         setWindowWidth(window.innerWidth);
    //     };

    //     window.addEventListener('resize', handleResize);

    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);


    return (user &&
        <React.Fragment>
            
            {windowWidth < 1105 && 
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

            {windowWidth >= 1105 && 
            <div className="large-screen">
                <ProfileNavbar />
            </div>
            }
        </React.Fragment>

    );
}