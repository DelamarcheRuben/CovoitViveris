import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";

export function DetailsCarshareProfilePassengers(passengerID) {
    const { user } = useUser();
        
    const [passenger, setPassenger] = useState(null);
    const [commonCarshares, setCommonCarshares] = useState([]);

  useEffect(() => {
    const fetchCarshare = async () => {
      try {
        var response  = await fetch("http://localhost:8080/user/"+passengerID.uid_user);
        var data_json = await response.json();
        setPassenger(data_json);

        response  = await fetch("http://localhost:8080/common-carshares/"+passengerID.uid_user+"-"+user.uid);
        data_json = await response.json();
        setCommonCarshares(data_json);
      } catch (error) {
        console.error("Erreur lors de la récupération du covoiturage :", error);
        navigate("/home");
      }
    }

    fetchCarshare();
  }, [passengerID, user]);

  return (
    user && (
      <React.Fragment>
        {passenger && user && commonCarshares && (
          <div className="friend-small">
            <img src={`../../src/images/background_profile/background_${passenger.picture_background}.png`} width="100%"/>
            <div className="center-div-picture" style={{ marginTop: "-55px" }}>
              <img src={`../../src/images/profile_picture/profile_picture_${passenger.picture_profile}.png`} alt="Photo profil" width="100px"/>
            </div>
            <p className="center color-company" style={{ marginTop: "-28px" }}>
              <strong style={{ fontSize: "10px" }}>
                {passenger.level}
              </strong>
            </p>
            <div className="row center-div-picture" style={{ marginTop: "0px" }} >
              <p className="center">
                <strong style={{ fontSize: "14px" }}>
                  {passenger.pseudo}
                </strong>
              </p>
              <p className="center" style={{ fontSize: "10px" }}>
                {commonCarshares.length} covoiturages en commun{" "}
              </p>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  );
}
