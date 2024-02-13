import React, { useState } from "react";
import { CarshareResearchMap } from "./CarshareResearchMap";
import Slider from "./Slider"; // Assume this is a slider component you have

const CarshareResearchForm = () => {
    const [searchType, setSearchType] = useState("text"); // "text" or "map"
    const [formData, setFormData] = useState({
        departure: "",
        arrival: "",
        date: "",
        time: "",
        flexibility: "",
        seatsRequired: 1,
    });

    // Handle form data changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to filter carshares based on form data
    };

    // Toggle between text search and map search
    const handleToggleSearchType = (type) => {
        setSearchType(type);
    };

    return (
        <div>
            <Slider onToggle={(searchType) => setSearchType(searchType)} />
            {searchType === "text" ? (
                <form onSubmit={handleSubmit}>
                    {/* Form inputs here */}
                    <input
                        type="text"
                        name="departure"
                        value={formData.departure}
                        onChange={handleChange}
                    />
                    {/* Other form inputs... */}
                    <button type="submit">Rechercher</button>
                </form>
            ) : (
                <CarshareResearchMap />
            )}
        </div>
    );
};

export default CarshareResearchForm;
