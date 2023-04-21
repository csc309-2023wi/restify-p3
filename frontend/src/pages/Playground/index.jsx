import React, { useState } from "react";
import ActionBtn from "../../components/ActionBtn";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Modal from "../../components/Modal";

import "./playground.css";

function Playground() {
    const [newModalShow, setNewModalShow] = useState(true);
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
                        <div className="modal-demos" style={{ margin: "2rem 0 1rem 0" }}>
                            <h2 style={{ marginBottom: "1rem" }}>Modals demo</h2>
                            <Modal
                                id={"new"}
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
                                text="Show new modal"
                                onClick={() => setNewModalShow(true)}
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
