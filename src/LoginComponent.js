// LoginComponent.js
import React, { useState } from "react";
import "./LoginComponent.css";
// import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const LoginComponent = () => {
  const navigate = useNavigate();
  const handleInputUsername = (event) => {
    setInputValueUserName(event.target.value);
  };

  const handleInputPassword = (event) => {
    setInputValuePassword(event.target.value);
  };

  const [user, setUser] = useState("");
  const [inputValueUserName, setInputValueUserName] = useState("");
  const [inputValueUserPassword, setInputValuePassword] = useState("");

  const handleSubmit = () => {
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: inputValueUserName,
        password: inputValueUserPassword,
      }),
    })
      .then((response) => response.json())

      .then((data) => {
        
        sessionStorage.setItem("accessToken",data.token)
        sessionStorage.setItem("userName", data.userName)
        // setUser(data); //storing the response from post request
        console.log(data.token);

        //sessionStorage.setItem("accessToken", user.token);
        if(!data.token){
          // return redirect('/login');
          navigate('/login');
        }
        else{
          navigate('/feed');
        }
      });
      
  };

  return (
    <div className="login-container">
      <div className="post-card-login">
        {/* <h2>Socially</h2> */}
        <div className="feed-label-login">
          <img src="/new_logo.png" alt="feed" style={{ height: "50px" }}></img>
        </div>
        <div className="login-textbox">
          <input style={{paddingLeft:"10px"}}
            type="text"
            id="text-username"
            onChange={handleInputUsername}
            placeholder="Username"
            value={inputValueUserName}
          />

          <input style={{paddingLeft:"10px"}}
            type="password"
            id="text-username"
            onChange={handleInputPassword}
            placeholder="Password"
            value={inputValueUserPassword}
          />

          <button id="btn-login" onClick={handleSubmit}>
            Log In
          </button>
        </div>
      </div>

      <div >
        <p>
          Don't have an account?{" "}
          <a href="http://localhost:3000/signUp">
            <span id="signup-btn"  >Sign Up</span>
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
