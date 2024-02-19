import React from "react";
import { Navbar } from "../components/header/Navbar.jsx";
import CarshareResearch from "../components/research/CarshareResearch.jsx";
import CarshareResearchForm from "../components/research/CarshareResearchForm.jsx";

const Research = () => {
    return (
        <React.Fragment>
            <Navbar />
            <CarshareResearch/>
        </React.Fragment>
    );
};

export default Research;