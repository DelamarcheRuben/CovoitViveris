import React, { useState } from "react";
import { useUser }        from "../../context/UserContext.jsx";
import CarshareResearchForm from "./CarshareResearchForm";
import CarshareResearchResultsDisplay from "./CarshareResearchResultDisplay.jsx";

const CarshareResearch = () => {
    const [searchResults, setSearchResults] = useState([]);
    const { user } = useUser();

    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    return (user &&
        <div>
            <CarshareResearchForm onSearchResults={handleSearchResults} />
            {searchResults.length > 0 && <CarshareResearchResultsDisplay searchResults={searchResults} />}
        </div>
    );
};

export default CarshareResearch;
