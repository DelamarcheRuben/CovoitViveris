import React, { useState } from "react";
import CarshareResearchForm from "./CarshareResearchForm";
import CarshareResearchResultsDisplay from "./CarshareResearchResultDisplay.jsx";

const CarshareResearch = () => {
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    return (
        <div>
            <CarshareResearchForm onSearchResults={handleSearchResults} />
            {searchResults.length > 0 && <CarshareResearchResultsDisplay searchResults={searchResults} />}
        </div>
    );
};

export default CarshareResearch;
