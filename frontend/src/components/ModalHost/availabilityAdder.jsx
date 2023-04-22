import { useState } from "react";

// import components
import Input from "../Input";
import DateInput from "../DateInput";
import PriceInput from "../PriceInput";

function AvailabilityAdder({ availabilityReceiver }) {
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
            availabilityReceiver(currAvailObj);
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

export default AvailabilityAdder;
