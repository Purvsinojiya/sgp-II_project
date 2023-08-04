import React from 'react';
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

const stripePromise = loadStripe('pk_test_51Mr40CSGOCO7N9QbWHuiSH230rivS6toAxku1IphldfrfPjSaO3eWfsvPmw3fLfUj0RYB83bqepZTCSwZW2YwLrJ003EcQgrU3');

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<ProductDetail />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/verifyOTP/:number" element={<Verifyotp />} />
            <Route path="/sendOTP/:number" element={<ResendOTP />} />
            <Route path="/addProduct" element={<Addproduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment/>} />
          </Routes>
        </div>
      </Router>
     
    </>
  );
}

export default App;
