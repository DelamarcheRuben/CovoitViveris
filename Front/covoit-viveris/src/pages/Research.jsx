import React from "react";
import { Navbar } from "../components/header/Navbar";
import {CarshareResearchList} from "../components/research/CarshareResearchList";


const Research = () => {
    return (
        <React.Fragment>
            <Navbar />
            <CarshareResearchList />
        </React.Fragment>
    );
};

export default Research;
