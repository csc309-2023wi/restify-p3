import React, { useState, useEffect } from "react";
import "./modal_host.css";

// import icons
import xDark from "../../assets/icons/x-dark.svg";

// import components
import Modal from "../Modal";
import PropertyImageSelector from "./propertyImageSelector";
import AvailabilityAdder from "./availabilityAdder";
import Input from "../Input";
import LocationInput from "../LocationInput";
import GuestInput from "../GuestInput";

export function ModalHostCreate({ displayState, displayStateSetter }) {
    const valLogger = (e) => console.log(e.target.value);

    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [numGuests, setNumGuests] = useState(1);

    const [availabilities, setAvailabilities] = useState([]);
    const handleAddAvailability = (newAvail) => setAvailabilities((prevAvails) => [...prevAvails, newAvail]);
    const handleDeleteAvailability = (i) => () =>
        setAvailabilities((prevAvails) => {
            const updatedAvails = [...prevAvails];
            updatedAvails.splice(i, 1);
            return updatedAvails;
        });

    // TODO: support adding amenities
    const [amenities, setAmenities] = useState([]);

    const actionContent = (
        <>
            <div className="input-container">
                <h4>Address:</h4>
                <Input
                    inputBody={<LocationInput onChangeHandler={(e) => setAddress(e.target.value)} />}
                    appendClassNames={"default"}
                />
            </div>

            <div className="input-container">
                <h4>Description:</h4>
                <Input
                    inputBody={
                        <textarea
                            className="description-text"
                            placeholder="Enter description..."
                            onChange={(e) => setDescription(e.target.value)}></textarea>
                    }
                    appendClassNames={"default"}
                />
            </div>

            <div className="input-container">
                <h4>Number of guests allowed:</h4>
                <Input
                    inputBody={<GuestInput onChangeHandler={(e) => setNumGuests(e.target.value)} />}
                    appendClassNames={"guests"}
                />
            </div>

            <div className="input-container">
                <h4>Dates Available:</h4>
                <div>
                    <ul className="content-list">
                        {availabilities.map((avail, i) => (
                            <li className="availability-item card pos-relative" key={i}>
                                <button className="action-btn del-item" onClick={handleDeleteAvailability(i)}>
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
                    <AvailabilityAdder availabilityReceiver={handleAddAvailability} />
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
