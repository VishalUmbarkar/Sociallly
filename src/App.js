import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './App.css';
import Feed from './Feed';
import Login from './LoginComponent';
import Drawer from './MiniDrawer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginComponent from './LoginComponent';

function App() {
  

  return (
    <div className="App">
      <Router>
      <Routes>
      <Route exact path="/feed" element={<><Feed /><Drawer /></>}/>
      <Route path="/login" element={<LoginComponent />} />
      </Routes>
      </Router>
      {/* <Navbar /> */}
      {/* <Feed /> */}
      {/* <Login /> */}
      {/* <Drawer /> */}
    </div>
  );
}

export default App;
