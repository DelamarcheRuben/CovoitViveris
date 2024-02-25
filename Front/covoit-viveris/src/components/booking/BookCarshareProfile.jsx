import React, { useEffect, useState } from "react";
import { useWindowWidth } from "../../context/WindowWidthContext";

export function BookCarshareProfile(userid){

    const windowWidth = useWindowWidth();

    const [userDriver, setUserDriver] = useState();

    useEffect(() => {
        fetch("http://localhost:8080/user/"+userid.userid)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setUserDriver(data);
        });
    }, []);

    return (
        <React.Fragment>
            {windowWidth < 1105 && userDriver &&
                <div>
                    <div className="row" style={{ marginTop: "-50px"}}>
                        <img className="center-picture" src={`../../src/images/profile_picture/profile_picture_${userDriver.picture_profile}.png`} alt="Photo profil" style={{ width:"150px" }}/>
                        <p className={"center color-company"} style={{ marginTop: "-35px" }}><strong style={{ fontSize:"15px" }}>{userDriver.level}</strong></p>
                        <div style={{marginTop:"-10px"}}>
                            <p className="center" style={{ marginTop: "15px", fontSize: "20px" }}><strong>{userDriver.pseudo}</strong></p>
                            <p className="center" style={{ fontSize:  "14px" }}>{userDriver.job}, {userDriver.address.city}</p>
                            <p className="center"><em style={{ fontSize:  "14px" }}>{userDriver.nb_carshares} covoiturages, {userDriver.kilometers} km parcourus</em></p>
                        </div>
                    </div>
                </div>
            }



            {windowWidth >= 1105 && userDriver &&
                <div>
                    <div className="row" style={{ marginTop: "-100px"}}>
                        <img className="center-picture" src={`../../src/images/profile_picture/profile_picture_${userDriver.picture_profile}.png`} alt="Photo profil" style={{ width:"200px" }}/>
                        <p className={"center color-company"} style={{ marginTop: "-45px" }}><strong>{userDriver.level}</strong></p>
                        <div style={{ marginLeft:"45px", marginTop:"-10px"}}>                        
                            <p style={{ marginTop: "15px", fontSize: "20px" }}><strong>{userDriver.pseudo}</strong></p>
                            <p style={{ fontSize:  "14px" }}>{userDriver.job}, {userDriver.address.city}</p>
                            <p><em style={{ fontSize:  "14px" }}>{userDriver.nb_carshares} covoiturages, {userDriver.kilometers} km parcourus</em></p>
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
    );
}