import React from "react";
import { useState, useEffect, useRef } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";
import { useUser } from "../../context/UserContext";

export function Navbar(){
    const { logout } = useUser();

    // Interact with DOM elements
    const navRef   = useRef();
    const location = useLocation();
    const [currentUrl, setCurrentUrl] = useState("home");

    const showNavBar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

    useEffect(() => {
        // Remove 'http://localhost:5173/' of the URL
        let url = location.pathname.substring(1,5);

        if(url == "prof"){
            setCurrentUrl("profile");
        }
        else if(url == "sche"){
            setCurrentUrl("schedule");
        }
        else if(url == "rese"){
            setCurrentUrl("research");
        }
        else if(url == "rank"){
            setCurrentUrl("ranking");
        }
        else{
            setCurrentUrl("home");
        }

        console.log(currentUrl + "#");
        console.log(url)
    }, [location.pathname]);

    const contentLabel = () => {
        // Remove 'http://localhost:5173/' of the URL
        let url = window.location.href.substring(22, 31);
        
        let label = "Accueil";
        if(url === "schedule"){
            label = "Planifier un trajet";
        }
        else if(url === "research"){
            label = "Rechercher un trajet";
        }
        else if(url === "ranking/"){
            label = "Classement";
        }
        else if(url === "profile/"){
            label = "Mon profil";
        }
        return label;
    };



    return (
        <header>
            <NavLink to="/home">
                <img className="small-screen" src="../../src/images/logo/logo_v.jpg"            alt="Logo Viveris" style={{ width: "80%" }}/>
                <img className="large-screen" src="../../src/images/logo/logo_viveris_full.png" alt="Logo Viveris" style={{ width: "70%" }}/>
            </NavLink>
            <label className="small-screen">{contentLabel()}</label>
            <nav ref={navRef} style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
                <NavLink to="/home"     className={`${currentUrl === "home"     ? 'active-link' : 'no-active-link'}`}>Accueil             </NavLink>
                <NavLink to="/schedule" className={`${currentUrl === "schedule" ? 'active-link' : 'no-active-link'}`}>Planifier un trajet </NavLink>
                <NavLink to="/research" className={`${currentUrl === "research" ? 'active-link' : 'no-active-link'}`}>Rechercher un trajet</NavLink>
                <NavLink to="/ranking"  className={`${currentUrl === "ranking"  ? 'active-link' : 'no-active-link'}`}>Classement          </NavLink>
                <NavLink to="/profile"  className={`${currentUrl === "profile"  ? 'active-link' : 'no-active-link'}`}>Mon profil          </NavLink>
                <NavLink to="/login" className="small-screen" onClick={logout}> Déconnexion </NavLink>
                <NavLink to="/login" className="large-screen" style={{ maxWidth:"50px", marginLeft:"10px" }}onClick={logout}> 
                    <img src="../../src/images/logo/logout.jpg" alt="Logout" style={{ width: "50%" }}></img>
                </NavLink> 

                <button className="nav-btn nav-close-btn" onClick={showNavBar}>
                    <FaTimes />
                </button>
            </nav>

            <button className="nav-btn" onClick={showNavBar}>
                <FaBars />
            </button>
        </header>
    );
}