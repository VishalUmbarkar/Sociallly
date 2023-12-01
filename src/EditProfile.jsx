import React, { useState } from "react";
import { Backdrop } from "@mui/material";
import "./EditProfile.css";

function EditProfile({ open, userInfo, onClose }) {

    const [firstName,setFirstName]=useState('');
    const [lastName, setLastName] = useState('');
    const [sociallyBio, setSociallyBio]= useState('');
    const accessToken=sessionStorage.getItem("accessToken");
    const userName=sessionStorage.getItem("userName");

    console.log(userInfo);

    const handleSubmit=()=>{
        fetch(`http://localhost:8080/edit/${userName}`,{
            method:"PUT",
            headers:{
                "content-type":"application/json",
                "Authorization":`Bearer ${accessToken}`
              },
              body: JSON.stringify({
                userName: userName,
                firstName: firstName,
                lastName: lastName,
                sociallyBio: sociallyBio
              }),
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            window.location.reload();
        })
    }

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={onClose}
    >
      <div className="edit-container" onClick={(e) => e.stopPropagation()}>
        <div className="edit-header-container">
          <div className="lbl">Edit User Details </div>
          <button className="edit-btn" onClick={handleSubmit}>Submit</button>
        </div>
        <div className="edit-container-form">
          <input id="inp" type="text" placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}></input>
          <input id="inp" type="text" placeholder="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)}></input>
          <textarea
            id="inp"
            type="text"
            placeholder="Bio"
            style={{ background: "none", outline: "none" }} value={sociallyBio} onChange={(e)=>setSociallyBio(e.target.value)}
          ></textarea>
        </div>
      </div>
    </Backdrop>
  );
}

export default EditProfile;
