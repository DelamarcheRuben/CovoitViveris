import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";

export function ProfileCarSharesView(carshare){

    const { user } = useUser();

    return (user &&
        <React.Fragment>
            { user && carshare &&
            <div className="carShare-history-profile">
                <div className="row">
                    <p className="center" style={{ paddingTop:"5px"}}><strong style={{ fontSize:"14px" }}>{carshare.carshare.schedule.substring(0, 10)}</strong></p>
                </div>
                <div className="row" style={{ marginTop:"10px", marginLeft:"1%" }}>
                    <div className="row center-div-picture">
                        <div className="col" style={{ display:"flex", maxWidth:"50px" }}>
                            <p><strong>{carshare.carshare.schedule.substring(11, 16)}</strong></p>
                        </div>
                        <div className="col" style={{ display:"flex", justifyContent:"right", maxWidth:"50px"}}>
                            <div className="carshare-circle"></div>
                        </div>
                        <div className="col" style={{ maxWidth:"80%", marginLeft:"-10px" }}>
                            <p style={{ lineHeight:"16px" }}><strong style={{ fontSize:"14px"}}>{carshare.carshare.start_place.houseRoad}, <br></br>{carshare.carshare.start_place.cityPostcode}</strong></p>
                        </div>
                    </div>
                    <div className="row center-div-picture">
                        <div className="col" style={{ display:"flex", maxWidth:"50px", marginTop:"-10px" }}>
                            <i style={{ fontSize:"14px" }}>1h15</i>
                        </div>
                        <div className="col" style={{ display:"flex", justifyContent:"right", maxWidth:"50px", marginTop:"-5px", height:"30px"}}>
                            <div className="line-35"></div>
                        </div>
                        <div className="col" style={{ width:"40px" }}>
                        </div>
                    </div>
                    <div className="row center-div-picture" >
                        <div className="col" style={{ display:"flex", maxWidth:"50px" }}>
                            <p><strong>12:00</strong></p>
                        </div>
                        <div className="col" style={{ display:"flex", justifyContent:"right", maxWidth:"50px"}}>
                            <div className="carshare-circle"></div>
                        </div>
                        <div className="col" style={{ maxWidth:"80%", marginLeft:"-10px" }}>
                            <p style={{ lineHeight:"16px" }}><strong style={{ fontSize:"14px"}}>{carshare.carshare.end_place.houseRoad}, <br></br>{carshare.carshare.end_place.cityPostcode}</strong></p>
                        </div>
                    </div>
                </div>
                <div className="row" style={{ marginTop:"10px" }}>
                    <div className="col">
                    {
                        user.uid == carshare.carshare.driver.uid
                        ?
                        <div>
                            <img className="center-picture" src={`../../src/images/logo/driver.png`} width="50px" style={{ marginBottom:"10px" }}/>
                            <p className="center history-carshare-driver">CONDUCTEUR</p>
                        </div>
                        :
                        <div>
                            <img className="center-picture" src={`../../src/images/logo/passenger.png`}  width="50px" style={{ marginBottom:"10px" }}/>
                            <p className="center history-carshare-passenger">PASSAGER</p>
                        </div>
                    }
                    </div>
                    <div className="col" style={{ marginLeft:"-30px" }}>
                        <img className="center-picture" style={{ width:"50px" }} src={`../../src/images/co2/co2_vert.png`} alt="Image CO2"/>
                        <p className="center"><strong style={{ fontSize:"15px" }}>522 g CO2 économisés</strong></p>
                        <p className="center"><strong style={{ fontSize:"15px" }}>44 XP gagnés</strong></p>
                    </div>
                </div>
            </div>
            }

        </React.Fragment>
    );
}
