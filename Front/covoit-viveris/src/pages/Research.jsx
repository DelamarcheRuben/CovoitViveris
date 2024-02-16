import React from "react";
import { Navbar }               from "../components/header/Navbar.jsx";
import { CarshareResearchList } from "../components/research/CarshareResearchList.jsx";


const Research = () => {
    return (
        <React.Fragment>
            <Navbar />
            <CarshareResearchList/>
        </React.Fragment>
    );
};

export default Research;
