import React, { useEffect, useState } from "react";
import "./user_container.css";
import UserCard from "./userCard"

function UserContainer ({userIds}) {
    const [userList, setUserList] = useState(userIds);
    return <ul class="content-list content-list-comments">
        {userList.map((id, i) => {
            return <UserCard userId={id} key={id}/>
        }
        )}
    </ul>
}

export default UserContainer