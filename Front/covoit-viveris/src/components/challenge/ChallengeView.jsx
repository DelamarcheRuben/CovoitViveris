import React from "react";
import { useWindowWidth } from "../../context/WindowWidthContext.jsx";


export function ChallengeView(challenge){
    const windowWidth = useWindowWidth();


    return (
        <React.Fragment>
            {windowWidth < 1105 &&
                <div className="challenge-view">
                    <div className="row">
                        <p className="center" style={{ paddingTop:"5px"}}>
                            <strong style={{ fontSize:"14px" }}>{challenge.name}</strong>
                        </p>
                    </div>
                    <div className="row" style={{ marginTop:"10px", marginLeft:"1%" }}>
                        <p style={{ lineHeight:"16px" }}>
                            <strong style={{ fontSize:"14px"}}>{challenge.description}</strong>
                        </p>
                    </div>
                </div>
            }

            {windowWidth >= 1105 &&
                <div className="challenge-view">
                    <div className="row">
                        <div className="col">
                            <p style={{ paddingTop:"25px", paddingLeft:"25px"}}>
                                <strong style={{ fontSize:"20px" }}>{challenge.name}</strong>
                            </p>
                            <p style={{ padding: "20px" }}>
                                <strong style={{ fontSize:"17px" }}>{challenge.description}</strong>
                            </p>
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
    );
}