import React, { useEffect, useState } from "react";
import "./comment_container.css";
import PropertyComment from "./propertyComment"

function CommentContainer(propertyId) {
    const [commentList, setCommentList] = useState([]);
    let commentHTML = []
    const getComments = (page) => {
       fetch(`http://localhost:8000/api/comment/property/${1}/?page=${page}`, {
        method: "GET",
        headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`,},
       }).then(async (response) => {
        if(response.ok) {
            let data = await response.json();
            setCommentList(data["results"]);
            console.log(commentList);
            for (let comment in data["results"]) {
                commentHTML.push(<PropertyComment content={comment} />)
            } 
            console.log(commentHTML)
        }
       })
       
    }

    useEffect(() => {
        getComments(1)
    }, []);
    return <ul className="content-list content-list-comments">
        {/* {commentHTML} */}
        {commentList.map((comment, i) => (
            <PropertyComment content={comment} key={comment["id"]} />
        ))}
        {/*  */}
        
    </ul>
}

export default CommentContainer