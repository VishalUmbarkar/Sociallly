import React from "react";
import "./LoginComponent.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [inputValueUserName, setInputValueUserName] = useState("");
  const [inputValueUserPassword, setInputValuePassword] = useState("");

  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);

  const handleSubmit = () => {
    fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: FirstName,
        lastName: LastName,
        userName: inputValueUserName,
        password: inputValueUserPassword,
      }),
    })
      .then((response) => response.json())

      .then((data) => {
        // sessionStorage.setItem("accessToken",data.token)
        setUser(data); //storing the response from post request
        // console.log(data.token);
        console.log(user);
        sessionStorage.setItem("userName", data.userName);
        sessionStorage.setItem("accessToken", data.token);
        if (!data.token) {
          //return redirect('/login');
          navigate("/signup");
        } else {
          navigate("/feed");
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
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
          <input
            type="text"
            id="text-username"
            placeholder="First Name"
            value={FirstName}
            onChange={(event) => setFirstName(event.target.value)}
          />

          <input
            type="text"
            id="text-username"
            placeholder="Last Name"
            value={LastName}
            onChange={(event) => setLastName(event.target.value)}
          />

          <input
            type="text"
            id="text-username"
            placeholder="Username"
            value={inputValueUserName}
            onChange={(event) => setInputValueUserName(event.target.value)}
          />

          <input
            type="password"
            id="text-username"
            placeholder="Password"
            value={inputValueUserPassword}
            onChange={(event) => setInputValuePassword(event.target.value)}
          />

          <button onClick={handleSubmit} id="btn-signup">
            Sign Up
          </button>
        </div>
      </div>

      <div className="post-card-login-footer">
        <p>
          Have an account?{" "}
          <a href="http://localhost:3000/login">
            <span>Log In</span>
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
