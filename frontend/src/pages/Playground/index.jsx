import React from "react";
import ActionBtn from "../../components/ActionBtn";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "./playground.css";

function Playground() {
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
                        <ActionButtons />
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
