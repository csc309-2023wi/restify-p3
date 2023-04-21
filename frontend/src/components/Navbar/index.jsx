import React from "react";
import { Link } from "react-router-dom";

import "./navbar.css";

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
        <nav class="nav-main">
            <NavLogoLink />

            <input type="text" name="search" class="search" placeholder="Search listings..." />

            <span class="tray-notif-avatar">
                <button class="btn-notif clickable-on-dark popup-parent">
                    {/* <!-- Bell Icon --> */}
                    <img src="icons/bell-filled-white.svg" alt="Bell" />
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
        <Link class="nav-logo-link" to="/">
            <span class="logo-combo clickable-on-dark" onclick="r">
                <img class="logo-icon" src="icons/logo-icon-green-light.svg" alt="Logo Icon" />
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
        <div class="popup popup-drawer-scrollable">
            <ul>{entries}</ul>
        </div>
    );
}

function AvaterWidget() {
    return (
        <button class="btn-avatar popup-parent">
            {/* <!-- Avatar Widget --> */}
            <span class="avatar-container">
                <img class="avatar" src="images/user-avatar-default.png" alt="Avatar" />
            </span>
            <span class="avatar-slideout">
                <img src="icons/chevron-down-green-dark.svg" alt="▾" />
            </span>
            {/* <!-- Avatar Menu Popup --> */}
            <div class="popup popup-fixed">
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
                            <img src="icons/log-out-dray-dark.svg" alt="Exit" />
                        </Link>
                    </li>
                </ul>
            </div>
        </button>
    );
}

export default Navbar;
