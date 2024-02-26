import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../context/UserContext";
import { DetailsCarshareProfilePassengers } from "./DetailsCarshareProfilePassengers";
import { useWindowWidth } from "../../context/WindowWidthContext";

export function DetailsCarshareView({ idCarshare }) {

    const { user } = useUser();
    const windowWidth = useWindowWidth();
    const navigate = useNavigate();

    const [passengers, setPassengers] = useState([]);

    const handleDetailsClick = () => {
        navigate("/end-carshare",  {state: {idCarshare: idCarshare}})
    };

  useEffect(() => {


    const fetchCarshare = async () => {
      try {
        const response = await fetch("http://localhost:8080/passengers?id_carshare="+idCarshare);
        var data_json  = await response.json();
        setPassengers(data_json);

      } catch (error) {
        console.error("Erreur lors de la récupération des passagers :", error);
        navigate("/home");
      }
    }

    fetchCarshare();
  }, [user, idCarshare]);

  return (
    user && (
      <React.Fragment>
        {windowWidth < 1105 && passengers && (
          <div>
            <p className="center"><strong style={{fontSize:"30px"}}>Passagers : </strong></p>
            <div className="row center-div-picture">
              {passengers.length === 0 
                  ? <p className="center"><strong style={{ fontSize:"20px" }}>Aucun passager pour le moment...</strong></p>
                  :
                  passengers.map((p, index) => (
                  <div key={index} style={{ maxWidth: "350px" }}>
                      <React.Fragment key={index}>
                        <DetailsCarshareProfilePassengers key={index} uid_user={p.uid.uid_passenger} />
                      </React.Fragment>
                  </div>
                ))}
            </div>
          </div>
        )}

        {windowWidth >= 1105 && passengers && (
          <div>
          <p className="center"><strong style={{fontSize:"40px"}}>Passagers : </strong></p>
            <div className="row center-div-picture">
              <div className="container-profile-friend" style={{ marginTop: "5px", maxWidth: "85%" }}>
                  {passengers.length === 0 
                      ? <p className="center-picture"><strong style={{ fontSize:"30px" }}>Aucun passager pour le moment...</strong></p>
                      :
                      passengers.map((p, index) => (
                      <div key={index} className="item-profile-friend" style={{ maxWidth: "400px" }}>
                          <React.Fragment key={index}>
                          <DetailsCarshareProfilePassengers key={index} uid_user={p.uid.uid_passenger} />
                          </React.Fragment>
                      </div>
                      ))
                  }
              </div>
            </div>
          </div>
        )}

        {passengers.length === 0
          ? <button className="btn-details-disabled center-picture" onClick={handleDetailsClick} style={{ marginTop: "25px" }} disabled="true">Valider</button>
          : <button className="btn-details center-picture" onClick={handleDetailsClick} style={{ marginTop: "25px" }}>Valider</button>
        }
      </React.Fragment>
    )
  );
}
