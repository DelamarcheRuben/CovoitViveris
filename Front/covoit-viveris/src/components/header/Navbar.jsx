import React from "react";
import { useState, useEffect, useRef } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";

export function Navbar(){

    // Interact with DOM elements
    const navRef   = useRef();
    const location = useLocation();
    const [currentUrl, setCurrentUrl] = useState("home");

    const showNavBar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

    useEffect(() => {
        if(location.pathname == "/"){
            setCurrentUrl("home");
        }
        else if(location.pathname == "/schedule"){
            setCurrentUrl("schedule");
        }
        else if(location.pathname == "/research"){
            setCurrentUrl("research");
        }
        else if(location.pathname == "/ranking"){
            setCurrentUrl("ranking");
        }
        else{
            setCurrentUrl("profile");
        }
    }, [location.pathname]);

    const contentLabel = () => {
        // Remove 'http://localhost:5173/' of the URL
        let currentUrl = window.location.href.substring(22);
        
        let label = "Accueil";
        if(currentUrl === "schedule"){
            label = "Planifier un trajet";
        }
        else if(currentUrl === "research"){
            label = "Rechercher un trajet";
        }
        else if(currentUrl === "ranking"){
            label = "Classement";
        }
        else if(currentUrl === "profile"){
            label = "Mon profil";
        }
        return label;
    };



    return (
        <header>
            <NavLink to="/">
                <img className="large-screen" src="./src/images/logo/logo_viveris_full.png" alt="Logo Viveris" style={{ width: "70%" }}/>
                <img className="small-screen" src="./src/images/logo/logo_v.jpg"            alt="Logo Viveris" style={{ width: "80%" }}/>
            </NavLink>
            <label className="small-screen">{contentLabel()}</label>
            <nav ref={navRef}>
                <NavLink to="/"         className={`${currentUrl === "home"     ? 'active-link' : 'no-active-link'}`}>Accueil             </NavLink>
                <NavLink to="/schedule" className={`${currentUrl === "schedule" ? 'active-link' : 'no-active-link'}`}>Planifier un trajet </NavLink>
                <NavLink to="/research" className={`${currentUrl === "research" ? 'active-link' : 'no-active-link'}`}>Rechercher un trajet</NavLink>
                <NavLink to="/ranking"  className={`${currentUrl === "ranking"  ? 'active-link' : 'no-active-link'}`}>Classement          </NavLink>
                <NavLink to="/profile"  className={`${currentUrl === "profile"  ? 'active-link' : 'no-active-link'}`}>Mon profil          </NavLink>
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