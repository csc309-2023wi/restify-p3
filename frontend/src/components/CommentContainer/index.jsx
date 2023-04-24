import React, { useEffect, useState } from "react";
import "./comment_container.css";
import PropertyComment from "./propertyComment"
import starFilled from "../../assets/icons/star-filled.svg"
import starEmpty from "../../assets/icons/star-empty.svg"
import arrowRightPurp from "../../assets/icons/arrow-right-purple.svg"

function CommentContainer({propertyId}) {
    const [commentList, setCommentList] = useState([]);
    const [canComment, setCanComment] = useState(false);

    const [star1, setStar1] = useState(starFilled)
    const [star2, setStar2] = useState(starEmpty)
    const [star3, setStar3] = useState(starEmpty)
    const [star4, setStar4] = useState(starEmpty)
    const [star5, setStar5] = useState(starEmpty)
    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState("")


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
        if (!localStorage.getItem("accessToken")) {
            return
        }
        fetch(`http://localhost:8000/api/comment/property/${propertyId}/check/`, {
            method: "GET",
            headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`,},
        })
            .then(async (response) => {
                if (response.ok) {
                    setCanComment(true)
                }
            })
        getComments(1)
    }, []);

    if (!localStorage.getItem("accessToken")) {
        return <ul className="content-list content-list-comments"><h1>Login to view comments.</h1></ul>
    }

    const star1Click = () => {
        setRating(1)
        setStar1(starFilled)
        setStar2(starEmpty)
        setStar3(starEmpty)
        setStar4(starEmpty)
        setStar5(starEmpty)
    }
    const star2Click = () => {
        setRating(2)
        setStar1(starFilled)
        setStar2(starFilled)
        setStar3(starEmpty)
        setStar4(starEmpty)
        setStar5(starEmpty)
    }
    const star3Click = () => {
        setRating(3)
        setStar1(starFilled)
        setStar2(starFilled)
        setStar3(starFilled)
        setStar4(starEmpty)
        setStar5(starEmpty)
    }
    const star4Click = () => {
        setRating(4)
        setStar1(starFilled)
        setStar2(starFilled)
        setStar3(starFilled)
        setStar4(starFilled)
        setStar5(starEmpty)
    }
    const star5Click = () => {
        setRating(5)
        setStar1(starFilled)
        setStar2(starFilled)
        setStar3(starFilled)
        setStar4(starFilled)
        setStar5(starFilled)
    }

    const postComment = () => {
        fetch(`http://localhost:8000/api/comment/property/${propertyId}/`, {
        method: "POST",
        headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        'Content-Type': 'application/json; charset=UTF-8',},
        body: JSON.stringify({
            rating: rating,
            content: comment
        })
       }).then(async (response) => {
        if(response.ok) {
            setCanComment(false)
            getComments(1)
        }
       })
    }
    return <ul className="content-list content-list-comments">
        {canComment?
        <li>
        <div class="comment-card">
            <div class="comment-info">
                <div class="rating-container">
                    <img src={star1} alt=""  onClick={star1Click}/>
                    <img src={star2} alt="" onClick={star2Click}/>
                    <img src={star3} alt="" onClick={star3Click}/>
                    <img src={star4} alt="" onClick={star4Click}/>
                    <img src={star5} alt="" onClick={star5Click}/>
                </div>
                <div class="reply-input-container">
                    <textarea placeholder="Leave a rating..." value={comment} onChange={(e) => (setComment(e.target.value))}></textarea>
                    <button class="send-arrow" onClick={postComment}>
                        <img src={arrowRightPurp} alt=""/>
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