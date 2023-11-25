// LoginComponent.js
import React, { useState } from 'react';
import './LoginComponent.css';

const LoginComponent = () => {
  
  return (
    <div className='login-container'>
      
      <div className='post-card-login'>
          {/* <h2>Socially</h2> */}
          <div className='feed-label-login'>
          <img src='/new logo.png' alt='feed' style={{height:"50px"}}></img>
        </div>
        <div className='login-textbox'>
        
          <input type="text" id='text-username' placeholder='Username' />
            <br />
          <input type="password" id='text-username' placeholder='Password' />
          <br />
          <button id='btn-login'>Login</button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;



