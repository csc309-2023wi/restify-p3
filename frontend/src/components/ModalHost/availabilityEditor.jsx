import { useState } from "react";

// import icons
import xDark from "../../assets/icons/x-dark.svg";

// import components
import Input from "../Input";
import DateInput from "../DateInput";
import PriceInput from "../PriceInput";

export function AvailabilityShower({ availabilities, setAvailabilities }) {
    const deleteAvailability = (i) => () =>
        setAvailabilities((prevAvails) => {
            const updatedAvails = [...prevAvails];
            updatedAvails.splice(i, 1);
            return updatedAvails;
        });

    return (
        <ul className="content-list">
            {availabilities?.map((avail, i) => (
                <li className="availability-item card pos-relative" key={i}>
                    <button className="action-btn del-item" onClick={deleteAvailability(i)}>
                        <img src={xDark} alt="x" />
                    </button>
                    <p>
                        From: <span className="date">{avail.from}</span>
                    </p>
                    <p>
                        To: <span className="date">{avail.to}</span>
                    </p>
                    <p>
                        Price: <span className="price">${avail.price.toFixed(2)}</span>
                    </p>
                </li>
            ))}
        </ul>
    );
}

export function AvailabilityAdder({ setAvailabilities }) {
    const addAvailability = (newAvail) => setAvailabilities((prevAvails) => [...prevAvails, newAvail]);
    const [tmpFromDate, setTmpFromDate] = useState(null);
    const [tmpToDate, setTmpToDate] = useState(null);
    const [tmpPrice, setTmpPrice] = useState(0);
    const [tmpErrors, setTmpErrors] = useState([]);

    const addNewAvailability = (e) => {
        e.preventDefault();
        const errors = [];
        if (!!!tmpFromDate) {
            errors.push("Must specify FROM date. ");
        }
        if (!!!tmpToDate) {
            errors.push("Must specify TO date. ");
        }
        if (!!!tmpPrice) {
            errors.push("Must specify nightly price. ");
        }
        if (tmpPrice && tmpPrice == 0) {
            errors.push("Nightly price must be non-zero. ");
        }
        if (new Date(tmpToDate) < new Date(tmpFromDate)) {
            errors.push("TO date must be on or after FROM date.");
        }
        if (errors.length === 0) {
            setTmpErrors([]);
            const currAvailObj = {
                from: toYYYYMMDD(new Date(tmpFromDate)),
                to: toYYYYMMDD(new Date(tmpToDate)),
                price: parseFloat(tmpPrice),
            };
            addAvailability(currAvailObj);
        } else {
            setTmpErrors(errors);
        }
    };

    return (
        <form className="add-availability" onSubmit={addNewAvailability}>
            <Input
                inputBody={
                    <DateInput
                        dateLabel="FROM"
                        appendClassNames={"dates-from"}
                        onChangeHandler={(e) => setTmpFromDate(new Date(e.target.value))}
                    />
                }
            />
            <Input
                inputBody={<DateInput dateLabel="TO" onChangeHandler={(e) => setTmpToDate(new Date(e.target.value))} />}
                appendClassNames={"default"}
            />
            <Input
                inputBody={<PriceInput onChangeHandler={(e) => setTmpPrice(e.target.value)} />}
                appendClassNames={"default"}
            />
            {tmpErrors.length > 0 ? (
                <ul className="availabilityErrors">
                    {tmpErrors.map((errorMessage, i) => (
                        <li key={i}>{errorMessage}</li>
                    ))}
                </ul>
            ) : null}
            <button className="action-btn purple-dark">Add Availability</button>
        </form>
    );
}

function toYYYYMMDD(dateObj) {
    return JSON.stringify(dateObj).split("T")[0].slice(1);
}
