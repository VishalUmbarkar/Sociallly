import React from 'react'
import { useState, useEffect } from 'react';
import './Comment.css'

function Comment() {

    const [inputValue, setInputValue] = useState('');
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState({});
    const [postIds, setPostIds] = useState([]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
      };

      //http request to get all the posts 
      useEffect(() => {
        fetch('http://localhost:8080/feed')
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setPosts(data);
            // Initialize likedPosts state with an array for each post
            //setLikedPosts(Array(data.length).fill(false));
            const extractedPostIds = data.map((post) => post.postId);
        setPostIds(extractedPostIds);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }, []);


      

        var id = Number(postIds[0]);
        //console.log(id);

      const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8080/feed/${postIds[0]}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        "userName" : "vishal_umbarkar",
        "comment": inputValue,
       }),
    })
      .then((response) => response.json())
      .then((newComment)=>{
        console.log('comment added:', newComment);
        setComments((prevComments) => ({
            ...prevComments,
            [id]: [...(prevComments[id] || []), newComment],
          }));
          setInputValue('');
      })
       .catch((error)=>{
        console.error(error);
       });
       window.location.reload();
      };

  return (
    <div className='comment'>
        <input type='text' value={inputValue} onChange={handleInputChange} placeholder='Add a comment...'></input>
        {inputValue.trim() && (
        <button type="submit" onClick={handleSubmit}>
          Post
        </button>
      )}

    </div>
  )
}

export default Comment