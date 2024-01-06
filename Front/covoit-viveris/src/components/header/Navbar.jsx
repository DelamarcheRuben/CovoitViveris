import React from "react";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export function Navbar(){

    // Interact with DOM elements
    const navRef = useRef();

    const showNavBar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

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
                <img className="large-screen" src="./src/images/logo/logo_viveris.jpg" alt="Logo Viveris" style={{ width: "80%" }}/>
                <img className="small-screen" src="./src/images/logo/logo_v.jpg"       alt="Logo Viveris" style={{ width: "80%" }}/>
            </NavLink>
            <label className="small-screen">{contentLabel()}</label>
            <nav ref={navRef}>
                <NavLink to="/"         style={({ isActive }) => { return { fontWeight: isActive ? "bold" : "normal",
                                                                            paddingBottom : isActive ? "5px" : "0px",
                                                                            borderBottom : isActive ? "2px solid #FF393A" : "none"};}}>Accueil</NavLink>
                <NavLink to="/schedule" style={({ isActive }) => { return { fontWeight: isActive ? "bold" : "normal",
                                                                            paddingBottom : isActive ? "5px" : "0px",
                                                                            borderBottom : isActive ? "2px solid #FF393A" : "none"};}}>Planifier un trajet</NavLink>
                <NavLink to="/research" style={({ isActive }) => { return { fontWeight: isActive ? "bold" : "normal",
                                                                            paddingBottom : isActive ? "5px" : "0px",
                                                                            borderBottom : isActive ? "2px solid #FF393A" : "none"};}}>Rechercher un trajet</NavLink>
                <NavLink to="/ranking"  style={({ isActive }) => { return { fontWeight: isActive ? "bold" : "normal",
                                                                            paddingBottom : isActive ? "5px" : "0px",
                                                                            borderBottom : isActive ? "2px solid #FF393A" : "none"};}}>Classement</NavLink>
                <NavLink to="/profile"  style={({ isActive }) => { return { fontWeight: isActive ? "bold" : "normal",
                                                                            paddingBottom : isActive ? "5px" : "0px",
                                                                            borderBottom : isActive ? "2px solid #FF393A" : "none"};}}>Mon profil</NavLink>
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