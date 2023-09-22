import React,{useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from "./compontents/Signup";
import Home from "./compontents/Home";
import Login from "./compontents/Login";
import Verifyotp from "./compontents/verifyOtp";
import ResendOTP from "./compontents/resendOTP";
import ProductDetail from './compontents/ProductDetail';
import Addproduct from './compontents/addproduct';
import Cart from './compontents/cart';
import Checkout from './compontents/Checkout';
import Payment from './compontents/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import Dashboard from './compontents/Dashboard';
import Products from "./compontents/products"


function App() {
  useEffect(() => {
    const token = localStorage.getItem('AuthToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set the token as default header
    }
  }, []);

  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Products />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/verifyOTP/:number" element={<Verifyotp />} />
            <Route path="/sendOTP/:number" element={<ResendOTP />} />
            <Route path="/addProduct" element={<Addproduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment/>} />
            <Route path="/admin-dashboard" element={<Dashboard/>} />
          </Routes>
        </div>
      </Router>
     
    </>
  );
}

export default App;
