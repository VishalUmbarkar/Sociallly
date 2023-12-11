import React, { useState, useEffect } from "react";
import "./Feed.css";
import Comment from "./Comment";
import Backdrop from "./Backdrop";
import { useNavigate } from "react-router-dom";


function Feed() {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("accessToken");
  const UserName = sessionStorage.getItem("userName");
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [previewComments, setPreviewComments] = useState([]);
  

  // console.log(accessToken);

  useEffect(() => {
    fetch(`http://localhost:8080/feed/${UserName}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data.reverse());
        // Initialize likedPosts state with an array for each post
        //setPosts([...data].reverse());
        console.log(posts);
        setLikedPosts(Array(data.length).fill(false));
  
        // Fetch comments for each post and update previewComments state
        data.forEach((post) => {
          fetch(`http://localhost:8080/feed/${post.postId}/comments?limit=2`,{
            headers:{
              "Authorization": `Bearer ${accessToken}`
            }
          })
            .then((response) => response.json())
            .then((comments) => {
              setPreviewComments((prevComments) => ({
                ...prevComments,
                [post.postId]: comments,
              }));
            })
            .catch((err) => {
              console.log(err.message);
              navigate('/login')
            });
        });
      })
      .catch((err) => {
        console.log(err.message);
        navigate('/login');
      });
  }, []);
  

  const getComments = (postId) => {
    fetch(`http://localhost:8080/feed/${postId}/comments`,{

      headers:{
        "Authorization":`Bearer ${accessToken}`
      },
    })
    
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
  };

  const handleLikeClick = (index) => {
    const newLikedPosts = [...likedPosts];
    newLikedPosts[index] = !newLikedPosts[index];
    setLikedPosts(newLikedPosts);
    const isLikedPost = newLikedPosts[index];
    const postid = posts[index].postId;
    const incrementedLikes = posts[index].likes + 1;
    const decrementedLikes = posts[index].likes - 1;

    if (!isLikedPost) {
      fetch(`http://localhost:8080/feed/${postid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          userId: posts[index].userId,
          userName: posts[index].userName,
          noOfnoOfComments: posts[index].noOfComments,
          likes: decrementedLikes,
          captions: posts[index].captions,
          imagePath: posts[index].imagePath,
        }),
      })
        .then((response) => response.json())
        .then((updatedPost) => {
          console.log("Likes updated successfully:", updatedPost);
          const newPosts = [...posts];
          newPosts[index] = updatedPost;
          setPosts(newPosts);
        })
        .catch((error) => {
          console.error("Error updating likes:", error);
        });
    } else {
      fetch(`http://localhost:8080/feed/${postid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          noOfComments: posts[index].noOfComments,
          likes: incrementedLikes,
        }),
      })
        .then((response) => response.json())
        .then((updatedPost) => {
          console.log("Likes updated successfully:", updatedPost);
          const newPosts = [...posts];
          newPosts[index] = updatedPost;
          setPosts(newPosts);
        })
        .catch((error) => {
          console.error("Error updating likes:", error);
        });
    }
  };

  const handleCommentClick = (postId) => {
    setSelectedPostId(postId);
    setOpenBackdrop(true);
    getComments(postId);
  };

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
    setSelectedPostId(null);
  };

  const handleProfileClick=(userName)=>{
    navigate('/profile', { state: { yourProps: { userName } } });
  }

  return (
    <div>
      <div className="posts-container" style={{marginTop:"70px"}}>
        {/* <div className="feed-label">
          <img src="/feed_logo.png" alt="feed" style={{ height: "23px" }}></img>
        </div> */}
        {posts.map((post, index) => {
          const isLiked = likedPosts[index];

          return (
            <div className="post-card" key={post.id}>
              <div className="post-header">
                <div className="profilePicture">
                  <img
                    src="/profilePicture.png"
                    id="proPic"
                    alt="profile pic"
                  ></img>
                </div>
                <div className="post-username" style={{cursor:"pointer"}} onClick={(e) => handleProfileClick(post.userName)}>
                  <p>{post.userName}</p>
                </div>
              </div>
              <div className="post-image">
                <img src={post.imagePath} id="post-img" alt="image"  ></img>
              </div>
              <div className="footer-btn">
                <button onClick={() => handleLikeClick(index)}>
                  {isLiked ? (
                    <img src="/liked.png" alt="liked-btn" style={{background: "transparent" }}></img>
                  ) : (
                    <img src="/like.png" alt="like-btn"></img>
                  )}
                </button>
                <div className="footer-likes">
                  {/* <span style={{ fontSize: "15px" }}>{post.likes}</span> */}
                </div>
                <button onClick={() => handleCommentClick(post.postId)}>
                  <img src="/comment.png" alt="comment-btn"></img>
                </button>
                <div className="footer-likes">
                  {/* <span style={{ fontSize: "15px" }}>{post.noOfComments}</span> */}
                </div>
                <button>
                  <img src="/share.png" alt="share-btn" style={{background: "transparent" }}></img>
                </button>
              </div>
              {post.likes !== null && (
  <span style={{ fontSize: "15px", fontWeight: "500", marginLeft: "1px" }}>
    {post.likes} <span>{post.likes > 1 ? 'likes' : 'like'}</span>
  </span>
)}


              <div className="footer">
                <div className="post-ftr-username">
                  <p>{post.userName}</p>
                </div>
                <p className="post-caption">{post.captions}</p>
              </div>

              {previewComments[post.postId] &&
                previewComments[post.postId].slice(0, 2).map((comment) => (
                  <div className="post-preview-comments" key={comment.id}>
                    <p className="footer-post-username">{comment.userName}</p>
                    <p className="comment">{comment.comment}</p>
                  </div>
                ))}
              <div
                className="comment-btn"
                onClick={() => handleCommentClick(post.postId)}
              >
                View all {post.noOfComments} comments...
              </div>
              <div className="comment-box">
                <Comment  postId={post.postId}/>
              </div>
            </div>
          );
        })}
      </div>
      {openBackdrop && (
        <Backdrop
          posts={posts}
          open={openBackdrop}
          onClose={handleCloseBackdrop}
          selectedPostId={selectedPostId}
        />
      )}
    </div>
  );
}

export default Feed;
