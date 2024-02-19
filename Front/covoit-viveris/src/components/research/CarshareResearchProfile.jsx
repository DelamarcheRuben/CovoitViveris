import React, { useEffect, useState } from "react";
import { useWindowWidth } from "../../context/WindowWidthContext";

export function CarshareResearchProfile(userid){

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
                <div className="row center-div-picture">
                    <div className="col center-div-picture" style={{ maxWidth:"30%" }}>
                        <img src="../../src/images/profil_picture.png" alt="Photo profil" width="100px"/>
                    </div>
                    <div className="col" style={{ maxWidth:"50%", marginTop:"20px" }}>
                        <p style={{ fontSize: "15px", marginTop: "-20px" }}><strong>{userDriver.pseudo}</strong></p>
                        <p style={{ fontSize: "12px" }}>{userDriver.job}, {userDriver.address.city}</p>
                    </div>
                </div>
            }

            {windowWidth >= 1105 && userDriver &&
                <div>
                    <div className="row" style={{ marginTop: "-20px" }}>
                        <div className="col">
                            <img src="../../src/images/profil_picture.png" alt="Photo profil" width="150px"/>
                            <p style={{ fontSize: "20px", marginTop: "-20px" }}><strong>{userDriver.pseudo}</strong></p>
                            <p style={{ fontSize:  "14px" }}>{userDriver.job}, {userDriver.address.city}</p>
                            <p><em style={{ fontSize:  "14px" }}>{userDriver.nb_carshares} covoiturages, {userDriver.kilometers} km parcourus</em></p>
                        </div>
                    </div>
                </div>
            }
            {/* <img className="center-picture" src="./src/images/profil_picture.png" alt="Photo profil" style={{ width: "250px", marginTop: "-150px" }}/> */}

        </React.Fragment>
    );
}