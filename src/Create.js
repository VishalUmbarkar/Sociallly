// import React, { useState } from 'react';

// const Create=()=>{
//   const [caption, setCaption] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [post, setPost] = useState({});

//   const accessToken = sessionStorage.getItem("accessToken");
//   const userName = sessionStorage.getItem("userName");

//   const handleSubmit = ()=>{

//     fetch("http://localhost:8080/feed",{
//       method: "POST",
//       headers: {
//         "Content-Type": "multipart/formdata",
//         "Authorization":`Bearer ${accessToken}`
//       },
//       body: JSON.stringify({
//         userName: userName,
//         captions: caption,
//         image: selectedFile.name
//       }),

//     })
//     .then((response) => response.json())
//     .then((data)=>{
//       setPost(data);
//       console.log(post);
//     })
//     .catch((error) => {
//             console.error("Error during fetch:", error);
//           });



//   }

//   return (
//     <div>
//       <div>
//         <input type='file' value={selectedFile} onChange={(e) => setSelectedFile(e.target.files[0])}/>
//         <input id ='create' type='text' placeholder='Write a caption...' value={caption} onChange={(e) => setCaption(e.target.value)} />
        
//         <button id='btn' onClick={handleSubmit} type='submit'>Post</button>
        
//       </div>
//     </div>
//   );

//   }
// export default Create;


import React, { useState } from 'react';

const Create = () => {
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
    <div>
      <div>
        <input type='file' accept='.png, .jpg, .jpeg' onChange={(e) => setSelectedFile(e.target.files[0])}/>
        <input id ='create' type='text' placeholder='Write a caption...' value={caption} onChange={(e) => setCaption(e.target.value)} />
        
        <button id='btn' onClick={handleSubmit} type='submit'>Post</button>
      </div>
    </div>
  );
};

export default Create;

