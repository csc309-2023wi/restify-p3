import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./modal_host.css";

// import icons
import iconStarEmpty from "../../assets/icons/star-empty.svg";
import iconStarFilled from "../../assets/icons/star-filled.svg";
import iconArrowRightPurple from "../../assets/icons/arrow-right-purple.svg";
import userAvatarDefault from "../../assets/images/user-avatar-default.png";

// import components
import Modal from "../Modal";
import PropertyImageSelector, { imageObjToUploadFormat } from "./propertyImageSelector";
import { AvailabilityShower, AvailabilityAdder } from "./availabilityEditor";
import Input from "../Input";
import LocationInput from "../LocationInput";
import GuestInput from "../GuestInput";

var apiBase = "http://127.0.0.1:8000/api";

export function ModalHostCreate({ displayState, displayStateSetter }) {
    /* LEFT PANEL (Image Section Only) */

    const [propertyImages, setPropertyImages] = useState([]);
    const mainImageContent = <PropertyImageSelector images={propertyImages} setImages={setPropertyImages} />;

    /* RIGHT PANEL (Property Creation Form) */

    const navigate = useNavigate();
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [numGuests, setNumGuests] = useState(1);
    const [availabilities, setAvailabilities] = useState([]);

    // TODO: support adding amenities
    const [amenities, setAmenities] = useState([]);

    const submitNewProperty = () => {
        document.body.style.cursor = "progress";
        const imagesForSubmission = propertyImages.map(imageObjToUploadFormat);
        const createPropertyObj = {
            address: address,
            description: description,
            guest_capacity: numGuests,
            availability: availabilities,
            amenities: amenities,
            images: imagesForSubmission,
        };

        const token = localStorage.getItem("accessToken");
        if (!token) {
            document.body.style.cursor = "default";
            navigate("/auth");
        }

        fetch(`${apiBase}/property/`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify(createPropertyObj),
        }).then(async (response) => {
            document.body.style.cursor = "default";
            if (response.ok) {
                response.json().then((newPropObj) => {
                    navigate("/dashboard/?property_id=" + newPropObj.id);
                });
            } else if (response.status === 401) {
                localStorage.removeItem("accessToken");
                navigate("/auth");
            } else {
                console.error(response.status, response.statusText);
                console.error(await response.json());
            }
        });
    };

    const actionContent = (
        <>
            <div className="input-container">
                <h4>
                    Address: <span className="field-required">*</span>
                </h4>
                <Input
                    inputBody={
                        <LocationInput defaultValue={address} onChangeHandler={(e) => setAddress(e.target.value)} />
                    }
                    appendClassNames={"default"}
                />
            </div>

            <div className="input-container">
                <h4>
                    Description: <span className="field-required">*</span>
                </h4>
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
                    <AvailabilityShower availabilities={availabilities} setAvailabilities={setAvailabilities} />
                    <AvailabilityAdder setAvailabilities={setAvailabilities} />
                </div>
            </div>

            <div className="input-container">
                <h4>Amenities:</h4>
                <div className="amenity-container">
                    {/*
                     * TODO: add amenities
                     */}
                </div>
            </div>
        </>
    );

    return (
        <Modal
            id={"modal_new"}
            modalHeader={"Create new listing"}
            displayState={displayState} // bool: whether the modal should be shown
            displayStateSetter={displayStateSetter} // function that sets whether the modal should be shown
            mainImageContent={mainImageContent} // content to put inside the image section on the left; put null to disable
            mainInfoContent={null} // content to put inside the info section on the left; put null to disable
            createNewAction={address && description ? submitNewProperty : null} // what happens when you click the green submit button; put null to disable
            actionContent={actionContent} // content to put inside the action column on the right; put null to disable
        />
    );
}

