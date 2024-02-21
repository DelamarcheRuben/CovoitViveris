import React from "react";
import {useUser} from "../../context/UserContext.jsx";
import HomeCurrentAirQuality from "./home-sub-components/HomeCurrentAirQuality.jsx";
import HomeWeeklyChallenge from "./home-sub-components/HomeWeeklyChallenge.jsx";
import HomeCarshareReserved from "./home-sub-components/HomeCarshareReserved.jsx";
import HomeCarshareOffered from "./home-sub-components/HomeCarshareOffered.jsx";

const HomeComponent = () => {

    const { user } = useUser();

    return (user &&
        <div>
            <div className="home-text">
                <h3>Bienvenue {user.pseudo} !</h3>
            </div >
            <div>
                <HomeCurrentAirQuality/>
            </div>
            <div className="home-text">
                <h3>Mes covoiturages :</h3>
            </div>
            <div className="home-container-2">
                <HomeCarshareReserved/>
                <HomeCarshareOffered/>
            </div>
        </div>
    );
};

export default HomeComponent;
