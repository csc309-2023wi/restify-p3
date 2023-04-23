import React from "react";
import "./location_input.css";

const LocationInput = ({ onChangeHandler }) => {
    return (
        <>
            <button className="btn-map"></button>
            <input type="text" id="location" className="rounded-r" onChange={onChangeHandler} />
        </>
    );
}

export default LocationInput;