export function ModalHostExisting({ property_id, displayState, displayStateSetter }) {
    const navigate = useNavigate();

    // fetch reservations
    const [reservationLoaded, setReservationLoaded] = useState(false);
    const [activeReservations, setCurrentGuests] = useState([]);
    const [pastGuests, setPastGuests] = useState([]);
    const [cancellationRequests, setCancellationRequests] = useState([]);
    const [reservationRequests, setReservationRequests] = useState([]);
    useEffect(() => {
        setReservationLoaded(false);
        const fetchPromises = ["AP", "TE", "CO", "PC", "PE"].map((rStatus) => {
            return fetch(`${apiBase}/reservation/?page_size=99&type=host&status=${rStatus}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
            }).then((response) => {
                if (response.ok) {
                    return response.json().then((data) => {
                        // filter reservations only for the current property
                        const reservationsForProperty = data.results.filter(
                            (reservation) => reservation.property_id === property_id
                        );
                        switch (rStatus) {
                            case "AP":
                                // current guests
                                setCurrentGuests(reservationsForProperty);
                                break;
                            case "TE":
                            case "CO":
                                // past guests
                                setPastGuests((existingPastGuests) => [
                                    ...existingPastGuests,
                                    ...reservationsForProperty,
                                ]);
                                break;
                            case "PC":
                                // cancellation requests
                                setCancellationRequests(reservationsForProperty);
                                break;
                            case "PE":
                                // reservation requests
                                setReservationRequests(reservationsForProperty);
                                break;
                            default:
                                break;
                        }
                    });
                } else if (response.status === 401) {
                    localStorage.removeItem("accessToken");
                    navigate("/auth");
                } else {
                    response.json().then((errorJson) => {
                        console.error(response.status, response.statusText);
                        console.error(errorJson);
                    });
                }
            });
        });

        Promise.all(fetchPromises).then(() => {
            setReservationLoaded(true);
        });
    }, [navigate]);

    useEffect(() => {
        if (reservationLoaded === true) {
            console.info("Current", activeReservations);
        }
    }, [reservationLoaded]);

    useEffect(() => {
        if (reservationLoaded === true) {
            console.info("Past", pastGuests);
        }
    }, [reservationLoaded]);

    useEffect(() => {
        if (reservationLoaded === true) {
            console.info("Cancel", cancellationRequests);
        }
    }, [reservationLoaded]);

    useEffect(() => {
        if (reservationLoaded === true) {
            console.info("ResReq", reservationRequests);
        }
    }, [reservationLoaded]);

    /* LEFT PANEL (Image Section & Property Info) */

    // fetch property data
    const [propertyDataLoad, setPropertyDataLoad] = useState(null);
    useEffect(() => {
        fetch(`${apiBase}/property/${property_id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        }).then(async (response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setPropertyDataLoad(data);
                });
            } else if (response.status === 401) {
                localStorage.removeItem("accessToken");
                navigate("/auth");
            } else {
                console.error(response.status, response.statusText);
                console.error(await response.json());
            }
        });
    }, [navigate]);

    const [propertyData, setPropertyData] = useState(null);
    useEffect(() => {
        setPropertyData(propertyDataLoad);
    }, [propertyDataLoad]);

    const setAvailabilities = (funcReturnsNewAvailabilities) => {
        setPropertyData({ ...propertyData, availability: funcReturnsNewAvailabilities(propertyData?.availability) });
    };

    // construct image URLs
    const [propertyImages, setPropertyImages] = useState([]);
    useEffect(() => {
        const localImageObjs = propertyDataLoad?.images.map((imgHash) => {
            return {
                file: null,
                fileExtension: "webp",
                base64Rep: null,
                previewURL: `${apiBase}/image/${imgHash}?width=1920&ext=webp`,
            };
        });
        // console.log(localImageObjs);
        setPropertyImages(localImageObjs);
    }, [propertyDataLoad]);

    // add or delete images
    const [imageObjsToAdd, setImageObjsToAdd] = useState([]);
    const [imageHashesToDelete, setImageHashesToDelete] = useState([]);
    const newImageReceiver = (imageObj) => {
        setImageObjsToAdd((prevImages) => [...prevImages, imageObj]);
    };
    const deleteImageReceiver = (imageObj) => {
        // remove newly added images
        setImageObjsToAdd((prevImages) =>
            prevImages.filter((oldImageObj) => JSON.stringify(oldImageObj) !== JSON.stringify(imageObj))
        );
        // delete existing images
        const hashToDelete = imageObj.previewURL.split("image/")[1]?.split("?")[0];
        if (hashToDelete) {
            setImageHashesToDelete((prevHashes) => [...prevHashes, hashToDelete]);
        }
    };

    const mainImageContent = (
        <PropertyImageSelector
            images={propertyImages}
            setImages={setPropertyImages}
            newImageReceiver={newImageReceiver}
            deleteImageReceiver={deleteImageReceiver}
        />
    );

    // called when clicking the save button
    const updateProperty = () => {
        document.body.style.cursor = "progress";

        const updateObj = {
            address: propertyData?.address,
            description: propertyData?.description,
            guest_capacity: propertyData?.guest_capacity,
            availability: propertyData?.availability,
            amenities: propertyData?.amenities,
            image_ops: {
                add: imageObjsToAdd.map(imageObjToUploadFormat),
                delete: imageHashesToDelete,
            },
        };

        const token = localStorage.getItem("accessToken");
        if (!token) {
            document.body.style.cursor = "default";
            navigate("/auth");
        }

        fetch(`${apiBase}/property/${propertyData.id}`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify(updateObj),
        }).then(async (response) => {
            document.body.style.cursor = "default";
            if (response.ok) {
                response.json().then((newPropObj) => {
                    setPropertyData(newPropObj);
                    setImageObjsToAdd([]);
                    setImageHashesToDelete([]);
                });
            } else if (response.status === 401) {
                localStorage.removeItem("accessToken");
                navigate("/auth");
            } else {
                console.error(response.status, response.statusText);
                console.error(await response.json());
            }
        });
    };

    const mainInfoContent = (
        <>
            <article className="property-info">
                <h3>Address</h3>
                <Input
                    inputBody={
                        <LocationInput
                            defaultValue={propertyData?.address ? propertyData.address : ""}
                            onChangeHandler={(e) => setPropertyData({ ...propertyData, address: e.target.value })}
                        />
                    }
                    appendClassNames={"default"}
                />
                <h3>Description</h3>
                <textarea
                    className="description-text"
                    placeholder="Enter a description..."
                    value={propertyData?.description}
                    onChange={(e) => setPropertyData({ ...propertyData, description: e.target.value })}></textarea>

                <h3>Number of guests allowed</h3>
                <div style={{ margin: "0 auto", maxWidth: "15rem" }}>
                    <Input
                        inputBody={
                            <GuestInput
                                defaultValue={propertyData?.guest_capacity}
                                onChangeHandler={(e) =>
                                    setPropertyData({ ...propertyData, guest_capacity: e.target.value })
                                }
                            />
                        }
                        appendClassNames={"guests"}
                    />
                </div>

                <h3>Amenities</h3>
                <div className="amenity-container">
                    {/*
                     * TODO: add amenities
                     */}
                </div>

                <h3>Availability</h3>
                <div className="availability">
                    <AvailabilityShower
                        availabilities={propertyData?.availability}
                        setAvailabilities={setAvailabilities}
                    />
                    <AvailabilityAdder setAvailabilities={setAvailabilities} />
                </div>

                <div className="save-changes">
                    <button className="action-btn save-changes green-dark" onClick={updateProperty}>
                        Save Changes
                    </button>
                </div>

                <h3>Comments and Ratings</h3>
                <ul className="content-list content-list-comments">
                    <CommentsAndRatings />
                </ul>

                <h3>Past Guests</h3>
                <ul className="content-list content-list-comments">
                    <PastGuestCanStillComment />
                    <PastGuestAlreadyCommented />
                </ul>
            </article>
        </>
    );

    /* RIGHT PANEL (Current Guests & Reservation Requests + Comments) */

    const actionContent = (
        <div className="input-container">
            <h3 className="request-heading">Active Reservations</h3>
            {activeReservations.map((r, i) => (
                <div className="request-container" key={i}>
                    <div className="request-card has-ratings">
                        <div className="request-card-content">
                            <RequestCardInfo reservationObj={r} />
                        </div>
                        <div className="btn-container">
                            <button className="action-btn gray-light">Terminate</button>
                        </div>
                    </div>
                    <RequestCardComments />
                </div>
            ))}

            <h3 className="request-heading">Cancellation Requests</h3>
            {cancellationRequests.map((r, i) => (
                <div className="request-container" key={i}>
                    <div className="request-card has-ratings">
                        <div className="request-card-content">
                            <RequestCardInfo reservationObj={r} />
                        </div>
                        <div className="btn-container">
                            <button className="action-btn green-light">Accept</button>
                            <button className="action-btn gray-light">Decline</button>
                        </div>
                    </div>
                    <RequestCardComments />
                </div>
            ))}

            <h3 className="request-heading">Reservation Requests</h3>
            {reservationRequests.map((r, i) => (
                <div className="request-container" key={i}>
                    <div className="request-card has-ratings">
                        <div className="request-card-content">
                            <RequestCardInfo reservationObj={r} />
                        </div>
                        <div className="btn-container">
                            <button className="action-btn green-light">Accept</button>
                            <button className="action-btn gray-light">Decline</button>
                        </div>
                    </div>
                    <RequestCardComments />
                </div>
            ))}
        </div>
    );

    return (
        <Modal
            id={"host_" + property_id}
            modalHeader={propertyData?.address}
            displayState={displayState} // bool: whether the modal should be shown
            displayStateSetter={displayStateSetter} // function that sets whether the modal should be shown
            mainImageContent={mainImageContent} // content to put inside the image section on the left; put null to disable
            mainInfoContent={mainInfoContent} // content to put inside the info section on the left; put null to disable
            createNewAction={null} // what happens when you click the green submit button; put null to disable
            actionContent={actionContent} // content to put inside the action column on the right; put null to disable
        />
    );
}

