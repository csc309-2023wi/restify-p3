import React, { useState } from "react";
import ActionBtn from "../../components/ActionBtn";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Modal from "../../components/Modal";
import { ModalHostCreate, ModalHostExisting } from "../../components/ModalHost";
import { ModalGuestUnbooked, ModalGuestBooked } from "../../components/ModalGuest";

import "./playground.css";

function Playground() {
    const [newModalShow, setNewModalShow] = useState(false);
    const [newHostCreateModalShow, setNewHostCreateModalShow] = useState(false);
    const [newHostExistingModalShow, setNewHExistingModalShow] = useState(false);
    const [guestUnbookedModalShow, setGuestUnbookedModalShow] = useState(true);
    const [guestBookedModalShow, setGuestBookedModalShow] = useState(false);

    return (
        <>
            <Navbar />
            <div className="container">
                <h1>Playground</h1>
                <p style={{ marginBottom: "2rem" }}>Insert random components in this page for experimentation. </p>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        rowGap: "1rem",
                    }}>
                    <Sidebar />
                    <div>
                        {/* DEMO: Action Buttons */}
                        <ActionButtons />

                        {/* DEMO: Modals */}
                        <div
                            className="modal-demos"
                            style={{
                                margin: "2rem 0 1rem 0",
                                display: "flex",
                                flexDirection: "column",
                                rowGap: "1rem",
                            }}>
                            <h2 style={{ marginBottom: "1rem" }}>Modals demo</h2>
                            {/* generic modal */}
                            <Modal
                                id={"generic"}
                                modalHeader={"Header of the modal"}
                                displayState={newModalShow} // bool: whether the modal should be shown
                                displayStateSetter={setNewModalShow} // function that sets whether the modal should be shown
                                mainImageContent={<h4>Image section</h4>} // content to put inside the image section on the left; put null to disable
                                mainInfoContent={<h4>Info section</h4>} // content to put inside the info section on the left; put null to disable
                                createNewAction={(event) => console.log("Submit!", event.currentTarget)} // what happens when you click the green submit button; put null to disable
                                actionContent={<h4>Action column</h4>} // content to put inside the action column on the right; put null to disable
                            />
                            <ActionBtn
                                className={"green-dark"}
                                text="Show new generic modal"
                                onClick={() => setNewModalShow(true)}
                            />
                            {/* host create modal */}
                            <ModalHostCreate
                                displayState={newHostCreateModalShow}
                                displayStateSetter={setNewHostCreateModalShow}
                            />
                            <ActionBtn
                                className={"purple-light"}
                                text="Show new host-create modal"
                                onClick={() => setNewHostCreateModalShow(true)}
                            />
                            {/* host existing modal */}
                            <ModalHostExisting
                                property_id={0}
                                displayState={newHostExistingModalShow}
                                displayStateSetter={setNewHExistingModalShow}
                            />
                            <ActionBtn
                                className={"purple-light"}
                                text="Show new host-existing modal"
                                onClick={() => setNewHExistingModalShow(true)}
                            />
                            {/* guest unbooked modal */}
                            {/* <ModalGuestUnbooked
                                property_id={3}
                                displayState={guestUnbookedModalShow}
                                displayStateSetter={setGuestUnbookedModalShow}
                            /> */}
                            <ActionBtn
                                className={"green-light"}
                                text="Show guest-unbooked modal"
                                onClick={() => setGuestUnbookedModalShow(true)}
                            />
                            {/* guest booked modal */}
                            {/* <ModalGuestBooked
                                property_id={3}
                                displayState={guestBookedModalShow}
                                displayStateSetter={setGuestBookedModalShow}
                            /> */}
                            <ActionBtn
                                className={"green-light"}
                                text="Show guest-booked modal"
                                onClick={() => setGuestBookedModalShow(true)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function ActionButtons() {
    return (
        <>
            <ul
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    columnGap: "1rem",
                    rowGap: "1rem",
                }}>
                <li>
                    <ActionBtn className={"gray-dark"} text="Press Me" />
                </li>
                <li>
                    <ActionBtn className={"purple-dark"} text="Press Me" />
                </li>
                <li>
                    <ActionBtn className={"green-dark"} text="Press Me" />
                </li>
                <li>
                    <ActionBtn className={"purple-light"} text="Press Me" />
                </li>
                <li>
                    <ActionBtn className={"green-light"} text="Press Me" />
                </li>
            </ul>
            <div
                style={{
                    backgroundColor: "var(--clr-purple-primary)",
                    padding: "1rem",
                    margin: "1rem 0",
                }}>
                <ActionBtn className={"bordered-dark"} text="Press Me" />
            </div>
        </>
    );
}

export default Playground;
