import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// TODO: leverage API context and authentication once it's implemented
var apiBase = "http://127.0.0.1:8000/api";

function NotificationTray() {
    const [notifications, setNotifications] = useState([]);

    // fetch notifications
    useEffect(() => {
        fetch(`${apiBase}/notifications/`, {
            method: "GET",
            headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        })
            .then(async (response) => {
                response.json().then((data) => {
                    setNotifications(data.results);
                });
            })
            .catch((reason) => {
                console.error(reason);
            });
    }, []);

    const entries = notifications
        .filter((notification) => !notification.is_cleared)
        .map((notification) => (
            <li key={notification.id}>
                <Link to={"/dashboard/?property_id=" + notification.property_id}>
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

export default NotificationTray;
