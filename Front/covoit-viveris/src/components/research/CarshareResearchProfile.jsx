import React, { useEffect, useState } from "react";

export function CarshareResearchProfile(userid){

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
            {userDriver &&
                <div>
                    <div className="row" style={{ marginTop: "25px" }}>
                        <div className="col center-picture" style={{ maxWidth:"160px" }}>
                            <img src="./src/images/profil_picture.png" alt="Photo profil" width="150px"/>
                            {/* <p className={`color-company ${marginClass}`} style={{ marginTop: "-58px" }}><strong>{u.user.experience}</strong></p> */}
                        </div>
                        <div className="col">
                            <p style={{ marginTop: "15px", fontSize: "20px" }}><strong>{userDriver.pseudo}</strong></p>
                            <p style={{ fontSize:  "14px" }}>{userDriver.job}, {userDriver.city}</p>
                            <p><em style={{ fontSize:  "14px" }}>{userDriver.nb_carshares} covoiturages, {userDriver.kilometers} km parcourus</em></p>
                        </div>
                    </div>
                </div>
            }
            {/* <img className="center-picture" src="./src/images/profil_picture.png" alt="Photo profil" style={{ width: "250px", marginTop: "-150px" }}/> */}

        </React.Fragment>
    );
}