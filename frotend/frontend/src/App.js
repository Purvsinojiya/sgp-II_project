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
import Displayuser from './compontents/DisplayUser'
import DisplayOrders from './compontents/DisplayOrders';
import DisplayProducts from './compontents/DisplayProducts';
import DisplayStock from './compontents/DisplayStock';
import AddStock from './compontents/AddStock';
import Ome from './compontents/ome'
import DashboardH from './compontents/DashboardHarsh';
// import Loginpage from "./compontents/loginPage"
// import Addtocart from './compontents/AddToCart.js';
import PAymentk from './compontents/Payment_Kaivan'
<link rel="shortcut icon" href="https://b.zmtcdn.com/images/logo/zomato_logo_2017.png" type="image/x-icon"></link>

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
            <Route path="/Signup" element={<DashboardH/>} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/verifyOTP/:number" element={<Verifyotp />} />
            <Route path="/sendOTP/:number" element={<ResendOTP />} />
            <Route path="/addProduct" element={<Addproduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment/>} />
            <Route path="/admin-dashboard" element={<Dashboard/>} />
            <Route path="/alluser" element={<Displayuser/>} />
            <Route path="/allorder" element={<DisplayOrders/>} />
            <Route path="/allProducts" element={<DisplayProducts/>} />
            <Route path="/allStocks" element={<DisplayStock />} />
            <Route path="/addStock" element={<AddStock />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
