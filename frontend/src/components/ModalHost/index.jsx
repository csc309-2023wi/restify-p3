import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./modal_host.css";

// import icons
import xDark from "../../assets/icons/x-dark.svg";

// import components
import Modal from "../Modal";
import PropertyImageSelector from "./propertyImageSelector";
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
        const imagesForSubmission = propertyImages.map((imageObj) => ({
            ext: imageObj.fileExtension,
            data: imageObj.base64Rep,
        }));
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

    // fetch property data
    const [propertyData, setPropertyData] = useState(null);
    useEffect(() => {
        fetch(`${apiBase}/property/${property_id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        }).then(async (response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setPropertyData(data);
                    console.log(data);
                });
            } else if (response.status === 401) {
                navigate("/auth");
            } else {
                console.error(response.status, response.statusText);
                console.error(await response.json());
            }
        });
    }, [property_id, navigate]);

    const setAvailabilities = (funcReturnsNewAvailabilities) => {
        setPropertyData({ ...propertyData, availability: funcReturnsNewAvailabilities(propertyData?.availability) });
    };

    // construct image URLs
    const [propertyImages, setPropertyImages] = useState([]);
    useEffect(() => {
        const localImageObjs = propertyData?.images.map((imgHash) => {
            return {
                file: null,
                fileExtension: "webp",
                base64Rep: null,
                previewURL: `${apiBase}/image/${imgHash}?width=1920&ext=webp`,
            };
        });
        // console.log(localImageObjs);
        setPropertyImages(localImageObjs);
    }, [propertyData]);

    const mainImageContent = <PropertyImageSelector images={propertyImages} setImages={setPropertyImages} />;

    const updateProperty = () => {
        document.body.style.cursor = "progress";

        const updateObj = {
            address: propertyData?.address,
            description: propertyData?.description,
            guest_capacity: propertyData?.guest_capacity,
            availability: propertyData?.availability,
            amenities: propertyData?.amenities,
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
                });
            } else if (response.status === 401) {
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
                <h3>Address:</h3>
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

                <h3>Number of guests allowed:</h3>
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
                <ul className="content-list content-list-comments"></ul>
                <h3>Past Guests</h3>
                <ul className="content-list content-list-comments"></ul>
            </article>
        </>
    );

    const actionContent = "action";

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
