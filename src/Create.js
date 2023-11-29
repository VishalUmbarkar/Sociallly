import React, { useState } from 'react';
import { Backdrop } from '@mui/material';
import './Create.css'

const Create = ({open , onClose}) => {
  const [openCreate, setOpenCreate] = React.useState(true);
  const handleClose = () => {
    setOpenCreate(false);
  };
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [post, setPost] = useState({});

  const accessToken = sessionStorage.getItem("accessToken");
  const userName = sessionStorage.getItem("userName");

  const handleSubmit = () => {
    const formData = new FormData();

    const postObject = {
      userName: userName,
      captions: caption
    };

    const json = JSON.stringify(postObject);
const blob = new Blob([json], {
  type: 'application/json'
});

    formData.append("post", blob);
    formData.append("image", selectedFile);

    fetch("http://localhost:8080/feed", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "type":"multipart/form-data"
        
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        console.log(post);
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
      });
  };

  return (
      <Backdrop 
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={onClose}
      >

      <div className='main-container'>
      <div className='header-container'>
    <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight:'400'}}>
        <p>Create New Post</p>
    </div>
    <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
        <button id='post-btn' onClick={handleSubmit} type='submit'>Post</button>
    </div>
</div>

      <div className='post-create-inner-container-backdrop' onClick={(e) => e.stopPropagation()}> 
        <div className='first-half'>
            <input id="fileInput" type='file' accept='.png, .jpg, .jpeg' onChange={(e) => setSelectedFile(e.target.files[0])} style={{display:"none"}} />
            
            <label htmlFor="fileInput" className="custom-file-label">
        <img src="upload-image.png" alt="Upload" style={{cursor:"pointer"}} />
        <br />
        Choose photos
      </label>
            
        </div>
        <div className='second-half'>
            <div className='second-half-header'>
              <p style={{color:"black", fontWeight:"500"}}>{userName}</p>
              
            </div>
            
            <textarea id ='create' type='text' placeholder='Write a caption...' value={caption} onChange={(e) => setCaption(e.target.value)}
            onFocus={(e) => (e.target.style.border = 'none')}
            />
            
        </div>
      </div>
      </div> 
    </Backdrop>
      
      
    
  );
};

export default Create;

