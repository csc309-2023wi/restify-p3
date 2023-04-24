import React, { useEffect, useState } from "react";
import "./reply_card.css";
import ReplyInput from "./replyInput";

function ReplyCard({content, canReply}) {
    let datetime = content["posted_at"].split("T");
    let date = datetime[0];
    let time = datetime[1].split(".")[0]
    const [name, setName] = useState("")
    const [avatar, setAvatar] = useState("")
    const [canReplyMore, setCanReplyMore] = useState(canReply)

    useEffect(() => {
        fetch(`http://localhost:8000/api/user/${content["commenter"]}/`)
            .then(async (response) => {
                if(response.ok){
                    let data = await response.json()
                    setName(data["first_name"] + " " + data["last_name"])
                    setAvatar(data["avatar"])
                }
            })
    })
    return <>
        <div className="comment-card reply host-reply">
            <img className="profile-img" src={avatar} alt=""/>
            <div className="comment-info">
                <h4>{name}</h4>
                <p><span className="date">{date + ", " + time}</span></p>
                <p>{content["content"]}</p>
                {canReplyMore?
                <ReplyInput canReplyFunc={setCanReplyMore} parentComment={content["comment_for"]}/>:<></>}
            </div>
        </div>
    </>
}

export default ReplyCard