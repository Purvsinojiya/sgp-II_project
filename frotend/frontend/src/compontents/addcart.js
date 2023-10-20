import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import dow from './banner.jpg';

const Addcart = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
      function getCookie(cookieName) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.startsWith(cookieName + '=')) {
            return decodeURIComponent(cookie.substring(cookieName.length + 1));
          }
        }
        return null; // Cookie not found
      }
  
      const number = getCookie('number');
      console.log("the number: " + number); // Separate the text and number with a space
  
      // Fetch orders for the logged-in user
      fetch(`http://localhost:7000/apoo/addtocart/${number}`)
        .then((response) => response.json())
        .then((data) => {
          // Check if the 'data' property contains an array
          if (data.success && Array.isArray(data.data)) {
            setOrders(data.data);
          } else {
            console.error('Data is not an array:', data);
          }
        })
        .catch((error) => console.error('Error fetching orders:', error));
    }, []);
  
    return (
      <div className="bg-gray-100 min-h-screen p-4">
      <Navbar />
      <h1 className="text-3xl font-bold my-8">All Orders</h1>
  
      <img
        src={dow}
        alt="Order Image"
        className="w-48 h-48 mt-4 rounded-lg shadow-lg"
      />
  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-md p-4">
            <p className="text-xl font-semibold mb-2">Product Name: {order.product}</p>
            <p>Product Quantity: {order.quantity}</p>
            <p>Product Amount: ${order.totalAmount}</p>
            <p>Product Status: {order.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
  }

export default Addcart
