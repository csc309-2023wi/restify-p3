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
import NotificationTray from "./notificationTray";

function Navbar() {
    return (
        <nav className="nav-main">
            <NavLogoLink />
            <SearchBar />
            <NavAuthWidget />
        </nav>
    );
}

function NavAuthWidget() {
    const token = localStorage.getItem("accessToken");
    if (token && token.length > 0) {
        return (
            <span className="tray-notif-avatar">
                <button className="btn-notif clickable-on-dark popup-parent">
                    {/* <!-- Bell Icon --> */}
                    <img src={bellFilledWhite} alt="Bell" />
                    {/* <!-- Notification Popup --> */}
                    <NotificationTray />
                </button>
                <AvaterWidget />
            </span>
        );
    } else {
        return (
            <span className="tray-notif-avatar">
                <Link className={"action-btn bordered-dark btn-nav-auth"} text="" to="/auth">
                    Sign up | Log in
                </Link>
            </span>
        );
    }
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
                        {/* TODO: implement logout */}
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
