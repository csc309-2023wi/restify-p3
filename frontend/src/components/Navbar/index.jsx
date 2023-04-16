import React from "react";
import "./navbar.css";

function Navbar() {
    return (
        <nav class="nav-main">
            <a class="nav-logo-link" href="index.html">
                <span class="logo-combo clickable-on-dark" onclick="r">
                    <img class="logo-icon" src="icons/logo-icon-green-light.svg" alt="Logo Icon" />
                    <h1>Restify</h1>
                </span>
            </a>

            <input type="text" name="search" class="search" placeholder="Search listings..." />

            <span class="tray-notif-avatar">
                <button class="btn-notif clickable-on-dark popup-parent">
                    {/* <!-- Bell Icon --> */}
                    <img src="icons/bell-filled-white.svg" alt="Bell" />
                    {/* <!-- Notification Popup --> */}
                    <div class="popup popup-drawer-scrollable">
                        <ul>
                            <li>
                                <a href="#">
                                    <div class="notif-strip notif-strip-unread">
                                        <h4>Title of the notification is too long to fit inside</h4>
                                        <span class="notif-time">11:20 PM Mnt. 42, 2056</span>
                                        <p class="notif-preview">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin auctor,
                                            mauris vel malesuada gravida, velit augue commodo enim, vel luctus velit
                                            velit in quam. Vivamus vel aliquet magna. Integer ac magna vel sapien
                                            placerat scelerisque eget eget metus. Morbi id vestibulum nisi. Nam sit amet
                                            eros tempor, hendrerit est eu, congue magna.
                                        </p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="notif-strip">
                                        <h4>Title of the notification is too long to fit inside</h4>
                                        <span class="notif-time">11:20 PM Mnt. 42, 2056</span>
                                        <p class="notif-preview">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin auctor,
                                            mauris vel malesuada gravida, velit augue commodo enim, vel luctus velit
                                            velit in quam. Vivamus vel aliquet magna. Integer ac magna vel sapien
                                            placerat scelerisque eget eget metus. Morbi id vestibulum nisi. Nam sit amet
                                            eros tempor, hendrerit est eu, congue magna.
                                        </p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="notif-strip">
                                        <h4>Title of the notification is too long to fit inside</h4>
                                        <span class="notif-time">11:20 PM Mnt. 42, 2056</span>
                                        <p class="notif-preview">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin auctor,
                                            mauris vel malesuada gravida, velit augue commodo enim, vel luctus velit
                                            velit in quam. Vivamus vel aliquet magna. Integer ac magna vel sapien
                                            placerat scelerisque eget eget metus. Morbi id vestibulum nisi. Nam sit amet
                                            eros tempor, hendrerit est eu, congue magna.
                                        </p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="notif-strip">
                                        <h4>Title of the notification is too long to fit inside</h4>
                                        <span class="notif-time">11:20 PM Mnt. 42, 2056</span>
                                        <p class="notif-preview">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin auctor,
                                            mauris vel malesuada gravida, velit augue commodo enim, vel luctus velit
                                            velit in quam. Vivamus vel aliquet magna. Integer ac magna vel sapien
                                            placerat scelerisque eget eget metus. Morbi id vestibulum nisi. Nam sit amet
                                            eros tempor, hendrerit est eu, congue magna.
                                        </p>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </button>
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
                                <a href="index.html">
                                    <span>Home</span>
                                </a>
                            </li>
                            <li>
                                <a href="dashboard.html">
                                    <span>Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a href="profile.html">
                                    <span>Profile</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span>Log out</span>
                                    <img src="icons/log-out-dray-dark.svg" alt="Exit" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </button>
            </span>
        </nav>
    );
}

export default Navbar;
