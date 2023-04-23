import React, { useState, useEffect } from "react";
import Splide from "@splidejs/splide";
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

    // build the image carousel; ensure each carousel has a unique id
    const [carouselId, setCarouselId] = useState(`splide_${property_id}_${Math.floor(Math.random() * 5)}`);
    const mainImageContent = (
        <div id={carouselId} className={`splide ${carouselId}`} aria-label="Property Images">
            <div className="splide__track">
                <ul className="splide__list">
                    <li className="splide__slide">
                        <img src="https://splidejs.com/images/slides/full/01.jpg" alt="" />
                    </li>
                    <li className="splide__slide">
                        <img src="https://splidejs.com/images/slides/full/02.jpg" alt="" />
                    </li>
                    <li className="splide__slide">
                        <img src="https://splidejs.com/images/slides/full/03.jpg" alt="" />
                    </li>
                </ul>
            </div>
        </div>
    );

    const mainInfoContent = "property info";
    const hostInfo = "host info";

    // register the image carousel widget
    useEffect(() => {
        new Splide(`.splide.${carouselId}`).mount();
    }, [carouselId]);

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
