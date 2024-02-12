import React, { useEffect, useState } from "react";
import { BookCarShareProfile } from "./BookCarShareProfile";

export function BookCarShareViewDriver(userDriver){

    const [ownedBadges, setOwnedBadges] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/ownedbadges?user_id="+userDriver.carDriver.uid)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data)
            setOwnedBadges(data);
        });
    }, []);


    return (
        <React.Fragment>
            {userDriver && ownedBadges && 
            <div className="large-screen profile-booking" style={{ marginTop:"35px" }} >
                <div className="row">
                    <img className="center-picture" src={`../../src/images/background_profile/background_${userDriver.carDriver.picture_background}.png`} alt="Photo profil" style={{ marginTop:"-25px", width: "100%", maxHeight:"125px" }}/>
                </div>
                <div className="row">
                    <div className="col">
                        <BookCarShareProfile userid={userDriver.carDriver.uid}/>
                    </div>
                    <div className="col" style={{ maxWidth:"10px" }}>
                        <div className="line-company-color"></div>
                    </div>
                    <div className="col">
                    
                    </div>
                    <div className="col" style={{ maxWidth:"10px" }}>
                        <div className="line-company-color"></div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <p className="center"><strong style={{ fontSize:"20px" }}>Bagdes :</strong></p>
                        </div>
                        <div className="row">
                            <div className="container-badge-booking" style={{ marginTop:"25px", marginLeft:"-15px" }}>
                                {ownedBadges.map((data, index) => (
                                    <div key={index} className="item-badge-booking">
                                        <img className="center-picture" src={`../../src/images/badge/${data.badge.picture_badge}_${data.level}.png`} alt={`Badge ${data.badge.title}`} width="100%"/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </React.Fragment>
    );
}