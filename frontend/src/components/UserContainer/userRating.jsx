import React, { useEffect, useState } from "react";
import starFilled from "../../assets/icons/star-filled.svg"
import starEmpty from "../../assets/icons/star-empty.svg"

function UserRating ({content}) {
    let datetime = content["posted_at"].split("T");
    let date = datetime[0];
    let time = datetime[1].split(".")[0]
    let filledStars = []
    let emptyStars = []
    const [name, setName] = useState("")
    const [avatar, setAvatar] = useState("")
    useEffect(() => {
        fetch(`http://localhost:8000/api/user/${content["commenter"]}/`)
            .then(async (response) => {
                if(response.ok){
                    let data = await response.json()
                    setName(data["first_name"] + " " + data["last_name"])
                    setAvatar(data["avatar"])
                }
            })
    }
    )
    for (let i = 0; i < content["rating"]; i++) {
        filledStars.push(<img src={starFilled} alt="" key={i}/>)
    }
    for (let i = content["rating"]; i < 5; i++) {
        emptyStars.push(<img src={starEmpty} alt="" key={i}/>)
    }
    return <li>
    <div class="comment-card reply host-reply">
        <img class="profile-img" src={avatar} alt=""/>
        <div class="comment-info">
            <h4>{name}</h4>
            <div className="rating-container">
                    {filledStars}
                    {emptyStars}
            </div>
            <p><span class="date">{date + ", " + time}</span></p>
            <p>{content["content"]}</p>
        </div>
    </div>
    </li>
}

export default UserRating