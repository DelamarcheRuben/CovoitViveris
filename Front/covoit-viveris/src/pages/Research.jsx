import React from "react";
import { Navbar } from "../components/header/Navbar";
import {CarshareResearchList} from "../components/research/CarshareResearchList";
import {CarshareResearchMap} from "../components/research/CarshareResearchMap.jsx";


const Research = () => {
    return (
        <React.Fragment>
            <Navbar />
            <CarshareResearchMap/>
        </React.Fragment>
    );
};

export default Research;
