import React, { useEffect, useState } from "react";
import "./reply_input.css";
import arrowRightPurp from "../../assets/icons/arrow-right-purple.svg"

function ReplyInput ({canReplyFunc, parentComment}) {
    return <div className="reply-input-container">
    <textarea placeholder="Reply to comment..."></textarea>
    <button className="send-arrow">
        <img src={arrowRightPurp} alt="" />
    </button>
</div>
}

export default ReplyInput