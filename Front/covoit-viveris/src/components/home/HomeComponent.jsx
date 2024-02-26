import React from "react";
import {useUser} from "../../context/UserContext.jsx";
import HomeCurrentAirQuality from "./home-sub-components/HomeCurrentAirQuality.jsx";
import HomeChallenges from "./home-sub-components/HomeChallenges.jsx";
import HomeCarshareReserved from "./home-sub-components/HomeCarshareReserved.jsx";
import HomeCarshareOffered from "./home-sub-components/HomeCarshareOffered.jsx";

const HomeComponent = () => {

    const { user } = useUser();

    return (user &&
        <div>
            <div className="home-text">
                <h3>Bienvenue {user.pseudo} !</h3>
            </div >
            <div className="home-container-2">
                <HomeCurrentAirQuality/>
                <HomeChallenges/>
            </div>
            <div className="home-container-2">
                <HomeCarshareReserved/>
                <HomeCarshareOffered/>
            </div>
        </div>
    );
};

export default HomeComponent;
