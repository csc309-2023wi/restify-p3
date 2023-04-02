import React from "react";
import ActionBtn from "../../components/ActionBtn";
import Sidebar from "../../components/Sidebar";
import "./playground.css";

function Playground() {
    return (
        <>
            <h1>Playground</h1>
            <p>Insert random components in this page for experimentation. </p>
            <Sidebar />
            <ActionBtn className={"gray-dark"} text="Press Me"/>
        </>
    );
}

export default Playground;
