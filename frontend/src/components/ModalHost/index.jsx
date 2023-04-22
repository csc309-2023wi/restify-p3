import React, { useState, useEffect } from "react";
import "./modal_host.css";

// import icons
import xDark from "../../assets/icons/x-dark.svg";

// import components
import Modal from "../Modal";
import PropertyImageSelector from "./propertyImageSelector";
import Input from "../Input";
import LocationInput from "../LocationInput";
import GuestInput from "../GuestInput";
import DateInput from "../DateInput";
import PriceInput from "../PriceInput";

export function ModalHostCreate({ displayState, displayStateSetter }) {
    const valLogger = (e) => console.log(e.target.value);

    const actionContent = (
        <>
            <div className="input-container">
                <h4>Address:</h4>
                <Input inputBody={<LocationInput onChangeHandler={valLogger} />} appendClassNames={"default"} />
            </div>

            <div className="input-container">
                <h4>Description:</h4>
                <Input
                    inputBody={<textarea className="description-text" placeholder="Enter description..."></textarea>}
                    appendClassNames={"default"}
                />
            </div>

            <div className="input-container">
                <h4>Number of guests allowed:</h4>
                <Input inputBody={<GuestInput onChangeHandler={valLogger} />} appendClassNames={"guests"} />
            </div>

            <div className="input-container">
                <h4>Dates Available:</h4>
                <div>
                    <ul className="content-list">
                        <li className="availability-item card pos-relative">
                            <button className="action-btn del-item">
                                <img src={xDark} alt="x" />
                            </button>
                            <p>
                                From: <span className="date">March 1, 2025</span>
                            </p>
                            <p>
                                To: <span className="date">March 1, 2026</span>
                            </p>
                            <p>
                                Price: <span className="price">$500</span>
                            </p>
                        </li>

                        <li className="availability-item card pos-relative">
                            <button className="action-btn del-item">
                                <img src={xDark} alt="x" />
                            </button>
                            <p>
                                From: <span className="date">March 1, 2025</span>
                            </p>
                            <p>
                                To: <span className="date">March 1, 2026</span>
                            </p>
                            <p>
                                Price: <span className="price">$500</span>
                            </p>
                        </li>
                    </ul>
                    <AvailabilityAdder availabilityReceiver={(a) => console.log(a)} />
                </div>
            </div>

            <div className="input-container">
                <h4>Amenities:</h4>
                <div className="amenity-container">{/* TODO: add amenities */}</div>
            </div>
        </>
    );

    return (
        <Modal
            id={"modal_new"}
            modalHeader={"Create new listing"}
            displayState={displayState} // bool: whether the modal should be shown
            displayStateSetter={displayStateSetter} // function that sets whether the modal should be shown
            mainImageContent={<PropertyImageSelector />} // content to put inside the image section on the left; put null to disable
            mainInfoContent={null} // content to put inside the info section on the left; put null to disable
            createNewAction={(event) => console.log("Host create!", event.currentTarget)} // what happens when you click the green submit button; put null to disable
            actionContent={actionContent} // content to put inside the action column on the right; put null to disable
        />
    );
}

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
                from: tmpFromDate,
                to: tmpToDate,
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

export function ModalHostExisting({ property_id, displayState, displayStateSetter }) {
    const modalHeader = "address";
    const mainImageContent = "images";
    const mainInfoContent = "info";
    const actionContent = "action";
    return (
        <Modal
            id={"host_" + property_id}
            modalHeader={modalHeader}
            displayState={displayState} // bool: whether the modal should be shown
            displayStateSetter={displayStateSetter} // function that sets whether the modal should be shown
            mainImageContent={mainImageContent} // content to put inside the image section on the left; put null to disable
            mainInfoContent={mainInfoContent} // content to put inside the info section on the left; put null to disable
            createNewAction={null} // what happens when you click the green submit button; put null to disable
            actionContent={actionContent} // content to put inside the action column on the right; put null to disable
        />
    );
}
