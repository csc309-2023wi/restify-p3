import React from "react";
import "./date_input.css";


const DateInput = ({ dateLabel, onChangeHandler }) => {
    return (
        <>
            <button className="btn-left">{dateLabel}</button>
            <input
                type="date"
                id="dates_from"
                className="flat flat1"
                placeholder="Jan. 1, 1970"
                onChange={onChangeHandler}
            />
        </>
    );

}

export default DateInput;
