import React from "react";
import { useState, useEffect } from 'react';
import { useUser } from "../../context/UserContext";
import { Tooltip } from "../Tooltip";


export function ProfileBadges({badges}){
    const { user } = useUser();

    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    const badgeTitle =  [
                        "Covoitureur", 
                        "Covoitureur Consécutif", 
                        "Kilométrage", 
                        "Eco-Citoyen", 
                        "Vétéran", 
                        "Annonceur", 
                        "Partenaire", 
                        "Challenge"
                        ];

    const badgeDescription =[   
                            "covoiturages réalisés", 
                            "covoiturages consécutifs réalisés", 
                            "Parcourez 50 km en covoiturage", 
                            "Réduisez --- d'émissions de CO2 grâce au covoiturage", 
                            "Utilisez l'application de covoiturage pendant 2 semaine", 
                            "Postez 3 annonces de covoiturage", 
                            "Partagez un covoiturage avec 2 passagers différents",
                            "Réussir 2 challenges"
                            ];

    const badgePicture =[   
                        "covoiturage_", 
                        "covoiturage_consecutif_", 
                        "kilometrage_", 
                        "eco_citoyen_", 
                        "veteran_", 
                        "annonceur_", 
                        "partenaire_",
                        "challenge_"
                        ];

    const goalBadge = [];
    // for (let index = 0; index < badges.length; index++) {
    //     goalBadge.push(badges[index].split(", "))
    // }
    

    const tooltipContent = "Bronze &nbsp; : 5 <br>Argent &nbsp;&nbsp; : 20 <br>Or &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : 50 <br>Diamant : 100";

    console.log(badges);
    
    // const badgeData = badges.map((item, index) => ({
    //     title: item.name_badge,
    //     description: item.description,
    //     picture: item.picture_badge+"_",
    //     id: index % 4 + 1,
    //     content: "Bronze &nbsp; : " + goalBadge[index][0] + "<br>Argent &nbsp;&nbsp; : " + goalBadge[index][1] + " <br>Or &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : " + goalBadge[index][2] + " <br>Diamant : " + goalBadge[index][3]
    // }));


    


    return (
        <React.Fragment>
            {/* <div className="small-screen">
                <div className="badge-view-small">
                    <p><strong className="center-div-picture" style={{ fontSize:"20px", paddingTop:"15px" }}>GALERIES DE BADGES : </strong></p>
                    
                    {badgeData.map((data, index) => (
                        <div className="row center-picture" style={{ marginTop:"20px" }}>
                            <div className="col" style={{ maxWidth:"75px", marginLeft:"5%" }}>
                                <img className="center-picture" src={`../src/images/badge/${data.picture}${data.id}.png`} alt={`Badge ${data.title}`} width="100%"/>
                            </div>
                            <div className="col" style={{ maxWidth:"300px"}}>
                                <p className="center"><strong style={{ fontSize:"15px" }}>{data.title}</strong></p>
                                <p className="center" style={{ fontStyle:"italic" }}>{data.description}</p>                            
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>



            <div className="large-screen" style={{ marginTop:"20px"}}>
                <div className="badge-view">
                    <p><strong className="center-div-picture" style={{ fontSize:"20px", paddingTop:"15px" }}>GALERIES DE BADGES : </strong></p>
                    
                    {badgeData.map((data, index) => (
                        <div className="row center-picture" style={{ marginTop:"20px" }}>
                            <div className="col" style={{ maxWidth:"50px", marginLeft:"5%" }}>
                                <Tooltip content={data.content}>
                                    <div className="circle">
                                        <span style={{ color: 'white', fontSize: '16px'}}>i</span>
                                    </div>
                                </Tooltip>
                            </div>
                            <div className="col" style={{ maxWidth:"100px", marginLeft:"5%" }}>
                                <img className="large-screen center-picture" src={`../src/images/badge/${data.picture}${data.id}.png`} alt={`Badge ${data.title}`} width="100%"/>
                            </div>
                            <div className="col" style={{ width:"80px"}}>
                                <p className="center"><strong style={{ fontSize:"19px" }}>{data.title}</strong></p>
                                <p className="center" style={{ fontStyle:"italic" }}>{data.description}</p>                            
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div> */}
        </React.Fragment>
    );
}
