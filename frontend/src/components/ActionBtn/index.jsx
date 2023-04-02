import React from "react";
import "./action_btn.css";

function ActionBtn({ className, text }) {
    return (
        <>
            <button className={`action-btn ${className}`}>{text}</button>
        </> 
    )
}

export default ActionBtn