import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { ProfileFriendsView } from "./ProfileFriendsView";
import { useWindowWidth } from "../../context/WindowWidthContext";

export function ProfileFriends(){

    const { user } = useUser();
    const windowWidth = useWindowWidth();

    const [friendList, setFriendList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/friends?id_user=" + user.uid)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setFriendList(data);
            });
    }, [user]);

    return (
        <React.Fragment>
            {windowWidth < 1105 && friendList &&
                <div className="row center-div-picture">
                    {friendList.sort((a, b) => {
                        const levelA = (a.user1.uid == user.uid) ? a.user2.level : a.user1.level;
                        const levelB = (b.user1.uid == user.uid) ? b.user2.level : b.user1.level;

                        return levelB - levelA;
                    }).map((f, index) => (
                        <div key={index} style={{ maxWidth:"350px"}}>
                            {f.uid.uidUser1 == user.uid
                            ?
                            <React.Fragment key={index}>
                                <ProfileFriendsView key={index} friendUser={f.user2}/>
                            </React.Fragment>
                            :
                            <React.Fragment key={index}>
                                <ProfileFriendsView key={index} friendUser={f.user1}/>
                            </React.Fragment>
                            }
                        </div>
                    ))} 
                </div>
            }

            {windowWidth >= 1105 && friendList &&
                <div className="row center-div-picture">
                    <div className="container-profile-friend" style={{ marginTop:"5px", maxWidth:"85%" }}>
                        {friendList.sort((a, b) => {
                            const levelA = (a.user1.uid == user.uid) ? a.user2.level : a.user1.level;
                            const levelB = (b.user1.uid == user.uid) ? b.user2.level : b.user1.level;

                            return levelB - levelA;
                        }).map((f, index) => (
                            <div key={index} className="item-profile-friend"  style={{ maxWidth:"400px"}}>
                                {f.uid.uidUser1 == user.uid
                                ?
                                <React.Fragment key={index}>
                                    <ProfileFriendsView key={index} friendUser={f.user2}/>
                                </React.Fragment>
                                :
                                <React.Fragment key={index}>
                                    <ProfileFriendsView key={index} friendUser={f.user1}/>
                                </React.Fragment>
                                }
                            </div>
                        ))} 
                    </div>
                </div>       
            }

        </React.Fragment>
    );
}
