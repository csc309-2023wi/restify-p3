import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// TODO: leverage API context and authentication once it's implemented
var apiBase = "http://127.0.0.1:8000/api";
var u1Token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgyMTA5ODczLCJpYXQiOjE2ODIwMjM0NzMsImp0aSI6ImVhNTJmN2YwYzM0ZTQyYzk5OTE3NWYxN2MyYjMzNTEzIiwidXNlcl9pZCI6MX0.TAOIO1v5OrLb8GTNGWpen9iZNN3v9NsQxHswLfcOa8M";
var u2Token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgyMTEwMDc1LCJpYXQiOjE2ODIwMjM2NzUsImp0aSI6IjNlNGI0ZGYzNzE2MzRjZGJhYjNkYWE2YWRkYWM0ZDBmIiwidXNlcl9pZCI6Mn0.58bZnSb0c-9KM0ld-ivSpuhrgSEO4zP3JF74zqBr37o";

function NotificationTray() {
    const [notifications, setNotifications] = useState([]);

    // fetch notifications
    useEffect(() => {
        fetch(`${apiBase}/notifications/`, {
            method: "GET",
            headers: { Authorization: `Bearer ${u1Token}` },
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
                            {/* TODO: consume date once it's enabled in backend */}
                            {/* {new Date(notification.created_at)
                                .toISOString()
                                .split("T")
                                .join(" ")
                                .split(".")
                                .slice(0, 1)
                                .join("")} */}
                            XXXX-XX-XX 11:22:33
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
