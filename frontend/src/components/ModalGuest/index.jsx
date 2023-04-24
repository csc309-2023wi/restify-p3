import React, { useState, useEffect } from "react";
import Splide from "@splidejs/splide";
import "./modal_guest.css";
import { useNavigate } from "react-router-dom";
// import components
import Modal from "../Modal";
import xWhite from "../../assets/icons/x-white.svg";
import greencalendar from "../../assets/icons/calendar-green-dark.svg";
import greencircle from "../../assets/icons/check-circle-green-dark.svg";
import GuestInput from "../GuestInput";
import { data } from "jquery";




const SidebarContent = ( modal_type, date_from, setFrom,
    date_to, setTo, guests_c, setGuests_c, obj, res, setButtonText, buttonText, buttonText1 ) => {
    const navigate = useNavigate();

    const Cancel_Res = async () => {
    const access_token = localStorage.getItem("accessToken");
    const url = `http://localhost:8000/api/reservation/cancel/${res.id}/`;
    if (access_token && (res.status === 'AP' || res.status === 'PE')) {
    const headers = {
        Authorization: `Bearer ${access_token}`,
    };
    const response = await fetch(url, { headers });
    data = await response.json();
    if (data.status === 'CA') {
    setButtonText("Cancelled");
    }
    else {
        setButtonText("Cancellation Request Sent");
    }}
    else {
        navigate("/auth");
    }}

    const Send_Req = async () => {
        const token = localStorage.getItem("accessToken");
        const createReservation = {
            property_id: obj.id,
            guest_count: guests_c,
            from_date: `${date_from}`,
            to_date: date_to,
        }
        if (!token) {
            navigate("/auth");
        }
        console.log("Creating reservation...");

        fetch(`http://localhost:8000/api/reservation/create/`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify(createReservation),
        }).then(async (response) => {
            document.body.style.cursor = "default";
            if (response.ok) {
                console.log("Reservation created successfully");
                response.json().then((newRes) => {
                    navigate("/dashboard/");
                });
            } else if (response.status === 401) {
                localStorage.removeItem("accessToken");
                navigate("/auth");
            } else {
                console.error(response.status, response.statusText);
                console.error(await response.json());
            }
        });
        }


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
    <button class="action-btn gray-dark" onClick={Send_Req}>{buttonText1}</button>
</div>);
} 
else {
    return (
    <div class="action-widget">
    <h3><img src={greencircle} alt="Reserved" />Booking Details</h3>
    <ul class="booked-info">
        {(obj.availability && obj.availability.length > 0) ? <li className="price">${obj.availability[0].price}/night</li> : <li className="price">Price is not known</li>}
        <li class="duration">{res.from_date} - {res.to_date}</li>
    </ul>
    {(res.status == 'AP' || res.status == 'PE') ? <button class="action-btn gray-dark" onClick={Cancel_Res}>{buttonText}</button> : 
    (res.status == 'PC') ? <button class="action-btn green-light" disabled={true}>Cancellation Request Sent</button> : <div></div>}
    </div>);
}
};

export function ModalGuestUnbooked({ property_id, display, setDisplay }) {
    const actionCard = "unbooked"
    const [property, setProperty] = useState([]);
    const [host, setHost] = useState({});

    useEffect(() => { 
        async function fetchProperty(property_id) {
            let url = `http://localhost:8000/api/property/${property_id}`;
            const response = await fetch(url);
            const data = await response.json();
            const host = await fetch(`http://localhost:8000/api/user/${data.host_id}/`);
            const hostData = await host.json();
            console.log(hostData);
            const prop = await data;
            setProperty(prop);
            setHost(hostData)
            return data;
        }
        fetchProperty(property_id);
    }, []);

    return (
        <ModalGuest
            property_id={property_id}
            actionCard={actionCard}
            display={display}
            setDisplay={setDisplay}
            obj={property}
            host={host}
        />
    );
}

export function ModalGuestBooked({ reservation, display, setDisplay }) {
    console.log(reservation);
    const actionCard = "booked";
    const { id, guest_id, property_id, status, property, guest_count, from_date, to_date } = reservation;
    const [host, setHost] = useState({});

    useEffect(() => { 
        async function fetchProperty(property) {
            const host = await fetch(`http://localhost:8000/api/user/${property.host_id}/`);
            const hostData = await host.json();
            setHost(hostData)
            return hostData;
        }
        fetchProperty(property);
    }, []);

    return (
        <ModalGuest
            property_id={id}
            actionCard={actionCard}
            obj={property}
            display={display}
            setDisplay={setDisplay}
            host={host}
            res = {reservation}
        />
    );
}


function ModalGuest({ property_id, actionCard, obj, display, setDisplay, host, res }) {
    const modalHeader = "property address";
    const [date_from, setFrom] = useState("");
    const [buttonText, setButtonText] = useState('Cancel Reservation');
    const [buttonText1, setButtonText1] = useState('Send Request');
    const [date_to, setTo] = useState("");
    const [guests_c, setGuests_c] = useState(1);

    const sidebarc = SidebarContent(actionCard, date_from, setFrom,
        date_to, setTo, guests_c, setGuests_c, obj, res, setButtonText, buttonText, buttonText1);
     

    // build the image carousel; ensure each carousel has a unique id
    const [carouselId, setCarouselId] = useState(`splide_${property_id}_${Math.floor(Math.random() * 5)}`);
    const mainImageContent = (
        <div id={carouselId} className={`splide ${carouselId}`} aria-label="Property Images">
            <div className="splide__track">
                    {(obj.images && obj.images.length > 0) ? <ul className="splide__list">
                            {obj.images.map((item, index) => (
                            <li key={index} className="splide__slide">
                                <img src={`http://localhost:8000/api/image/${item}?width=1920&ext=webp`} alt="" />
                            </li>
                            ))}
                            </ul> : <ul className="splide__list">
                    <li className="splide__slide">
                        <img src="https://splidejs.com/images/slides/full/01.jpg" alt="" />
                    </li>
                    <li className="splide__slide">
                        <img src="https://splidejs.com/images/slides/full/02.jpg" alt="" />
                    </li>
                    <li className="splide__slide">
                        <img src="https://splidejs.com/images/slides/full/03.jpg" alt="" />
                    </li> 
                </ul>}
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
        <div className="modal-backdrop" id={"modal_guest" + property_id} key={property_id} style={{ display: display}}>
            <div className="modal-container">
                <section className="modal-content modal-content-g">
                    <div className="image-section">{mainImageContent}</div> 
                    <div className="info-section">{mainInfoContent}</div>
                </section>
                <aside className="modal-action with-action-widget">
                    <button className="btn-modal-close clickable-on-dark" onClick={() => setDisplay('None')}>
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
                            <img class="avatar" src={host.avatar} alt="Host Avatar" />
                        </span>
                        <ul class="bio">
                            <li class="name">{host.first_name}  {host.last_name}</li>
                            <li class="email"><a href={`mailto:${host.email}`}>{host.email}</a></li>
                            {(host.phone_number) ? <li class="tel">{host.phone_number}</li> : <div></div> }

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

