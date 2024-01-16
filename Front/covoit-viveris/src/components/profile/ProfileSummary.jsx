import React from "react";

export function ProfileSummary(u){

    const ligneStyle = {
        height: '2px',  // Hauteur de la ligne
        backgroundColor: 'blue',  // Couleur de fond de la ligne
        margin: '10px 0',  // Marge autour de la ligne (ajustez selon vos besoins)
      };

    return (
        <React.Fragment>
            <div className="small-screen">
                <div className="row">
                    <div className="col center">
                        <div class="horizontal-line" style={{ marginLeft: "auto" }}></div>
                    </div>
                    <div className="col center">
                        <p><strong style={{ fontSize: "6vw" }}>Résumé</strong></p>
                    </div>
                    <div className="col center">
                        <div class="horizontal-line"></div>
                    </div>
                </div>

                <div className="row" style={{ marginLeft:"12.5%"}}>
                    <div className="col" style={{ minWidth:"200px" }}>
                        <p>Distances parcourues</p>
                        <p>Covoiturages effectués</p>
                        <p>Nombre total de badges</p>
                        <p>Date de début</p>
                    </div>
                    <div className="col">
                        <p>{u.user.kilometers} km</p>
                        <p>{u.user.nb_carshares}</p>
                        <p>{u.user.nb_badges}</p>
                        <p>{u.user.start_date}</p>
                    </div>
                </div>
            </div>

            <div className="large-screen">
                <div className="row">
                    <div className="col center">
                        <div class="horizontal-line" style={{ marginLeft:"auto" }}></div>
                    </div>
                    <div className="col center" style={{ maxWidth:"400px" }}>
                        <p><strong style={{ fontSize: "50px" }}>Mon résumé</strong></p>
                    </div>
                    <div className="col center">
                        <div class="horizontal-line"></div>
                    </div>
                </div>

                <div className="row" style={{ marginLeft:"25%", fontSize:"30px"}}>
                    <div className="col" >
                        <p style={{ fontSize:"22px"}}>Distances parcourues</p>
                        <p style={{ fontSize:"22px"}}>Covoiturages effectués</p>
                        <p style={{ fontSize:"22px"}}>Nombre total de badges</p>
                        <p style={{ fontSize:"22px"}}>Date de début</p>
                    </div>
                    <div className="col">
                        <p style={{ fontSize:"22px"}}>{u.user.kilometers} km</p>
                        <p style={{ fontSize:"22px"}}>{u.user.nb_carshares}</p>
                        <p style={{ fontSize:"22px"}}>{u.user.nb_badges}</p>
                        <p style={{ fontSize:"22px"}}>{u.user.start_date}</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}