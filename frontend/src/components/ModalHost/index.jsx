import React, { useState, useEffect } from "react";
import "./modal_host.css";

// import components
import Modal from "../Modal";

export function ModalHostCreate({ displayState, displayStateSetter }) {
    const mainImageContent = "images";
    const actionContent = "action";
    return (
        <Modal
            id={"modal_new"}
            modalHeader={"Create new listing"}
            displayState={displayState} // bool: whether the modal should be shown
            displayStateSetter={displayStateSetter} // function that sets whether the modal should be shown
            mainImageContent={mainImageContent} // content to put inside the image section on the left; put null to disable
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
