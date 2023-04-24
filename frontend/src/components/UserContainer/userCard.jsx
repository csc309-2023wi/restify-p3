import React, { useEffect, useState } from "react";
import "./user_card.css";
import UserRating from "./userRating"
import starFilled from "../../assets/icons/star-filled.svg"
import starEmpty from "../../assets/icons/star-empty.svg"
import arrowRightPurp from "../../assets/icons/arrow-right-purple.svg"

function UserCard (userId) {
    const [name, setName] = useState("")
    const [avatar, setAvatar] = useState("")
    const [canRate, setCanRate] = useState(false)
    const [hasRating, setHasRating] = useState(false)
    const [ratings, setRatings] = useState([])

    const [star1, setStar1] = useState(starFilled)
    const [star2, setStar2] = useState(starEmpty)
    const [star3, setStar3] = useState(starEmpty)
    const [star4, setStar4] = useState(starEmpty)
    const [star5, setStar5] = useState(starEmpty)
    const [starRating, setStarRating] = useState(1)
    const [comment, setComment] = useState("")

    useEffect(() => {
        fetch(`http://localhost:8000/api/user/${userId}/`)
            .then(async (response) => {
                if(response.ok){
                    let data = await response.json()
                    setName(data["first_name"] + " " + data["last_name"])
                    setAvatar(data["avatar"])
                }
            })
        
        fetch(`http://localhost:8000/api/comment/user/${userId}/check/`, {
            headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`,}
        })
            .then(async (response) => {
                if(response.ok) {
                    setCanRate(true)
                }
            })
        
        fetch(`http://localhost:8000/api/comment/user/${userId}/`,
        {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`,}})
            .then(async (response) => {
                if (response.ok) {
                    let data = await response.json()
                    if (data["count"] > 0) {
                        console.log(data["count"])
                        setHasRating(true)
                        setRatings(data["results"])
                    }
                }
            })
    }, [])

    const star1Click = () => {
        setStarRating(1)
        setStar1(starFilled)
        setStar2(starEmpty)
        setStar3(starEmpty)
        setStar4(starEmpty)
        setStar5(starEmpty)
    }
    const star2Click = () => {
        setStarRating(2)
        setStar1(starFilled)
        setStar2(starFilled)
        setStar3(starEmpty)
        setStar4(starEmpty)
        setStar5(starEmpty)
    }
    const star3Click = () => {
        setStarRating(3)
        setStar1(starFilled)
        setStar2(starFilled)
        setStar3(starFilled)
        setStar4(starEmpty)
        setStar5(starEmpty)
    }
    const star4Click = () => {
        setStarRating(4)
        setStar1(starFilled)
        setStar2(starFilled)
        setStar3(starFilled)
        setStar4(starFilled)
        setStar5(starEmpty)
    }
    const star5Click = () => {
        setStarRating(5)
        setStar1(starFilled)
        setStar2(starFilled)
        setStar3(starFilled)
        setStar4(starFilled)
        setStar5(starFilled)
    }

    const getRatings = () => {
        fetch(`http://localhost:8000/api/comment/user/${userId}/`,
        {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`,}})
            .then(async (response) => {
                if (response.ok) {
                    let data = await response.json()
                    if (data["count"] > 0) {
                        console.log(data["count"])
                        setHasRating(true)
                        setRatings(data["results"])
                    }
                }
            })
    }

    const postComment = () => {
        fetch(`http://localhost:8000/api/comment/user/${userId}/`, {
        method: "POST",
        headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        'Content-Type': 'application/json; charset=UTF-8',},
        body: JSON.stringify({
            rating: starRating,
            content: comment
        })
       }).then(async (response) => {
        if(response.ok) {
            setCanRate(false)
            getRatings()
        }
       })
    }

    return <li>
    <div class="past-guest-card has-ratings">
        <div class="guest-info">
            <img class="profile-img" src={avatar} alt=""/>
            <h4>{name}</h4>
        </div>

        {canRate?
            <>
                <div class="rating-container">
                    <img src={star1} alt=""  onClick={star1Click}/>
                    <img src={star2} alt="" onClick={star2Click}/>
                    <img src={star3} alt="" onClick={star3Click}/>
                    <img src={star4} alt="" onClick={star4Click}/>
                    <img src={star5} alt="" onClick={star5Click}/>
                </div>
                <div class="reply-input-container">
                    <textarea placeholder="Leave a rating..." value={comment} onChange={(e) => (setComment(e.target.value))}></textarea>
                    <button class="send-arrow">
                        <img src={arrowRightPurp} alt=""/>
                    </button>
                </div>
            </> : <></>
        }

        {hasRating?
            <>
            <details>
                <summary class="comments-dropdown" comments-open="Hide Host Ratings"
                    comments-hidden="Show Host Ratings"></summary>
                <ul>
                    {ratings.map((rating, i) => {
                        return <UserRating content={rating} key={rating["id"]}/>
                    }
                    )}
                </ul>
            </details>
            </>:<></>
        }
        
    </div>
    </li>
}