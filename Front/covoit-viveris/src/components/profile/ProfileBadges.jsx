import React from "react";
import { useState } from 'react';
import { useUser } from "../../context/UserContext";
import { Tooltip } from "../Tooltip";


export function ProfileBadges(){
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

    const goalBadge = [
                        [5, 20, 50, 100],
                        [2, 3, 5, 10],
                        [50, 150, 500, 1000],
                        [1, 2, 3, 4],
                        [2, 4, 12, 24],
                        [3, 10, 20, 50],
                        [2, 3, 5, 10],
                        [2, 3, 5, 10]
                      ]

    const tooltipContent = "Bronze &nbsp; : 5 <br>Argent &nbsp;&nbsp; : 20 <br>Or &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : 50 <br>Diamant : 100";

    const badgeData = badgeTitle.map((item, index) => ({
        title: item,
        description: badgeDescription[index],
        picture: badgePicture[index],
        id: index % 4 + 1,
        content: "Bronze &nbsp; : " + goalBadge[index][0] + "<br>Argent &nbsp;&nbsp; : " + goalBadge[index][1] + " <br>Or &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : " + goalBadge[index][2] + " <br>Diamant : " + goalBadge[index][3]
    }));


    return (
        <React.Fragment>
            <div className="small-screen">
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
            </div>
        </React.Fragment>
    );
}
