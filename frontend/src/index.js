import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/common.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("appRoot"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
