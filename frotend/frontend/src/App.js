import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from "./compontents/Signup";
import Home from "./compontents/Home";
import Login from "./compontents/Login";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Signup" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;