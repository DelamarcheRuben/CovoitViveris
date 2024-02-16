// CarshareResearch.jsx
import React, { useState } from "react";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import PlaceIcon from '@mui/icons-material/Place';
import ListAltIcon from "@mui/icons-material/ListAlt";
import CarshareResearchForm from "./CarshareResearchForm";
import CarshareResearchMap from "./CarshareResearchMap";

const ListAltIconComponent = () => <ListAltIcon />;
const MapIconComponent = () => <PlaceIcon />;

const CarshareResearch = () => {
    const [value, setValue] = useState(0);

    return (
        // Ajoutez un style ici pour rendre cette div relative
        <div className="carshare-container" >
            {value === 0 ? <CarshareResearchForm /> : <CarshareResearchMap />}
            <BottomNavigation
                sx={{ width: '100%', position: 'relative' }}
                value={value}
                onChange={(event, newValue) => setValue(newValue)}
                showLabels
            >
                <BottomNavigationAction label="Form" icon={<ListAltIcon />} />
                <BottomNavigationAction label="Map" icon={<PlaceIcon />} />
            </BottomNavigation>
        </div>
    );
};

export default CarshareResearch;
