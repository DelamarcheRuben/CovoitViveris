import React from "react";
import {useUser} from "../../context/UserContext.jsx";
import HomeCurrentAirQuality from "./home-sub-components/HomeCurrentAirQuality.jsx";
import HomeWeeklyChallenge from "./home-sub-components/HomeWeeklyChallenge.jsx";
import HomeCarshareReserved from "./home-sub-components/HomeCarshareReserved.jsx";
import HomeCarshareOffered from "./home-sub-components/HomeCarshareOffered.jsx";

const HomeComponent = () => {

    const { user } = useUser();

    return (
        <div>
            <div className="home-text">
                <h3>Bienvenue {user.pseudo} !</h3>
            </div >
            <div class="home-container">
                <HomeCurrentAirQuality/>
                <HomeWeeklyChallenge/>
            </div>
            <div className="home-text">
                <h3>Mes covoiturages :</h3>
            </div>
            <div className="home-container">
                <HomeCarshareReserved/>
                <HomeCarshareOffered/>
            </div>
        </div>

    );
};

export default HomeComponent;
