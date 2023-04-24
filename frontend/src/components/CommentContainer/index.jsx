import React, { useEffect, useState } from "react";
import "./comment_container.css";
import PropertyComment from "./propertyComment"

function CommentContainer(propertyId) {
    const [commentList, setCommentList] = useState([]);
    const [canComment, setCanComment] = useState(false);

    const getComments = (page) => {
       fetch(`http://localhost:8000/api/comment/property/${propertyId}/?page=${page}`, {
        method: "GET",
        headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`,},
       }).then(async (response) => {
        if(response.ok) {
            let data = await response.json();
            setCommentList(data["results"]);
        }
       })
       
    }

    useEffect(() => {
        fetch(`http://localhost:8000/api/comment/property/${propertyId}/check/`)
            .then(async (response) => {
                if (response.ok) {
                    setCanComment(true)
                }
            })
        getComments(1)
    }, []);
    return <ul className="content-list content-list-comments">
        {canComment?
        <li>
        <div class="comment-card">
            <div class="comment-info">
                <div class="rating-container">
                    <img src="icons/star-empty.svg" alt="" />
                    <img src="icons/star-empty.svg" alt="" />
                    <img src="icons/star-empty.svg" alt="" />
                    <img src="icons/star-empty.svg" alt="" />
                    <img src="icons/star-empty.svg" alt="" />
                </div>
                <div class="reply-input-container">
                    <textarea placeholder="Leave a rating..."></textarea>
                    <button class="send-arrow">
                        <img src="/icons/arrow-right-purple.svg" alt=""/>
                    </button>
                </div>
            </div>
        </div>
    </li>: <></>}
        {commentList.map((comment, i) => (
            <PropertyComment content={comment} key={comment["id"]} />
        ))}
        {/*  */}
        
    </ul>
}

export default CommentContainer