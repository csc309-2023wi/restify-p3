import React, { useState, useEffect } from "react";
import "./modal_guest.css";

// import components
import Modal from "../Modal";

export function ModalGuestUnbooked({ property_id, displayState, displayStateSetter }) {
    const actionCard = "Not Booked. Make Reservation)";
    return (
        <ModalGuest
            property_id={property_id}
            displayState={displayState}
            displayStateSetter={displayStateSetter}
            actionCard={actionCard}
        />
    );
}

export function ModalGuestBooked({ property_id, displayState, displayStateSetter }) {
    const actionCard = "Booked! Cancel reservation)";
    return (
        <ModalGuest
            property_id={property_id}
            displayState={displayState}
            displayStateSetter={displayStateSetter}
            actionCard={actionCard}
        />
    );
}

function ModalGuest({ property_id, displayState, displayStateSetter, actionCard }) {
    const modalHeader = "property address";
    const mainImageContent = "property images";
    const mainInfoContent = "property info";
    const hostInfo = "host info";

    return (
        <Modal
            id={"guest_" + property_id}
            modalHeader={modalHeader}
            displayState={displayState} // bool: whether the modal should be shown
            displayStateSetter={displayStateSetter} // function that sets whether the modal should be shown
            mainImageContent={mainImageContent} // content to put inside the image section on the left; put null to disable
            mainInfoContent={mainInfoContent} // content to put inside the info section on the left; put null to disable
            createNewAction={null} // what happens when you click the green submit button; put null to disable
            actionContent={
                <>
                    {actionCard} {hostInfo}
                </>
            } // content to put inside the action column on the right; put null to disable
        />
    );
}
