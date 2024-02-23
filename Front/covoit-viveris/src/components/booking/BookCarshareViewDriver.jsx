import React, { useEffect, useState } from "react";
import { BookCarshareProfile } from "../booking/BookCarshareProfile.jsx"
import { useWindowWidth } from "../../context/WindowWidthContext.jsx";
import { useUser } from "../../context/UserContext.jsx";
import {useSnackbar} from "../../context/SnackbarContext.jsx";
import {useNavigate} from "react-router-dom";

export function BookCarshareViewDriver(userDriver){

    const windowWidth = useWindowWidth();
    const { user } = useUser();

    const [ownedBadges, setOwnedBadges]   = useState([]);
    const [isFriend, setIsFriend]         = useState(false);
    const [commonFriend, setCommonFriend] = useState(0);
    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/ownedbadges?user_id="+userDriver.carDriver.uid)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setOwnedBadges(data);
        });

        fetch("http://localhost:8080/friends?id_user="+user.uid)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let isfriend = false;
            data.forEach((friend) => {
                if(friend.user1.uid == userDriver.carDriver.uid || friend.user2.uid == userDriver.carDriver.uid){
                    isfriend = true;
                }
            });
            setIsFriend(isfriend);
        });

        fetch("http://localhost:8080/common-friends/" + user.uid + "-" + userDriver.carDriver.uid)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setCommonFriend(data.length);
       });
    }, [user]);

    const handleFriendClick = () => {
        const friend = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "uid":{
                    "uidUser2":userDriver.carDriver.uid,
                    "uidUser1":user.uid
                },
                "user1": {"uid":user.uid},
                "user2": {"uid":userDriver.carDriver.uid}
            })
        };
        fetch('http://localhost:8080/friend', friend)
            .then(response => {
                if (!response.ok){
                    throw new Error ("La demande d'ami a échoué. Veuillez réessayer");
                    openSnackbar('La demande d\'ami s\'est perdue en chemin. Réessayez', 'error')
                }
                openSnackbar('Vous avez un nouvel ami !', 'success', {
                    label: 'Voir mes Amis',
                    onClick: () => navigate('/profile/friends/'),
                });
            })

        setIsFriend(true);
    }



    return (user &&
        <React.Fragment>
            {windowWidth < 1105 && userDriver && ownedBadges &&
            <div className="small-screen profile-booking-small" style={{ marginTop:"35px" }} >
                <div className="row">
                    <img className="center-picture" src={`../../src/images/background_profile/background_${userDriver.carDriver.picture_background}.png`} alt="Photo profil" style={{ marginTop:"-25px", width: "100%", maxHeight:"125px" }}/>
                </div>
                <div className="row">
                    <BookCarshareProfile userid={userDriver.carDriver.uid}/>
                </div>
                <div className="col center-div-picture">
                    <div className="line-company-color-horizontal"></div>
                </div>
                <div className="row" style={{ marginTop:"15px" }}>
                    <p className="center">{commonFriend} amis en commun </p>
                    {
                        isFriend 
                        ?
                        <p className="center already-friend" style={{ marginTop:"10px" }}>Déjà ami</p>
                        :
                        <button className="btn" onClick={handleFriendClick} style={{ width: "150px", marginTop:"10px" }}><strong style={{ fontSize:"15px"}}>Ajouter en ami</strong></button>
                    }
                </div>
                <div className="col center-div-picture">
                    <div className="line-company-color-horizontal"></div>
                </div>
                <div className="row">
                    <p className="center"><strong style={{ fontSize:"20px" }}>Badges :</strong></p>
                </div>
                <div className="row center-div-picture">
                    <div className="container-badge-booking" style={{ marginTop:"5px", maxWidth:"85%" }}>
                        {ownedBadges.map((data, index) => (
                            <div key={index} className="item-badge-booking">
                                <img className="center-picture" src={`../../src/images/badge/${data.badge.picture_badge}_${data.level}.png`} alt={`Badge ${data.badge.title}`} width="50%"/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            }

            {windowWidth >= 1105 && userDriver && ownedBadges &&
            <div className="large-screen profile-booking" style={{ marginTop:"35px", maxWidth:"60%" }} >
                <div className="row">
                    <img className="center-picture" src={`../../src/images/background_profile/background_${userDriver.carDriver.picture_background}.png`} alt="Photo profil" style={{ marginTop:"-25px", width: "100%", maxHeight:"125px" }}/>
                </div>
                <div className="row">
                    <div className="col">
                        <BookCarshareProfile userid={userDriver.carDriver.uid}/>
                    </div>
                    <div className="col" style={{ maxWidth:"10px" }}>
                        <div className="line-company-color"></div>
                    </div>
                    <div className="col center-div-picture">
                        <div className="row">
                            <p className="center">{commonFriend} amis en commun </p>
                            {
                                isFriend 
                                ?
                                <p className="center already-friend" style={{ marginTop:"10px" }}>Déjà ami</p>
                                :
                                <button className="btn" onClick={handleFriendClick} style={{ width: "150px", marginTop:"10px" }}><strong style={{ fontSize:"15px"}}>Ajouter en ami</strong></button>
                            }                        
                        </div>
                    </div>
                    <div className="col" style={{ maxWidth:"10px" }}>
                        <div className="line-company-color"></div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <p className="center"><strong style={{ fontSize:"20px" }}>Badges :</strong></p>
                        </div>
                        <div className="row">
                            <div className="container-badge-booking" style={{ marginTop:"5px", marginLeft:"-15px" }}>
                                {ownedBadges.map((data, index) => (
                                    <div key={index} className="item-badge-booking">
                                        <img className="center-picture" src={`../../src/images/badge/${data.badge.picture_badge}_${data.level}.png`} alt={`Badge ${data.badge.title}`} width="80%"/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </React.Fragment>
    );
}