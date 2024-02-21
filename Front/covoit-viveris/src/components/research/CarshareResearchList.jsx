// Dans CarshareResearchList
import React from 'react';
import { useSearchResults } from '../../context/SearchResultsContext'; // Assurez-vous que le chemin d'accès est correct
import { CarshareResearchView } from "./CarshareResearchView.jsx";
import {useUser} from "../../context/UserContext.jsx";

const CarshareResearchList = () => {
    const { searchResults } = useSearchResults(); // Accès aux résultats de recherche via le contexte
    const { user } = useUser();

    return (user &&
        <React.Fragment>
            {searchResults.length === 0
                ? <p className="center"><strong style={{ fontSize:"40px" }}>Aucun Résultat</strong></p>
                : searchResults.map((carshare, index) => (
                    <CarshareResearchView key={index} carshare={carshare} />
                ))}
        </React.Fragment>
    );
}

export default CarshareResearchList;
