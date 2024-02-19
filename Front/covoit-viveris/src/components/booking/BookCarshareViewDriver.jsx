import React, { useEffect, useState } from "react";
import { BookCarshareProfile } from "../booking/BookCarshareProfile.jsx"
import { useWindowWidth } from "../../context/WindowWidthContext.jsx";

export function BookCarshareViewDriver(userDriver){

    const windowWidth = useWindowWidth();

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
            {windowWidth < 1105 && userDriver && ownedBadges && 
            <div className="small-screen profile-booking-small" style={{ marginTop:"35px" }} >
                <div className="row">
                    <img className="center-picture" src={`../../src/images/background_profile/background_${userDriver.carDriver.picture_background}.png`} alt="Photo profil" style={{ marginTop:"-25px", width: "100%", maxHeight:"125px" }}/>
                </div>
                <div className="row">
                    <BookCarshareProfile userid={userDriver.carDriver.uid}/>
                </div>
                <div className="col center-div-picture">
                    <div className="line-company-color-horizontal"></div>
                </div>
                <div className="row" style={{ marginTop:"15px" }}>
                    <p className="center"> Amis en commun : </p>
                    <button className="btn" style={{ width: "150px", marginTop:"10px" }}><strong style={{ fontSize:"15px"}}>Ajouter en ami</strong></button>
                </div>
                <div className="col center-div-picture">
                    <div className="line-company-color-horizontal"></div>
                </div>
                <div className="row">
                    <p className="center"><strong style={{ fontSize:"20px" }}>Badges :</strong></p>
                </div>
                <div className="row center-div-picture">
                    <div className="container-badge-booking" style={{ marginTop:"5px", maxWidth:"85%" }}>
                        {ownedBadges.map((data, index) => (
                            <div key={index} className="item-badge-booking">
                                <img className="center-picture" src={`../../src/images/badge/${data.badge.picture_badge}_${data.level}.png`} alt={`Badge ${data.badge.title}`} width="50%"/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            }

            {windowWidth >= 1105 && userDriver && ownedBadges && 
            <div className="large-screen profile-booking" style={{ marginTop:"35px", maxWidth:"60%" }} >
                <div className="row">
                    <img className="center-picture" src={`../../src/images/background_profile/background_${userDriver.carDriver.picture_background}.png`} alt="Photo profil" style={{ marginTop:"-25px", width: "100%", maxHeight:"125px" }}/>
                </div>
                <div className="row">
                    <div className="col">
                        <BookCarshareProfile userid={userDriver.carDriver.uid}/>
                    </div>
                    <div className="col" style={{ maxWidth:"10px" }}>
                        <div className="line-company-color"></div>
                    </div>
                    <div className="col center-div-picture">
                        <div className="row">
                            <p className="center"> Amis en commun : </p>
                            <button className="btn" style={{ width: "10vw", marginTop:"15px" }}><strong style={{ fontSize:"1.2vw"}}>Ajouter en ami</strong></button>
                        </div>
                    </div>
                    <div className="col" style={{ maxWidth:"10px" }}>
                        <div className="line-company-color"></div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <p className="center"><strong style={{ fontSize:"20px" }}>Badges :</strong></p>
                        </div>
                        <div className="row">
                            <div className="container-badge-booking" style={{ marginTop:"5px", marginLeft:"-15px" }}>
                                {ownedBadges.map((data, index) => (
                                    <div key={index} className="item-badge-booking">
                                        <img className="center-picture" src={`../../src/images/badge/${data.badge.picture_badge}_${data.level}.png`} alt={`Badge ${data.badge.title}`} width="80%"/>
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