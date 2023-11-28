import React from 'react'

function Profile() {
  return (
    <div>Page Under Construction
        <br />
        <a href='http://localhost:3000/login'>
            <button onClick={sessionStorage.removeItem("accessToken")}>Log Out</button>
        </a>
    </div>
  )
}

export default Profile