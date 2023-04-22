import React from "react";
import "./input.css";

function Input({ inputBody, appendClassNames }) {
    return <div className={"filter-inputs " + appendClassNames}>{inputBody}</div>;
}

export default Input;
