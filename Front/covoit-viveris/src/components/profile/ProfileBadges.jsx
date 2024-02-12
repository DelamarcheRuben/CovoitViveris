import React from "react";
import { useState, useEffect } from 'react';
import { useUser } from "../../context/UserContext";
import { Tooltip } from "../Tooltip";


export function ProfileBadges(){
    const { user } = useUser();
    const [badges, setBadges] = useState([]);
    const [ownedBadges, setOwnedBadges] = useState([]);

    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    useEffect(() => {
        fetch("http://localhost:8080/badges")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setBadges(data);
        });

        fetch("http://localhost:8080/ownedbadges?user_id="+user.uid)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setOwnedBadges(data);
        });
      }, []);

    const goalBadge = [];
    for (let index = 0; index < badges.length; index++) {
        goalBadge.push(badges[index].goals.split(", "))
    }

    var badgeData = []

    for (let index = 0; index < badges.length; index++) {
        var item = badges[index];
        //le num badge à afficher est le level du badge pour user actuel
        var num_badge = ownedBadges.find((element) => element.uid.uid_badge === item.uid);
        if(num_badge===undefined) num_badge = 0;
        else num_badge = num_badge.level;

        const tooltipContent = "Bronze &nbsp; : " + goalBadge[index][0] + "<br>Argent &nbsp;&nbsp; : " + 
                            goalBadge[index][1] + " <br>Or &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : " + 
                            goalBadge[index][2] + " <br>Diamant : " + goalBadge[index][3]

        badgeData.push({
            title: item.name_badge,
            description: item.description,
            picture: item.picture_badge.substring(0, (item.picture_badge.length))+"_",
            num_badge: num_badge,
            content: tooltipContent
        })
    }

    return (
        <React.Fragment>
            {window.innerWidth < 1105 && 
            <div className="small-screen">
                <div className="badge-view-small">
                    <p><strong className="center-div-picture" style={{ fontSize:"20px", paddingTop:"15px" }}>GALERIES DE BADGES : </strong></p>
                    
                    {badgeData.map((data, index) => (
                        <div className="row center-picture" style={{ marginTop:"20px" }}>
                            <div className="col" style={{ maxWidth:"75px", marginLeft:"5%" }}>
                                <img className="center-picture" src={`../src/images/badge/${data.picture}${data.num_badge}.png`} alt={`Badge ${data.title}`} width="100%"/>
                            </div>
                            <div className="col" style={{ maxWidth:"300px"}}>
                                <p className="center"><strong style={{ fontSize:"15px" }}>{data.title}</strong></p>
                                <p className="center" style={{ fontStyle:"italic" }}>{data.description}</p>                            
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
            }


            {window.innerWidth >= 1105 && 
            <div className="large-screen" style={{ marginTop:"20px"}}>
                <div className="badge-view">
                    <p><strong className="center-div-picture" style={{ fontSize:"20px", paddingTop:"15px" }}>GALERIES DE BADGES : </strong></p>
                    
                    {badgeData.map((data, index) => (
                        <div className="row center-picture" style={{ marginTop:"20px" }}>
                            <div className="col" style={{ maxWidth:"50px", marginLeft:"5%" }}>
                                <Tooltip content={data.content}>
                                    <div className="info-badge-circle">
                                        <span style={{ color: 'white', fontSize: '16px'}}>i</span>
                                    </div>
                                </Tooltip>
                            </div>
                            <div className="col" style={{ maxWidth:"100px", marginLeft:"5%" }}>
                                <img className="large-screen center-picture" src={`../src/images/badge/${data.picture}${data.num_badge}.png`} alt={`Badge ${data.title}`} width="100%"/>
                            </div>
                            <div className="col" style={{ width:"80px"}}>
                                <p className="center"><strong style={{ fontSize:"19px" }}>{data.title}</strong></p>
                                <p className="center" style={{ fontStyle:"italic" }}>{data.description}</p>                            
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
            }
        </React.Fragment>
    );
}
