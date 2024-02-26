import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { ProfileCarSharesView } from "./ProfileCarSharesView";

export function ProfileCarShares(){

    const { user } = useUser();

    const [carShares, setCarShares] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/history-carshares?id_user="+user.uid)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setCarShares(data);
        });
    }, [user]);


    return (user &&
        <React.Fragment>
            {carShares &&
                <div className="row center-div-picture" style={{ marginTop:"20px"}}>
                    {carShares.length === 0
                        ? <p className="center"><strong style={{ fontSize:"40px" }}>Aucun covoiturage trouvé</strong></p>
                        :
                        carShares.map((carshare, index) => (
                        <div key={index} style={{maxWidth:"450px"}}>
                            <React.Fragment key={index}>
                                <ProfileCarSharesView key={index} carshare={carshare}/>
                            </React.Fragment>
                        </div>
                    ))}
                </div>
            }
        </React.Fragment>
    );
}