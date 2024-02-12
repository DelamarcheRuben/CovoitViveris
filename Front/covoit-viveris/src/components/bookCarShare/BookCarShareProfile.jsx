import React, { useEffect, useState } from "react";

export function BookCarShareProfile(userid){

    const [userDriver, setUserDriver] = useState();

    useEffect(() => {
        fetch("http://localhost:8080/user/"+userid.userid)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data)
            setUserDriver(data);
          });
    }, []);

    return (
        <React.Fragment>
            {userDriver &&
                <div>
                    <div className="row" style={{ marginTop: "-145px"}}>
                        <img className="center-picture" src="../../src/images/profil_picture.png" alt="Photo profil" style={{ width:"200px" }}/>
                        <div style={{ marginLeft:"45px", marginTop:"-30px"}}>
                            <p style={{ marginTop: "15px", fontSize: "20px" }}><strong>{userDriver.pseudo}</strong></p>
                            <p style={{ fontSize:  "14px" }}>{userDriver.job}, {userDriver.city}</p>
                            <p><em style={{ fontSize:  "14px" }}>{userDriver.nb_carshares} covoiturages, {userDriver.kilometers} km parcourus</em></p>
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
    );
}