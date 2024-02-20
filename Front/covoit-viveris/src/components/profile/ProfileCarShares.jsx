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
            console.log(data);
            setCarShares(data);
            console.log(carShares);
        });
    }, [user]);


    return (
        <React.Fragment>
            {carShares &&
                <div className="row center-div-picture" >
                    {carShares.map((carshare, index) => (
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