function CommentsAndRatings() {
    return (
        <>
            <li>
                <div class="comment-card main-comment has-ratings">
                    <img class="profile-img" src={userAvatarDefault} alt="avatar" />
                    <div class="comment-info">
                        <h4>Jane Doe</h4>
                        <div class="rating-container">
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                        </div>
                        <p>
                            Stayed From <span class="date">March 10, 2025</span> To{" "}
                            <span class="date">March 15, 2025</span>
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.
                        </p>
                    </div>
                </div>

                <details class="reply-container">
                    <summary
                        class="comments-dropdown"
                        comments-open="Hide Replies"
                        comments-hidden="Show Replies"></summary>
                    <div class="comment-card reply host-reply">
                        <img class="profile-img" src={userAvatarDefault} alt="avatar" />
                        <div class="comment-info">
                            <h4>John Doe</h4>
                            <span class="date">March 10, 2025</span>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                    </div>
                    <div class="comment-card reply">
                        <img class="profile-img" src={userAvatarDefault} alt="avatar" />
                        <div class="comment-info">
                            <h4>Jane Doe</h4>
                            <span class="date">March 10, 2025</span>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </p>
                            <div class="reply-input-container">
                                <textarea placeholder="Reply to comment..."></textarea>
                                <button class="send-arrow">
                                    <img src={iconArrowRightPurple} alt="Send reply" />
                                </button>
                            </div>
                        </div>
                    </div>
                </details>
            </li>

            <li>
                <div class="comment-card main-comment">
                    <img class="profile-img" src={userAvatarDefault} alt="avatar" />
                    <div class="comment-info">
                        <h4>Jane Doe</h4>
                        <div class="rating-container">
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                        </div>
                        <p>
                            Stayed From <span class="date">March 10, 2025</span> To{" "}
                            <span class="date">March 15, 2025</span>
                        </p>
                        <div class="reply-input-container">
                            <textarea placeholder="Reply to comment..."></textarea>
                            <button class="send-arrow">
                                <img src={iconArrowRightPurple} alt="Send reply" />
                            </button>
                        </div>
                    </div>
                </div>
            </li>

            <li>
                <div class="comment-card main-comment has-ratings">
                    <img class="profile-img" src={userAvatarDefault} alt="avatar" />
                    <div class="comment-info">
                        <h4>Jane Doe</h4>
                        <div class="rating-container">
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                        </div>
                        <p>
                            Stayed From <span class="date">March 10, 2025</span> To{" "}
                            <span class="date">March 15, 2025</span>
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.
                        </p>
                    </div>
                </div>

                <details class="reply-container">
                    <summary
                        class="comments-dropdown"
                        comments-open="Hide Replies"
                        comments-hidden="Show Replies"></summary>
                    <div class="comment-card reply host-reply">
                        <img class="profile-img" src={userAvatarDefault} alt="avatar" />
                        <div class="comment-info">
                            <h4>John Doe</h4>
                            <span class="date">March 10, 2025</span>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                    </div>
                </details>
            </li>
        </>
    );
}

