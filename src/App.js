import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './App.css';
import Feed from './Feed';
import Login from './LoginComponent';

function App() {
  

  return (
    <div className="App">
      {/* <Navbar /> */}
      <Feed />
      {/* <Login /> */}
    </div>
  );
}

export default App;
