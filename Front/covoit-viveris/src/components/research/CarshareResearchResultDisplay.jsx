import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PlaceIcon from '@mui/icons-material/Place';
import CarshareResearchList from './CarshareResearchList';
import CarshareResearchMap from './CarshareResearchMap';
import {Navbar} from "../header/Navbar.jsx";

const CarshareResearchResultsDisplay = () => {
    const [view, setView] = useState('list'); // 'list' ou 'map'

    return (
        <React.Fragment>
            <Navbar/>
            <div class="carshare-container">
                <BottomNavigation
                    showLabels
                    value={view}
                    onChange={(event, newValue) => setView(newValue)}
                >
                    <BottomNavigationAction label="Liste" value="list" icon={<ListAltIcon />} />
                    <BottomNavigationAction label="Carte" value="map" icon={<PlaceIcon />} />
                </BottomNavigation>
                {view === 'list' ? (
                    <CarshareResearchList />
                ) : (
                    <CarshareResearchMap />
                )}
            </div>
        </React.Fragment>
    );
};

export default CarshareResearchResultsDisplay;