function PastGuestCanStillComment() {
    return (
        <li>
            <div className="past-guest-card has-ratings">
                <div className="guest-info">
                    <img className="profile-img" src={userAvatarDefault} alt="avatar" />
                    <h4>Jane Doe</h4>
                </div>

                <div className="rating-container">
                    <img src={iconStarEmpty} alt="" />
                    <img src={iconStarEmpty} alt="" />
                    <img src={iconStarEmpty} alt="" />
                    <img src={iconStarEmpty} alt="" />
                    <img src={iconStarEmpty} alt="" />
                </div>
                <div className="reply-input-container">
                    <textarea placeholder="Leave a rating..."></textarea>
                    <button className="send-arrow">
                        <img src={iconArrowRightPurple} alt="Send comment" />
                    </button>
                </div>
            </div>
            <details>
                <summary
                    className="comments-dropdown"
                    comments-open="Hide Host Ratings"
                    comments-hidden="Show Host Ratings"></summary>
                <ul>
                    <li>
                        <div className="comment-card reply host-reply">
                            <img className="profile-img" src={userAvatarDefault} alt="avatar" />
                            <div className="comment-info">
                                <h4>John Doe</h4>
                                <div className="rating-container">
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                </div>
                                <span className="date">March 10, 2025</span>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="comment-card reply host-reply">
                            <img className="profile-img" src={userAvatarDefault} alt="avatar" />
                            <div className="comment-info">
                                <h4>John Doe</h4>
                                <div className="rating-container">
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                </div>
                                <span className="date">March 10, 2025</span>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </details>
        </li>
    );
}

