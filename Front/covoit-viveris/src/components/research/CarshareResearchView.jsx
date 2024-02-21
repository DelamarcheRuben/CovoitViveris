import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { useWindowWidth } from "../../context/WindowWidthContext.jsx";
import { CarshareResearchProfile } from "./CarshareResearchProfile.jsx";


export function CarshareResearchView(carshare){
    const navigate = useNavigate();
    const windowWidth = useWindowWidth();

    const redirectToBookCarshareView = () => {
        navigate('/research/book-carshare', { state: { carshare: carshare.carshare } });
    };

    return (
        <React.Fragment>
            {windowWidth < 1105 &&
                <div className="carShare-research">
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
                                <i style={{ fontSize:"14px" }}>{carshare.carshare.duration}</i>
                            </div>
                            <div className="col" style={{ display:"flex", justifyContent:"right", maxWidth:"50px", marginTop:"-19px", height:"30px"}}>
                                <div className="line-50"></div>
                            </div>
                            <div className="col" style={{ maxWidth:"80%" }}>
                                <img className="" style={{ width:"40px", float:"right" }} src={`../../src/images/co2/co2_vert.png`} alt="Image CO2"/>
                            </div>
                        </div>
                        <div className="row center-div-picture" >
                            <div className="col" style={{ display:"flex", maxWidth:"50px" }}>
                                <p><strong>{carshare.carshare.endHour}</strong></p>
                            </div>
                            <div className="col" style={{ display:"flex", justifyContent:"right", maxWidth:"50px"}}>
                                <div className="carshare-circle"></div>
                            </div>
                            <div className="col" style={{ maxWidth:"80%", marginLeft:"-10px" }}>
                                <p style={{ lineHeight:"16px" }}><strong style={{ fontSize:"14px"}}>{carshare.carshare.end_place.houseRoad}, <br></br>{carshare.carshare.end_place.cityPostcode}</strong></p>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ maxWidth:"90%" }}>
                        <div className="col" style={{ maxWidth:"90%" }}>
                            <CarshareResearchProfile userid={carshare.carshare.driver.uid}/>
                        </div>
                        <div className="col" style={{ maxWidth:"10%" }}>
                            <button onClick={redirectToBookCarshareView} className="btn" style={{ width: "40px" }}><strong style={{ fontSize:"20px"}}>&gt;</strong></button>
                        </div>
                    </div>
                </div>
            }
            
            
            {windowWidth >= 1105 && 
                <div className="carShare-research">
                    <div className="row">
                        <div className="col">
                            <p style={{ paddingTop:"25px", paddingLeft:"25px"}}><strong style={{ fontSize:"20px" }}>{carshare.carshare.schedule.substring(0, 10)}</strong></p>
                            <div className="col" style={{ padding: "20px", minWidth:"450px" }}>
                                <div className="row center-div-picture">
                                    <div className="col" style={{ display:"flex", maxWidth:"70px" }}>
                                        <p><strong>{carshare.carshare.schedule.substring(11, 16)}</strong></p>
                                    </div>
                                    <div className="col" style={{ display:"flex", justifyContent:"right", maxWidth:"50px"}}>
                                        <div className="carshare-circle"></div>
                                    </div>
                                    <div className="col">
                                        <p><strong style={{ fontSize:"17px" }}>{carshare.carshare.start_place.houseRoad}, <br></br>{carshare.carshare.start_place.cityPostcode}</strong></p>
                                    </div>
                                </div>
                                <div className="row center-div-picture">
                                    <div className="col" style={{ display:"flex", maxWidth:"70px", marginTop:"-30px" }}>
                                        {/* <i style={{ fontSize:"14px" }}>{carshare.carShareTime}</i> */}
                                        <i style={{ fontSize:"14px" }}>{carshare.carshare.duration}</i>
                                    </div>
                                    <div className="col" style={{ display:"flex", justifyContent:"right", maxWidth:"50px", marginTop:"-13px", height:"50px"}}>
                                        <div className="line-60"></div>
                                    </div>
                                    <div className="col">
                                    </div>
                                </div>
                                <div className="row center-div-picture" >
                                    <div className="col" style={{ display:"flex", maxWidth:"70px" }}>
                                        <p><strong>{carshare.carshare.endHour}</strong></p>
                                    </div>
                                    <div className="col" style={{ display:"flex", justifyContent:"right", maxWidth:"50px"}}>
                                        <div className="carshare-circle"></div>
                                    </div>
                                    <div className="col">
                                        <p><strong style={{ fontSize:"17px" }}>{carshare.carshare.end_place.houseRoad}, <br></br>{carshare.carshare.end_place.cityPostcode}</strong></p>
                                    </div>
                                </div>
                            </div>                        
                        </div>
                        <div className="col" style={{ maxWidth:"500px" }}>
                            <CarshareResearchProfile userid={carshare.carshare.driver.uid}/>
                        </div>
                        <div className="col" style={{ marginRight:"3%", maxWidth:"350px"}}>
                            <div className="row" >
                                <div className="col" style={{ marginTop:"45px", justifyContent:"right", display:"grid"}}>
                                    <p><strong style={{ fontSize:"20px" }}>895g CO<sub>2</sub> économisés</strong></p>
                                </div>
                                <div className="col" style={{ marginTop:"45px", justifyContent:"right", display:"grid", maxWidth:"90px" }}>
                                    <img className="" style={{ width:"80px" }} src={`../src/images/co2/co2_vert.png`} alt="Image CO2"/>
                                </div>
                            </div>
                            <div className="row" style={{ marginTop:"30px", justifyContent:"right", display:"grid" }}>
                                <button onClick={redirectToBookCarshareView} className="btn" style={{ width: "40px" }}><strong style={{ fontSize:"20px"}}>&gt;</strong></button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
    );
}