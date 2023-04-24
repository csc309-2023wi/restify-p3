import React, { useEffect, useState } from "react";
import "./guest_input.css";

function GuestInput({ defaultValue, onChangeHandler }) {
    const [guests, setGuests] = useState(1);
    useEffect(() => {
        if (defaultValue) {
            setGuests(defaultValue);
        }
    }, [defaultValue]);

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
            <input type="text" className="flat center guests" value={guests} onChange={onChange} />
            <button className="btn-increment" onClick={incCounter}></button>
        </>
    );
}

export default GuestInput;
