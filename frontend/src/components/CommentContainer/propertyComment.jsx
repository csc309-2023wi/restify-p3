import React, { useEffect, useState } from "react";
import "./property_comment.css";
import ReplyInput from "./replyInput"
import ReplyCard from "./replyCard";
import starFilled from "../../assets/icons/star-filled.svg"
import starEmpty from "../../assets/icons/star-empty.svg"

function PropertyComment ({content}) {
    let datetime = content["posted_at"].split("T");
    let date = datetime[0];
    let time = datetime[1].split(".")[0]
    let filledStars = []
    let emptyStars = []
    const [name, setName] = useState("")
    const [avatar, setAvatar] = useState("")
    const [rating, setRating] = useState(0)
    const [canReply, setCanReply] = useState(false)
    const [canReplyGen, setCanReplyGen] = useState(false)
    const [hasReplyClass, setHasReplyClass] = useState("")
    const [hasReply, setHasReply] = useState(false)
    const [replies, setReplies] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8000/api/user/${content["commenter"]}/`)
            .then(async (response) => {
                if(response.ok){
                    let data = await response.json()
                    setName(data["first_name"] + " " + data["last_name"])
                    setAvatar(data["avatar"])
                }
            })
        
        fetch(`http://localhost:8000/api/comment/property/reply/${content["id"]}/check/`, {
            headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`,}
        })
            .then(async (response) => {
                if(response.ok) {
                    let data = await response.json()
                    if (data["reply_to"] === 0) {
                        setCanReply(true)
                    }
                    setCanReplyGen(true)

                }
            })
        
        fetch(`http://localhost:8000/api/comment/property/reply/${content["id"]}/`,
        {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`,}})
            .then(async (response) => {
                if (response.ok) {
                    let data = await response.json()
                    if (data["count"] > 0) {
                        console.log(data["count"])
                        setHasReply(true)
                        setReplies(data["results"])
                    }
                }
            })
    }, [])

    useEffect(() => {
        
        fetch(`http://localhost:8000/api/comment/property/reply/${content["id"]}/`,
        {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`,}})
            .then(async (response) => {
                if (response.ok) {
                    let data = await response.json()
                    if (data["count"] > 0) {
                        console.log(data["count"])
                        setHasReply(true)
                        setReplies(data["results"])
                    }
                }
            })
    }, [canReply])

    const canReplyFunc = (val) => {
        setCanReply(val)
        setCanReplyGen(val)
    }

    for (let i = 0; i < content["rating"]; i++) {
        filledStars.push(<img src={starFilled} alt="" key={i}/>)
    }
    for (let i = content["rating"]; i < 5; i++) {
        emptyStars.push(<img src={starEmpty} alt="" key={i}/>)
    } 
    return <li>
        <div className={`comment-card main-comment ${hasReply? "has-ratings":""}`}>
            <img className="profile-img" src={avatar} alt=""/>
            <div className="comment-info">
                <h4>{name}</h4>
                <div className="rating-container">
                    {filledStars}
                    {emptyStars}
                </div>
                <p><span className="date">{date}, {time}</span></p>
                <p>{content["content"]}</p>
                {canReply?
                    <ReplyInput canReplyFunc={canReplyFunc} parentComment={content["id"]}/>
                    : <></>
                }
                
            </div>
        </div>
        
        {hasReply ? 
        (<>
        <details className="reply-container">
        <summary className="comments-dropdown" comments-open="Hide Replies"
            comments-hidden="Show Replies"></summary>
        {replies.map((reply, i) => {
            if (!canReply && canReplyGen && i === replies.length - 1) {
                return <ReplyCard content={reply} canReply={true} key={reply["id"]}/>
            } else {
                return <ReplyCard content={reply} key={reply["id"]}/>
            }
            
        })}
        
        </details>
        </>) : (<></>)}

    </li>
}

export default PropertyComment