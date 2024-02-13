import React from "react";
import { Navbar } from "../components/header/Navbar";
import {CarshareResearchMap} from "../components/research/CarshareResearchMap.jsx";
import CarshareResearchForm from "../components/research/CarshareResearchForm.jsx";


const Research = () => {
    return (
        <React.Fragment>
            <Navbar />
            <CarshareResearchMap/>
            <CarshareResearchForm />
        </React.Fragment>
    );
};

export default Research;
