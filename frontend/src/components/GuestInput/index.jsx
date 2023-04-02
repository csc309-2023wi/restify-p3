import React, {useState} from "react";
import "./guest_input.css";

function GuestInput() {
    const [guests, setGuests] = useState(1);
    
    const incCounter = () => setGuests(guests + 1);
    
    const decCounter = () => {

        if(guests <= 1) {
            setGuests(1);
        } else {
            setGuests(guests - 1);
        }
    }

    const onChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0) {
            setGuests(value);
        }
    };

    return (
        <>
            <button className="btn-decrement" onClick={decCounter}></button>
            <input type="text" id="guests" className="flat center" placeholder="1" value={guests} onChange={onChange}/>
            <button className="btn-increment" onClick={incCounter}></button>
        </> 
    )
}

export default GuestInput