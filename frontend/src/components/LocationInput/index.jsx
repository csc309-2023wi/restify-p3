import React from "react";
import "./location_input.css";

function LocationInput() {
    return (
        <>
            <button className="btn-map"></button>
            <input type="text" id="location" className="rounded-r" />
        </>
    );
}

export default LocationInput;
