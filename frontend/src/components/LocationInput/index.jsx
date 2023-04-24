import React from "react";
import "./location_input.css";

function LocationInput({ defaultValue, onChangeHandler }) {
    return (
        <>
            <button className="btn-map"></button>
            <input
                type="text"
                id="location"
                className="rounded-r-loc"
                value={defaultValue}
                onChange={onChangeHandler}
            />
        </>
    );
}

export default LocationInput;
