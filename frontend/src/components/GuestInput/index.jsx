import React, { useState } from "react";
import "./guest_input.css";

function GuestInput({ onChangeHandler }) {
    const [guests, setGuests] = useState(1);
    
    const incCounter = () => {
        const newGuests = guests + 1;
        setGuests(newGuests);
        onChangeHandler({ target: { value: newGuests } });
    };

    const decCounter = () => {
        const newGuests = guests <= 1 ? 1 : guests - 1;
        setGuests(newGuests);
        onChangeHandler({ target: { value: newGuests } });
    };

    const onChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0) {
            setGuests(value);
            onChangeHandler(e);
        }
    };

    return (
        <>
            <button className="btn-decrement" onClick={decCounter}></button>
            <input type="text" id="guests" className="flat center" placeholder="1" value={guests} onChange={onChange} />
            <button className="btn-increment" onClick={incCounter}></button>
        </> 
    );
}

export default GuestInput