import React, { useEffect, useState } from "react";
import { Navbar }      from "../components/header/Navbar";
import { BookCarShareView } from "../components/bookCarShare/BookCarShareView";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const BookCarShare = () => {

    const [carshare, setCarshare] = useState();
    const [passengers, setPassengers] = useState();
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/carshare/" + location.pathname.substring(23))
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setCarshare(data)
            return fetch("http://localhost:8080/passengers?id_carshare=" + location.pathname.substring(23))
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setPassengers(data)
        });
    }, [location.pathname]);

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
        .then((res) => { 
            return fetch("http://localhost:8080/passengers?id_carshare=" + carshare.uid);
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data)
            console.log(data.length)
            console.log(carshare.max_passenger)
            if(carshare.max_passenger == data.length){
                const carshareUpdate = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        is_Full: true
                    })
                };
                fetch('http://localhost:8080/carshare', carshareUpdate).then((res) => { });      
            }

        });  

        navigate('/home');
    }


    return (
        <React.Fragment>
            <Navbar />
            {carshare && user && passengers &&
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
                                            <div className="circle"></div>
                                        </div>
                                        <div className="col">
                                            <p><strong style={{ fontSize:"18px" }}>{carshare.start_place}</strong></p>
                                        </div>
                                    </div>
                                    <div className="row center-div-picture">
                                        <div className="col" style={{ display:"flex", maxWidth:"70px", marginTop:"-30px" }}>
                                            {/* <i style={{ fontSize:"14px" }}>{carshareTime}</i> */}
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
                                            <p><strong style={{ fontSize:"18px" }}>{carshare.end_place}</strong></p>
                                        </div>
                                    </div>
                                </div>                        
                            </div>
                            <div className="col center-div-picture">
                                {carshare.max_passenger - passengers.length == 1 
                                    ? <p><strong style={{ fontSize:"25px"}}>1 place libre restante</strong></p>
                                    : <p><strong style={{ fontSize:"25px"}}>{carshare.max_passenger - passengers.length} places libres restantes</strong></p>
                                }
                                <button className="btn" onClick={handleBookClick} style={{ width: "200px", marginTop:"15px" }}><strong style={{ fontSize:"20px"}}>Réserver</strong></button>
                            </div>
                        </div>
                    </div>
                    <p style={{ marginTop:"25px", marginLeft:"12.5%" }}><strong style={{ fontSize:"25px" }}>Profil conducteur :</strong></p>
                    <BookCarShareView carDriver={carshare.driver}/>
                </React.Fragment>

            }
            
        </React.Fragment>
        );
};

export default BookCarShare