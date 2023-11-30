import React, {useState, useEffect} from "react";
import "./Profile.css";
import Explore from "./Explore";
import { Button } from "@mui/material";

function Profile() {
  const accessToken = sessionStorage.getItem("accessToken");
  const userName = sessionStorage.getItem("userName");
  const [userInfo, setUserInfo] = useState({});

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
                <button id='btn-solid' style={{height:"32px", width:"100%", color:"black", borderRadius:"15px", border:"none"}}><span style={{fontWeight:"550", objectFit:"contain" , background:"transparent"}}>Edit profile</span></button>
               
              </div>
            </div>
            <div className="posts-followers-following-count" >
              
            <span style={{fontWeight:"500"}}>860</span> posts <span style={{fontWeight:"500"}}> </span> <span style={{fontWeight:"500"}}>{followerCount}</span> followers <span style={{fontWeight:"500"}}> {followingCount}</span> following
          </div>
          <div className="firstname-lastname">{userInfo.firstName} {userInfo.lastName}</div>
          <div className="bio">{userInfo.bio}
          </div>
          </div>

        </div>
        <div className="lower-half">
          <Explore />
        </div>
      </div>
    </div>
  );
}

export default Profile;
