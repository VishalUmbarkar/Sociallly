import React, {useState, useEffect} from "react";
import "./Profile.css";
import Explore from "./Explore";
import { Button } from "@mui/material";
import UserPosts from "./UserPosts";
import EditProfile from "./EditProfile";

function Profile() {
  const accessToken = sessionStorage.getItem("accessToken");
  const userName = sessionStorage.getItem("userName");
  const [userPosts, setUserPosts]=useState({});
  const [userInfo, setUserInfo] = useState({});
  const [openEditBackdrop, setOpenEditBackdrop] = useState(false);


const onClose=()=>{
    setOpenEditBackdrop(false);
  }

  const handleEditButtonClick=()=>{
    setOpenEditBackdrop(true);
  }

  
  useEffect(() => {
    fetch(`http://localhost:8080/search/${userName}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
    })
    .then((response) => response.json())
    .then((data)=>{
      setUserInfo(data);
      console.log(userInfo);

    })

    fetch(`http://localhost:8080/getPost/${userName}`,{

      method:'GET',
      headers:{
        "content-type":"application/json",
        "Authorization":`Bearer ${accessToken}`
      }
    })
    .then((response)=>response.json())
    .then((posts)=>{
      setUserPosts(posts.reverse());
      console.log(posts);
    })

  },[])

  var followerCount;
  var followingCount;
  if (Array.isArray(userInfo.followers)){
    followerCount=userInfo.followers.length;
    followingCount=userInfo.following.length;
  }

  const handleLogout = () => {
    sessionStorage.removeItem(accessToken);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="main-container">
        <div className="upper-half">
          <div className="upper-left-half"></div>
          <div className="upper-right-half">
            <div className="profile-and-follow-btn" style={{display:"flex", flexDirection:"row", justifyContent:"space-between", margin:"15px"}}>
              <div className="profile-username" style={{fontSize:"20px",fontWeight:"500"}}>@{userInfo.userName}</div>
                <div className="edit-profile-btn" style={{marginLeft:"10px"}}>
                  {/* <button id="btn-solid" style={{borderRadius:"3px"}}>Edit Profile</button> */}
                <button id='btn-solid' style={{height:"32px", width:"100%", color:"black", borderRadius:"15px", border:"none"}}><span style={{fontWeight:"550", objectFit:"contain" , background:"transparent"}} onClick={handleEditButtonClick}>Edit profile</span></button>
                
              </div>
            </div>
      
            <div className="posts-followers-following-count" >
              
            <span style={{fontWeight:"500"}}>{userPosts.length}</span> posts <span style={{fontWeight:"500"}}> </span> <span style={{fontWeight:"500"}}>{followerCount}</span> followers <span style={{fontWeight:"500"}}> {followingCount}</span> following
          </div>
          <div className="firstname-lastname">{userInfo.firstName} {userInfo.lastName}</div>
          <div className="bio">{userInfo.sociallyBio}
          </div>
          </div>

        </div>
        <div className="lower-half">
          {userPosts.length>0?<UserPosts userPosts={userPosts}/>:<div style={{display:"flex", marginTop:"80px", justifyContent:"left", fontSize:"25px"}}><label htmlFor="img">No posts yet.. <br /><img src="/camera.png" style={{objectFit:"contain", marginLeft:"10px", marginTop:"10px",border:"1px solid black",borderRadius:"50%", objectFit:"cover"}}></img></label></div>}
        </div>
      </div>
      {openEditBackdrop && (
        <EditProfile open={openEditBackdrop} userInfo={userInfo} onClose={onClose} />
      )}
    </div>
  );
}

export default Profile;
