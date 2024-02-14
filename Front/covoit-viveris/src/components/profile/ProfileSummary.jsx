import React from "react";
import { useUser }        from "../../context/UserContext";
import { useWindowWidth } from "../../context/WindowWidthContext";

export function ProfileSummary(){

    const { user } = useUser();
    const windowWidth = useWindowWidth();

    return (
        <React.Fragment>
            {windowWidth < 1105 &&
            <div className="small-screen">
                <div className="row" style={{ marginTop:"10px" }}>
                    <div className="col center">
                        <div className="profile-horizontal-line" style={{ marginLeft: "auto" }}></div>
                    </div>
                    <div className="col center">
                        <p><strong style={{ fontSize: "25px" }}>Résumé</strong></p>
                    </div>
                    <div className="col center">
                        <div className="profile-horizontal-line"></div>
                    </div>
                </div>

                <div className="row" style={{ marginLeft:"12.5%"}}>
                    <div className="col" style={{ minWidth:"200px" }}>
                        <p>Distances parcourues  </p>
                        <p>Covoiturages effectués</p>
                        <p>Nombre total de badges</p>
                        <p>Date de début         </p>
                    </div>
                    <div className="col">
                        <p>{user.kilometers} km</p>
                        <p>{user.nb_carshares} </p>
                        <p>{user.nb_badges}    </p>
                        <p>{user.start_date}   </p>
                    </div>
                </div>
            </div>
            }


            {windowWidth >= 1105 && 
            <div className="large-screen">
                <div className="row" style={{ marginTop:"10px" }}>
                    <div className="col center">
                        <div className="profile-horizontal-line" style={{ marginLeft:"auto" }}></div>
                    </div>
                    <div className="col center" style={{ maxWidth:"400px" }}>
                        <p><strong style={{ fontSize: "35px" }}>Mon résumé</strong></p>
                    </div>
                    <div className="col center">
                        <div className="profile-horizontal-line"></div>
                    </div>
                </div>

                <div className="row" style={{ marginLeft:"25%", fontSize:"30px"}}>
                    <div className="col" >
                        <p style={{ fontSize:"22px"}}>Distances parcourues  </p>
                        <p style={{ fontSize:"22px"}}>Covoiturages effectués</p>
                        <p style={{ fontSize:"22px"}}>Nombre total de badges</p>
                        <p style={{ fontSize:"22px"}}>Date de début         </p>
                    </div>
                    <div className="col">
                        <p style={{ fontSize:"22px"}}>{user.kilometers} km</p>
                        <p style={{ fontSize:"22px"}}>{user.nb_carshares} </p>
                        <p style={{ fontSize:"22px"}}>{user.nb_badges}    </p>
                        <p style={{ fontSize:"22px"}}>{user.start_date}   </p>
                    </div>
                </div>
            </div>
            }
        </React.Fragment>
    );
}