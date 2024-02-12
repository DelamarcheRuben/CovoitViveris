import React from "react";
import { ResearchProfile } from "./ResearchProfile";
import { NavLink } from "react-router-dom";

export function ResearchCarShareView(carshare){

    console.log(carshare)

    return (
        <React.Fragment>
            {window.innerWidth < 1105 &&
                <div className="carShare-research">
                    <div className="row">
                        <div className="col">
                            <p>A</p>
                        </div>
                        <div className="col">
                            <p>B</p>
                        </div>
                        <div className="col">
                            <p>C</p>
                        </div>
                    </div>
                </div>
            }
            
            
            {window.innerWidth >= 1105 && 
                <div className="carShare-research">
                    <div className="row">
                        <div className="col">
                            <p style={{ paddingTop:"25px", paddingLeft:"25px"}}><strong style={{ fontSize:"20px" }}>{carshare.carshare.schedule.substring(0, 10)}</strong></p>
                            <div className="col" style={{ padding: "20px"}}>
                                <div className="row center-div-picture">
                                    <div className="col" style={{ display:"flex", maxWidth:"70px" }}>
                                        <p><strong>{carshare.carshare.schedule.substring(11, 16)}</strong></p>
                                    </div>
                                    <div className="col" style={{ display:"flex", justifyContent:"right", maxWidth:"100px"}}>
                                        <div className="circle"></div>
                                    </div>
                                    <div className="col">
                                        <p><strong style={{ fontSize:"18px" }}>{carshare.carshare.start_place}</strong></p>
                                    </div>
                                </div>
                                <div className="row center-div-picture">
                                    <div className="col" style={{ display:"flex", maxWidth:"70px", marginTop:"-30px" }}>
                                        {/* <i style={{ fontSize:"14px" }}>{carshare.carShareTime}</i> */}
                                        <i style={{ fontSize:"14px" }}>1h15</i>
                                    </div>
                                    <div className="col" style={{ display:"flex", justifyContent:"right", maxWidth:"100px", marginTop:"-2px", height:"50px"}}>
                                        <div className="line-50"></div>
                                    </div>
                                    <div className="col">
                                    </div>
                                </div>
                                <div className="row center-div-picture" >
                                    <div className="col" style={{ display:"flex", maxWidth:"70px" }}>
                                        <p><strong>12:00</strong></p>
                                    </div>
                                    <div className="col" style={{ display:"flex", justifyContent:"right", maxWidth:"100px"}}>
                                        <div className="circle"></div>
                                    </div>
                                    <div className="col">
                                        <p><strong style={{ fontSize:"18px" }}>{carshare.carshare.end_place}</strong></p>
                                    </div>
                                </div>
                            </div>                        
                        </div>
                        <div className="col" style={{ maxWidth:"450px" }}>
                            <ResearchProfile userid={carshare.carshare.driver.uid}/>
                        </div>
                        <div className="col" style={{ marginRight:"3%", maxWidth:"300px"}}>
                            <div className="row" >
                                <div className="col" style={{ marginTop:"45px", justifyContent:"right", display:"grid"}}>
                                    <p><strong style={{ fontSize:"20px" }}>895g CO<sub>2</sub> économisés</strong></p>
                                </div>
                                <div className="col" style={{ marginTop:"45px", justifyContent:"right", display:"grid", maxWidth:"90px" }}>
                                    <img className="" style={{ width:"80px" }} src={`../src/images/co2/co2_vert.png`} alt="Image CO2"/>
                                </div>
                            </div>
                            <div className="row" style={{ marginTop:"30px", justifyContent:"right", display:"grid" }}>
                                <NavLink to={`/research/bookCarShare/${carshare.carshare.uid}`}>
                                    <button className="btn" style={{ width: "40px" }}><strong style={{ fontSize:"20px"}}>&gt;</strong></button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
    );
}