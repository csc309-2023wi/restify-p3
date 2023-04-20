import React from "react";
import { Link } from "react-router-dom";

import "./navbar.css";

// import icons
import bellFilledWhite from "../../assets/icons/bell-filled-white.svg";
import logoIconGreenLight from "../../assets/icons/logo-icon-green-light.svg";
import userAvaterDefault from "../../assets/images/user-avatar-default.png";
import chevronIconGreenDark from "../../assets/icons/chevron-down-green-dark.svg";
import logOutIcon from "../../assets/icons/log-out-dray-dark.svg";

// import components
import SearchBar from "./searchBar";

const dataNotifDemo = [
    {
        notification_id: 1,
        user_id: 1,
        reservation_id: 3,
        property_id: 1,
        content: "sm has requested to reserve the property 123 Broadway from 2025-03-05 to 2025-03-08.",
        is_read: false,
        is_cleared: false,
        created_at: "2023-03-19T17:41:05.587402Z",
        is_cancel_req: false,
    },
    {
        notification_id: 2,
        user_id: 1,
        reservation_id: 4,
        property_id: 1,
        content: "sm has requested to reserve the property 123 Broadway from 2025-04-01 to 2025-05-29.",
        is_read: true,
        is_cleared: false,
        created_at: "2023-03-19T17:49:13.838015Z",
        is_cancel_req: false,
    },
    {
        notification_id: 2,
        user_id: 1,
        reservation_id: 4,
        property_id: 1,
        content: "sm has requested to reserve the property 123 Broadway from 2025-04-01 to 2025-05-29.",
        is_read: true,
        is_cleared: true,
        created_at: "2023-01-19T17:49:13.838015Z",
        is_cancel_req: false,
    },
];

function Navbar() {
    return (
        <nav className="nav-main">
            <NavLogoLink />

            {/* <input type="text" name="search" class="search" placeholder="Search listings..." /> */}
            <SearchBar />

            <span className="tray-notif-avatar">
                <button className="btn-notif clickable-on-dark popup-parent">
                    {/* <!-- Bell Icon --> */}
                    <img src={bellFilledWhite} alt="Bell" />
                    {/* <!-- Notification Popup --> */}
                    <PopupDrawerScrollable notifications={dataNotifDemo} />
                </button>
                <AvaterWidget />
            </span>
        </nav>
    );
}

function NavLogoLink() {
    return (
        <Link className="nav-logo-link" to="/">
            <span className="logo-combo clickable-on-dark">
                <img className="logo-icon" src={logoIconGreenLight} alt="Logo Icon" />
                <h1>Restify</h1>
            </span>
        </Link>
    );
}

function PopupDrawerScrollable({ notifications }) {
    const entries = notifications
        .filter((notification) => !notification.is_cleared)
        .map((notification) => (
            <li key={notification.notification_id}>
                {/* TODO: change notification link after modal implementation complete */}
                <Link to={"/dashboard/#" + notification.property_id}>
                    <div
                        className={"notif-strip " + (notification.is_read ? "notif-strip-read" : "notif-strip-unread")}>
                        <p className="notif-preview">{notification.content}</p>
                        <span className="notif-time">
                            {new Date(notification.created_at)
                                .toISOString()
                                .split("T")
                                .join(" ")
                                .split(".")
                                .slice(0, 1)
                                .join("")}
                        </span>
                    </div>
                </Link>
            </li>
        ));

    return (
        <div className="popup popup-drawer-scrollable">
            <ul>{entries}</ul>
        </div>
    );
}

function AvaterWidget() {
    return (
        <button className="btn-avatar popup-parent">
            {/* <!-- Avatar Widget --> */}
            <span className="avatar-container">
                <img className="avatar" src={userAvaterDefault} alt="Avatar" />
            </span>
            <span className="avatar-slideout">
                <img src={chevronIconGreenDark} alt="▾" />
            </span>
            {/* <!-- Avatar Menu Popup --> */}
            <div className="popup popup-fixed">
                <ul>
                    <li>
                        <Link to="/">
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard">
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile">
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <span>Log out</span>
                            <img src={logOutIcon} alt="Exit" />
                        </Link>
                    </li>
                </ul>
            </div>
        </button>
    );
}

export default Navbar;
