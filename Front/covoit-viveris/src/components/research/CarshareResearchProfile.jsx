import React, { useEffect, useState } from "react";
import { useWindowWidth } from "../../context/WindowWidthContext";

export function CarshareResearchProfile(userid){

    const windowWidth = useWindowWidth();
    const [userDriver, setUserDriver] = useState();
    const [marginClass, setMarginClass] = useState();

    useEffect(() => {
        fetch("http://localhost:8080/user/"+userid.userid)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setUserDriver(data);

            let marginClass;
            if (data.level < 10) {
                marginClass = 'margin1';
            } else if (data.level < 100) {
                marginClass = 'margin2';
            } else {
                marginClass = 'margin3';
            }
            setMarginClass(marginClass);
        });
    }, []);

    return (
        <React.Fragment>
            
            {windowWidth < 1105 && userDriver &&
                <div className="row center-div-picture">
                    <div className="col center-div-picture">
                        <div className="row">
                            <img style={{ width:"130px" }} src="../../src/images/profil_picture.png" alt="Photo profil"/>
                            <p className={`center color-company ${marginClass}-small-research`} style={{ marginTop: "-47px" }}><strong style={{ fontSize:"10px" }}>{userDriver.level}</strong></p> 
                        </div>
                    </div>
                    <div className="col" style={{ maxWidth:"50%", marginTop:"20px" }}>
                        <p style={{ fontSize: "15px", marginTop: "-20px" }}><strong>{userDriver.pseudo}</strong></p>
                        <p style={{ fontSize: "12px" }}>{userDriver.job}, {userDriver.address.city}</p>
                    </div>
                </div>
            }

            {windowWidth >= 1105 && userDriver && marginClass &&
                <div>
                    <div className="row" style={{ marginTop: "-20px" }}>
                        <div className="col">
                            <img src="../../src/images/profil_picture.png" alt="Photo profil" width="150px"/>
                            <p className={`color-company ${marginClass}-research`} style={{ marginTop: "-45px" }}><strong style={{ fontSize:"15px" }}>{userDriver.level}</strong></p> 
                            <p style={{ fontSize: "20px", marginTop: "10px" }}><strong>{userDriver.pseudo}</strong></p>
                            <p style={{ fontSize:  "14px" }}>{userDriver.job}, {userDriver.address.city}</p>
                            <p><em style={{ fontSize:  "14px" }}>{userDriver.nb_carshares} covoiturages, {userDriver.kilometers} km parcourus</em></p>
                        </div>
                    </div>
                </div>
            }

        </React.Fragment>
    );
}