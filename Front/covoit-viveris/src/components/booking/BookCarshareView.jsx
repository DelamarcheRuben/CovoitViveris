import React, { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { useUser }     from "../../context/UserContext.jsx";
import { BookCarshareViewDriver } from "./BookCarshareViewDriver.jsx";
import { useWindowWidth } from "../../context/WindowWidthContext.jsx";
import {useSnackbar} from "../../context/SnackbarContext.jsx";




export function BookCarshareView(){
    const [passengers, setPassengers] = useState([]);
    const { user } = useUser();
    const windowWidth = useWindowWidth();
    const navigate = useNavigate();
    const location = useLocation();
    const [carshare, setCarshare] = useState();
    const { openSnackbar } = useSnackbar();
    

    useEffect(() => {
        if (location.state && location.state.carshare) {
            setCarshare(location.state.carshare);
        }
    }, [location]);

    useEffect(() => {
        if (carshare) { // S'assurer que carshare est défini
            fetch("http://localhost:8080/passengers?id_carshare=" + carshare.uid) // Utilisez l'ID correct du carshare
                .then((res) => res.json())
                .then((data) => {
                    setPassengers(data);
                });
        }
    }, [carshare]); // Dépendance à carshare

    const handleBookClick = () => {
        const passenger = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "uid": {
                    "uid_carshare": carshare.uid,
                    "uid_passenger": user.uid
                },
                "carshare": {
                    "uid": carshare.uid
                },
                "user": {
                    "uid": user.uid
                },
                "schedule": carshare.schedule,
                "start_place": carshare.start_place
            })
        };


        fetch('http://localhost:8080/passenger', passenger)
            .then(response => {
                if (!response.ok) {
                    throw new Error('La réservation a échoué. Veuillez réessayer.');
                    openSnackbar('La réservation a échoué', 'error');
                }
                openSnackbar('Le covoiturage a été réservé', 'success');
                navigate("/home");
            })
            .catch(error => {
                openSnackbar(error.message, 'error');
            });
    }


    return (
        <React.Fragment>
            {windowWidth < 1105 && carshare && user && passengers &&
                <React.Fragment>
                    <div className="carShare-booking-small" style={{ maxWidth:"90%" }}>
                        <div className="row">
                            <div className="col">
                                <p style={{ paddingTop:"25px", paddingLeft:"25px"}}><strong style={{ fontSize:"20px" }}>{carshare.schedule.substring(0, 10)}</strong></p>
                                <div className="col" style={{ padding: "20px"}}>
                                    <div className="row center-div-picture">
                                        <div className="col" style={{ display:"flex", maxWidth:"70px" }}>
                                            <p><strong>{carshare.schedule.substring(11, 16)}</strong></p>
                                        </div>
                                        <div className="col" style={{ display:"flex", justifyContent:"right", maxWidth:"50px"}}>
                                            <div className="carshare-circle"></div>
                                        </div>
                                        <div className="col">
                                            <p style={{ lineHeight:"18px" }}><strong style={{ fontSize:"12px" }}>{carshare.start_place.houseRoad}, <br></br>{carshare.start_place.cityPostcode}</strong></p>
                                        </div>
                                    </div>
                                    <div className="row center-div-picture">
                                        <div className="col" style={{ display:"flex", maxWidth:"70px", marginTop:"-15px" }}>
                                            <i style={{ fontSize:"14px" }}>{carshare.duration}</i>
                                        </div>
                                        <div className="col" style={{ display:"flex", justifyContent:"right", maxWidth:"50px", marginTop:"-8px", height:"40px"}}>
                                            <div className="line-45"></div>
                                        </div>
                                        <div className="col">
                                        </div>
                                    </div>
                                    <div className="row center-div-picture" >
                                        <div className="col" style={{ display:"flex", maxWidth:"70px" }}>
                                            <p><strong>{carshare.endHour}</strong></p>
                                        </div>
                                        <div className="col" style={{ display:"flex", justifyContent:"right", maxWidth:"50px"}}>
                                            <div className="carshare-circle"></div>
                                        </div>
                                        <div className="col">
                                            <p style={{ lineHeight:"18px" }}><strong style={{ fontSize:"12px" }}>{carshare.end_place.houseRoad}, <br></br>{carshare.end_place.cityPostcode}</strong></p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col"  style={{ maxWidth:"65%", marginTop:"10px"}}>
                                            {carshare.max_passenger - passengers.length == 1
                                            ? <p className="center"><strong style={{ fontSize:"18px" }}>1 place libre restante</strong></p>
                                            : <p className="center"><strong style={{ fontSize:"18px" }}>{carshare.max_passenger - passengers.length} places libres restantes</strong></p>
                                            }
                                        </div>
                                        <div className="col" style={{ maxWidth:"25%"}}>
                                            <button className="btn" onClick={handleBookClick} style={{ width: "100px", marginTop:"15px" }}><strong style={{ fontSize:"15px"}}>Réserver</strong></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p style={{ marginTop:"25px", marginLeft:"10%" }}><strong style={{ fontSize:"20px" }}>Profil conducteur :</strong></p>
                    <BookCarshareViewDriver carDriver={carshare.driver}/>
                </React.Fragment>
            }

            {windowWidth >= 1105 && carshare && user && passengers &&
                <React.Fragment>
                    <div className="carShare-booking">
                        <div className="row">
                            <div className="col">
                                <p style={{ paddingTop:"25px", paddingLeft:"25px"}}><strong style={{ fontSize:"20px" }}>{carshare.schedule.substring(0, 10)}</strong></p>
                                <div className="col" style={{ padding: "20px"}}>
                                    <div className="row center-div-picture">
                                        <div className="col" style={{ display:"flex", maxWidth:"70px" }}>
                                            <p><strong>{carshare.schedule.substring(11, 16)}</strong></p>
                                        </div>
                                        <div className="col" style={{ display:"flex", justifyContent:"right", maxWidth:"100px"}}>
                                            <div className="carshare-circle"></div>
                                        </div>
                                        <div className="col">
                                            <p><strong style={{ fontSize:"18px" }}>{carshare.start_place.houseRoad}, <br></br>{carshare.start_place.cityPostcode}</strong></p>
                                        </div>
                                    </div>
                                    <div className="row center-div-picture">
                                        <div className="col" style={{ display:"flex", maxWidth:"70px", marginTop:"-30px" }}>
                                            <i style={{ fontSize:"14px" }}>{carshare.duration}</i>
                                        </div>
                                        <div className="col" style={{ display:"flex", justifyContent:"right", maxWidth:"100px", marginTop:"-15px", height:"40px"}}>
                                            <div className="line-55"></div>
                                        </div>
                                        <div className="col">
                                        </div>
                                    </div>
                                    <div className="row center-div-picture" >
                                        <div className="col" style={{ display:"flex", maxWidth:"70px" }}>
                                            <p><strong>{carshare.endHour}</strong></p>
                                        </div>
                                        <div className="col" style={{ display:"flex", justifyContent:"right", maxWidth:"100px"}}>
                                            <div className="carshare-circle"></div>
                                        </div>
                                        <div className="col">
                                            <p><strong style={{ fontSize:"18px" }}>{carshare.end_place.houseRoad}, <br></br>{carshare.end_place.cityPostcode}</strong></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col center-div-picture" style={{ maxWidth:"40%" }}>
                                {carshare.max_passenger - passengers.length == 1
                                    ? <p style={{ marginTop:"10px" }}><strong style={{ fontSize:"1.2vw" }}>1 place libre restante</strong></p>
                                    : <p style={{ marginTop:"10px" }}><strong style={{ fontSize:"1.2vw" }}>{carshare.max_passenger - passengers.length} places libres restantes</strong></p>
                                }
                                <button className="btn" onClick={handleBookClick} style={{ width: "8vw", marginTop:"15px" }}><strong style={{ fontSize:"1.2vw"}}>Réserver</strong></button>
                            </div>
                        </div>
                    </div>
                    <p style={{ marginTop:"25px", marginLeft:"12.5%" }}><strong style={{ fontSize:"25px" }}>Profil conducteur :</strong></p>
                    <BookCarshareViewDriver carDriver={carshare.driver}/>
                </React.Fragment>
            }
        </React.Fragment>
    );
}