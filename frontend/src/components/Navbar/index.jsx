import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./navbar.css";

// import icons
import bellFilledWhite from "../../assets/icons/bell-filled-white.svg";
import logoIconGreenLight from "../../assets/icons/logo-icon-green-light.svg";
import userAvatarDefault from "../../assets/images/user-avatar-default.png";
import chevronIconGreenDark from "../../assets/icons/chevron-down-green-dark.svg";
import logOutIcon from "../../assets/icons/log-out-dray-dark.svg";

// import components
import SearchBar from "./searchBar";
import NotificationTray from "./notificationTray";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token && token.length > 0) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <nav className="nav-main">
            <NavLogoLink />
            <SearchBar />
            <NavAuthWidget isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </nav>
    );
}

function NavAuthWidget({ isLoggedIn, setIsLoggedIn }) {
    if (isLoggedIn) {
        return (
            <span className="tray-notif-avatar">
                <button className="btn-notif clickable-on-dark popup-parent">
                    {/* <!-- Bell Icon --> */}
                    <img src={bellFilledWhite} alt="Bell" />
                    {/* <!-- Notification Popup --> */}
                    <NotificationTray />
                </button>
                <AvatarWidget setIsLoggedIn={setIsLoggedIn} />
            </span>
        );
    } else {
        return (
            <span className="tray-notif-avatar">
                <Link className={"action-btn bordered-dark btn-nav-auth"} to="/auth">
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

function AvatarWidget({ setIsLoggedIn }) {
    const logOut = () => {
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
    };
    return (
        <button className="btn-avatar popup-parent">
            {/* <!-- Avatar Widget --> */}
            <span className="avatar-container">
                <img className="avatar" src={userAvatarDefault} alt="Avatar" />
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
                        <Link onClick={logOut} to="/">
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
