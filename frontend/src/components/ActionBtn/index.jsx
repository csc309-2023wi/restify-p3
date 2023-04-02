import React from "react";
import "./action_btn.css";

function ActionBtn({ className, text, onClick }) {
    return (
        <>
            <button className={`action-btn ${className}`} onClick={onClick}>
                {text}
            </button>
        </> 
    )
}

export default ActionBtn