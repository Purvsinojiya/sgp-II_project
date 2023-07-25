import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from "./compontents/Signup";
import Home from "./compontents/Home";
import Login from "./compontents/Login";
import Verifyotp  from "./compontents/verifyOtp";
import ResendOTP from "./compontents/resendOTP";
import ProductDetail from './compontents/ProductDetail';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<ProductDetail />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/verifyOTP" element={<Verifyotp/>} />
          <Route path="/sendOTP" element={<ResendOTP/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;