function PastGuestAlreadyCommented() {
    return (
        <li>
            <div className="past-guest-card has-ratings">
                <div className="guest-info">
                    <img className="profile-img" src={userAvatarDefault} alt="avatar" />
                    <h4>Jane Doe</h4>
                </div>
            </div>
            <details>
                <summary
                    className="comments-dropdown"
                    comments-open="Hide Host Ratings"
                    comments-hidden="Show Host Ratings"></summary>
                <ul>
                    <li>
                        <div className="comment-card reply host-reply">
                            <img className="profile-img" src={userAvatarDefault} alt="avatar" />
                            <div className="comment-info">
                                <h4>John Doe</h4>
                                <div className="rating-container">
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                </div>
                                <span className="date">March 10, 2025</span>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="comment-card reply host-reply">
                            <img className="profile-img" src={userAvatarDefault} alt="avatar" />
                            <div className="comment-info">
                                <h4>John Doe</h4>
                                <div className="rating-container">
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                    <img src={iconStarFilled} alt="" />
                                </div>
                                <span className="date">March 10, 2025</span>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </details>
        </li>
    );
}

function RequestCardInfo({ reservationObj }) {
    const r = reservationObj;
    return (
        <div className="request-card-info">
            <h4>Guest {r?.guest_id}</h4>
            <p>
                <span className="date">{r?.guest_count}</span> guest{r?.guest_count > 1 ? "s" : ""}
            </p>
            <p>
                From <span className="date">{r?.from_date}</span>
            </p>
            <p>
                To <span className="date">{r?.to_date}</span>
            </p>
            {/* TODO: hydrate price based on availability */}
            {/* <p className="price">$500</p> */}
        </div>
    );
}

// TODO: Implement Comments
function RequestCardComments() {
    return (
        <details>
            <summary
                className="comments-dropdown"
                comments-open="Hide Comments"
                comments-hidden="Show Comments"></summary>
            <div className="request-card host-comment">
                <div className="request-card-content">
                    <img src={userAvatarDefault} className="profile-img" alt="avatar" />
                    <div className="request-card-info">
                        <h4>John Doe</h4>
                        <div className="rating-container">
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                            <img src={iconStarFilled} alt="" />
                        </div>
                        <p>
                            <span className="date">March 1, 2025</span>
                        </p>
                    </div>
                </div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                </p>
            </div>
        </details>
    );
}
