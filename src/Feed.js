

import React, { useState, useEffect } from 'react';
import './Feed.css';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [comments, setComments] = useState({});

  useEffect(() => {
    fetch('http://localhost:8080/feed')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
        // Initialize likedPosts state with an array for each post
        setLikedPosts(Array(data.length).fill(false));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const getComments = (postId)=>{
  
    fetch(`http://localhost:8080/feed/${postId}/comments`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    setComments((prevComments) => ({
        ...prevComments,
        [postId]: data, // Store comments for the specific post
      }));
  })
  .catch((err) => {
    console.log(err.message);
  });
  return comments;
}

  

  
    const handleLikeClick = (index) => {
    // Create a copy of likedPosts
    const newLikedPosts = [...likedPosts];
    // Toggle the like state for the specific post
    newLikedPosts[index] = !newLikedPosts[index];
    // Update the likedPosts state
    setLikedPosts(newLikedPosts);

    // Get the postId from the clicked post
    const isLikedPost = newLikedPosts[index];
    const postid = posts[index].postId;
    const incrementedLikes = posts[index].likes+1;
    const decrementedLikes = posts[index].likes-1;
    console.log(posts);

    if(!isLikedPost){
        fetch(`http://localhost:8080/feed/${postid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "userId" : posts[index].userId,
      "userName" : posts[index].userName,
      "noOfnoOfComments": posts[index].noOfComments,
      "likes": decrementedLikes,
      "captions": posts[index].captions,
      "image" : posts[index].image }),
    })
      .then((response) => response.json())
      .then((updatedPost) => {
        console.log('Likes updated successfully:', updatedPost);
        // Perform any additional actions after the likes are updated
        const newPosts = [...posts];
      newPosts[index] = updatedPost;
      setPosts(newPosts);
      })
      .catch((error) => {
        console.error('Error updating likes:', error);
      });
    }
    else
    fetch(`http://localhost:8080/feed/${postid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
       body: JSON.stringify({ //"userId" : posts[index].userId,
      //"userName" : posts[index].userName,
      "noOfComments": posts[index].noOfComments,
      "likes": incrementedLikes,
      //"captions": posts[index].captions,
      //"image" : posts[index].image
 }),
    })
      .then((response) => response.json())
      .then((updatedPost) => {
        console.log('Likes updated successfully:', updatedPost);
        // Perform any additional actions after the likes are updated
        const newPosts = [...posts];
      newPosts[index] = updatedPost;
      setPosts(newPosts);
      })
      .catch((error) => {
        console.error('Error updating likes:', error);
      });
  };

  return (
    <div>
      <div className="posts-container">
        <div className='feed-label'>
          <img src='/feed logo.png' alt='feed' style={{height:"23px"}}></img>
        </div>
        {posts.map((post, index) => {
          const isLiked = likedPosts[index];

          return (
            <div className="post-card" key={post.id}>
              <div className='post-header'>
                <div className='profilePicture'>
                  <img src='/profilePicture.png' id='proPic' alt='profile pic'></img>
                </div>
                <div className='post-username'>
                  <p>{post.userName}</p>
                </div>
              </div>
              <div className="post-image">
                <img src={post.image} id='post-img' alt='image'></img>
              </div>
              <div className='footer-btn'>
                <button onClick={() => handleLikeClick(index)}>
                  {isLiked ? (
                    <img src='/liked.png' alt='liked-btn'></img>
                  ) : (
                    <img src='/like.png' alt='like-btn'></img>
                  )}
                </button>
                <div className='footer-likes'>
                  <span style={{fontSize:"15px"}}>{post.likes}</span>
                </div>
                <button>
                  <img src='/comment.png' alt='comment-btn'></img>
                </button>
                <div className='footer-likes'>
                  <span style={{fontSize:"15px"}}>{post.noOfComments}</span>
                </div>
                <button>
                  <img src='/share.png' alt='share-btn'></img>
                </button>
              </div>
              <div className='footer'>
                <div className='footer-post-username'>
                  <p>{post.userName}</p>
                </div>
                <p className="post-caption">{post.captions}</p>
              </div>

              {comments[post.postId] && comments[post.postId].map((comment) => (
              
              <div className='preview-comments' key={comment.id}>
                <p className='footer-post-username'>{comment.userName}</p>
                <p className='comment'>{comment.comment}</p>
                
              </div>))}
              <div className='comment-btn' onClick={() => getComments(post.postId)}>View all {post.noOfComments} comments...</div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Feed;

