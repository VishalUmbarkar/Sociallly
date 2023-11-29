import React from "react";
import { useState, useEffect } from "react";
import "./Comment.css";

function Comment({ postId }) {
  const [inputValue, setInputValue] = useState("");
  // const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  // const [postIds, setPostIds] = useState([]);
  const accessToken = sessionStorage.getItem("accessToken");
  const userName = sessionStorage.getItem("userName");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  console.log(postId);
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8080/feed/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${accessToken}`
      },
      body: JSON.stringify({
        userName: userName,
        comment: inputValue,
      }),
    })
      .then((response) => response.json())
      .then((newComment) => {
        //console.log("comment added:", newComment);
        setComments((prevComments) => ({
          ...prevComments,
          [postId]: [
            ...(prevComments[postId] || []),
            newComment,
          ],
        }));
        //console.log(selectedPostId);
        setInputValue("");
      })
      .catch((error) => {
        console.error(error);
      });
    window.location.reload();
  };

  return (
    <div className="comment">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add a comment..."
      ></input>
      {inputValue.trim() && (
        <button id="comment-btn" type="submit" onClick={handleSubmit}>
          Post
        </button>
      )}
    </div>
  );
}

export default Comment;
