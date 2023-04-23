import React, { useState, useEffect } from "react";
import Splide from "@splidejs/splide";
import "./modal_guest.css";

// import components
import Modal from "../Modal";
import xWhite from "../../assets/icons/x-white.svg";
import greencalendar from "../../assets/icons/calendar-green-dark.svg";
import greencircle from "../../assets/icons/check-circle-green-dark.svg";
import GuestInput from "../GuestInput";

const sidebarContent = ( modal_type, setFrom, setTo, setGuests_c, obj ) => {
    if (modal_type === 'unbooked') {
    return (<div class="action-widget">
    <h3><img src={greencalendar} alt="Calendar" />Make Reservation</h3>
    <h4>Duration:</h4>
    <div class="filter-inputs dates-from">
        <button class="btn-left">FROM</button>
        <input type="date" id="dates_from" class="flat flat1" placeholder="Jun. 31, 2026" 
        onChange={(e) => setFrom(e.target.value)}/>
    </div>
    <div class="filter-inputs default">
        <button class="btn-left">TO</button>
        <input type="date" id="dates_to" class="flat flat1" placeholder="Jun. 31, 2026"
        onChange={(e) => setTo(e.target.value)}/>
    </div>
    <h4>Number of guests:</h4>
    <div class="filter-inputs guests">
        <GuestInput onChangeHandler={(e) => setGuests_c(e.target.value)}/>
    </div>
    <table class="prices">
        <tr class="price-total">
            <th>Total Price</th>
            {(obj.availability && obj.availability.length > 0) ? <td>{obj.availability[0].price}</td> : <td>Unknown</td>}
        </tr>
    </table>
    <button class="action-btn gray-dark">Send Request</button>
</div>);
} 
else {
    return (
    <div class="action-widget">
    <h3><img src={greencircle} alt="Reserved" />Booked!</h3>
    <ul class="booked-info">
        <li class="price">Property.price/night</li>
        <li class="duration">Reservation.from - Reservation.to</li>
    </ul>
    <button class="action-btn gray-dark">Cancel Reservation</button>
    </div>);
}
};






export function ModalGuestUnbooked({ property_id }) {
    const actionCard = "unbooked"
    const [property, setProperty] = useState([]);
    const [host, setHost] = useState({});

    useEffect(() => { 
        async function fetchProperty(property_id) {
            let url = `http://localhost:8000/api/property/${property_id}`;
            const response = await fetch(url);
            const data = await response.json();
            const host = await fetch(`http://localhost:8000/api/user/profile/${data.host_id}/`);
            console.log(host);
            // const hostData = await host.json();
            const prop = await data;
            setProperty(prop);
            // setHost(hostData)
            return data;
        }
        fetchProperty(property_id);
    }, []);

    return (
        <ModalGuest
            property_id={property_id}
            actionCard={actionCard}
            obj={property}
            // host={host}
        />
    );
}

export function ModalGuestBooked({ reservation_id }) {
    const actionCard = "booked";
    return (
        <ModalGuest
            property_id={reservation_id}
            actionCard={actionCard}
        />
    );
}

function ModalGuest({ property_id, actionCard, obj, host }) {
    const modalHeader = "property address";
    const [displayAttr, setDisplayAttr] = useState('flex');
    const [date_from, setFrom] = useState("");
    const [date_to, setTo] = useState("");
    const [guests_c, setGuests_c] = useState(1);
    // console.log(host);

    const sidebarc = sidebarContent(actionCard, setFrom, setTo, setGuests_c, obj);
     

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

    const mainInfoContent = (
                <article class="property-info">
                    <h3>Description</h3>
                    <p>
                        {obj.description}
                    </p>
                    <h3>Amenities</h3>
                    <div class="amenity-container">
                        <div class="amenity-tag">
                            WIFI
                        </div>
                        <div class="amenity-tag">
                            Air conditioning
                        </div>
                        <div class="amenity-tag">
                            WIFI
                        </div>
                        <div class="amenity-tag">
                            Washing machine
                        </div>
                        <div class="amenity-tag">
                            Kitchen
                        </div>
                        <div class="amenity-tag">
                            Pool
                        </div>
                        <div class="amenity-tag">
                            Dryer
                        </div>
                        <div class="amenity-tag">
                            Pool
                        </div>
                    </div>
                    <h3>Availability</h3>

                    {(obj.availability && obj.availability.length > 0) ? <div class="availability-g">
                        <ul class="content-list-g">
                            {obj.availability.map((item, index) => (
                                <li className="availability-item-g card"key={index}>
                                <p>From: <span class="date">{item.from}</span></p>
                                <p>To: <span class="date">{item.to}</span></p>
                                <p>Price: <span class="price">${item.price}</span></p>
                                </li>
                            ))}
                        </ul>
                    </div> : <div></div>}
                    
                    <h3>Comments and Ratings</h3>
                    </article>);
    const hostInfo = "host info";

    // register the image carousel widget
    useEffect(() => {
        new Splide(`.splide.${carouselId}`).mount();
    }, [carouselId]);

    return (
        <div className="modal-backdrop" id={"modal_guest" + property_id} key={property_id} style={{ display: displayAttr }}>
            <div className="modal-container">
                <section className="modal-content modal-content-g">
                    <div className="image-section">{mainImageContent}</div> 
                    <div className="info-section">{mainInfoContent}</div>
                </section>
                <aside className="modal-action with-action-widget">
                    <button className="btn-modal-close clickable-on-dark" onClick={() => setDisplayAttr('None')}>
                        <img src={xWhite} alt="X" />
                    </button>
                    <div class="modal-header">
                        <h3>{obj.address}</h3>
                    </div>

            <div class="item-container">
                {sidebarc}

                <article class="action-details">
                    <h4>The Host</h4>
                    <div class="host-info-card">
                        <span class="avatar-container">
                            <img class="avatar" src="images/user-avatar-color.png" alt="Host Avatar" />
                        </span>
                        <ul class="bio">
                            <li class="name">property.host.firstName + property.host.LastName</li>
                            <li class="email"><a href="mailto:john.doe@restify.com">property.host.email</a></li>
                            <li class="tel">property.host.phone</li>
                        </ul>
                    </div>
                </article>
            </div>

            </aside>
            </div>
        </div>
        // <Modal
        //     id={"guest_" + property_id}
        //     modalHeader={modalHeader}
        //     displayState={displayState} // bool: whether the modal should be shown
        //     displayStateSetter={displayStateSetter} // function that sets whether the modal should be shown
        //     mainImageContent={mainImageContent} // content to put inside the image section on the left; put null to disable
        //     mainInfoContent={mainInfoContent} // content to put inside the info section on the left; put null to disable
        //     createNewAction={null} // what happens when you click the green submit button; put null to disable
        //     actionContent={
        //         <>
        //             {actionCard} {hostInfo}
        //         </>
        //     } // content to put inside the action column on the right; put null to disable
        // />
    );
}
