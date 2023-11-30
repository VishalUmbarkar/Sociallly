import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Comment from "./Comment";
import "./Backdrop.css";

export default function SimpleBackdrop({
  posts,
  open,
  onClose,
  selectedPostId,
}) {
  const [comments, setComments] = React.useState([]);
  const accessToken = sessionStorage.getItem("accessToken");

  React.useEffect(() => {
    // Fetch comments for the selected post when the backdrop is opened
    if (selectedPostId) {
      getComments(selectedPostId);
    }
  }, [selectedPostId]);

  // Fetch comments for a specific post
  const getComments = (postId) => {
    fetch(`http://localhost:8080/feed/${selectedPostId}/comments`,{
      headers:{
        "Authorization":`Bearer ${accessToken}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      //   onClick={onClose}
    >
      {posts.map((post) => {
        if (post.postId === selectedPostId) {
          return (
            <div key={post.postId} className="post-container-backdrop">
              <div className="left-half">
                <img id="image-post"
                  src={post.image}
                  alt="post"
                  // style={{ height: "100%", width: "100%" }}
                />
              </div>

              <div className="right-half">
                <div className="username">
                  <p className="username-text" style={{ color: "black" }}>
                    {post.userName}
                  </p>
                </div>

                <div
                  className="comment-list"
                  style={{ marginTop: "10px", marginLeft: "40px" }}
                >
                  {comments.map((comment) => (
                    <div className="preview-comments-backdrop" key={comment.id}>
                      <p className="footer-post-username">{comment.userName}</p>
                      <p className="comment" style={{ marginLeft: "0" }}>
                        {comment.comment}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="add-comment">
                  <Comment postId={post.postId}/>
                </div>
              </div>
            </div>
          );
        }
        return null;
      })}
      <button onClick={onClose} className="close-btn">
        <img src="/close.png"></img>
      </button>
    </Backdrop>
  );
}
