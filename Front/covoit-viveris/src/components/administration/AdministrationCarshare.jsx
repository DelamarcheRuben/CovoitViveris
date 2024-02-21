import React, { useState } from "react";
import { useUser }         from "../../context/UserContext";
import { useWindowWidth }  from "../../context/WindowWidthContext";
import {useNavigate} from "react-router-dom";

const AdministrationCarshare = () => {

    const [idCarshare, setIdCarshare] = useState('');
    const navigate = useNavigate();

    const handleEndCarshare = () => {
        // faire quelque chose
        navigate("/end-carshare", {state: {idCarshare: idCarshare}})
    }

    return(
        <React.Fragment>
            <div className="scheduling-form">
                <p className="center" style={{ marginBottom: "20px" }}><strong style={{ fontSize: "25px" }}>Administration Covoiturage</strong></p>

                <label> ID Covoiturage :
                    <input
                        type="number"
                        min="1" max="150"
                        value={idCarshare}
                        onChange={e => setIdCarshare(e.target.value)}
                    />
                </label>

                <button className="btn" onClick={handleEndCarshare}>
                    <strong style={{ fontSize: "15px", padding: "5px" }}>Finir le covoiturage</strong>
                </button>
            </div>
        </React.Fragment>
    )
};

export default AdministrationCarshare