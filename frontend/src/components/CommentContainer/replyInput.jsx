import React, { useEffect, useState } from "react";
import "./reply_input.css";
import arrowRightPurp from "../../assets/icons/arrow-right-purple.svg"

function ReplyInput ({canReplyFunc, parentComment}) {
    const [replyContent, setReplyContent] = useState("")
    const handleReply = () => {
        fetch(`http://localhost:8000/api/comment/property/reply/${parentComment}/`, {
            method: "POST",
            headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            'Content-Type': 'application/json; charset=UTF-8',},
            body: JSON.stringify({
                content: replyContent
            })
        }).then(async (response) => {
            if (response.ok) {
                console.log(canReplyFunc)
                canReplyFunc(false)
            }
        })
    }

    return <div className="reply-input-container">
    <textarea placeholder="Reply to comment..." value={replyContent} onChange={(e) => {setReplyContent(e.target.value)}}></textarea>
    <button className="send-arrow">
        <img src={arrowRightPurp} alt="" onClick={handleReply}/>
    </button>
</div>
}

export default ReplyInput