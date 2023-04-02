import React from "react";
import "./date_input.css";

function DateInput({ dateLabel }) {
    return (
        <>
            <button className="btn-left">{dateLabel}</button>
            <input type="date" id="dates_from" className="flat flat1" placeholder="Jun. 31, 2026" />
        </> 
    )
}

export default DateInput