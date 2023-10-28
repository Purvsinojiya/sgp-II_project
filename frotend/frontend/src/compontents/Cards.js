import React, { useState, useEffect } from "react";

import logo from "./download.jpeg";

function Cards() {
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
        fetch(`http://localhost:7000/apoo/gorder/${number}`)
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
    <div className="flex flex-col w-full p-5 justify-center mx-auto container text-left">
     {orders.map((order) => (
        <div key={order.id} className="my-4 border">
          <div className="bg-gray-100 p-4">Order ID: {order._id}</div>
          <div className="flex flex-col space-y-7 md:flex-row justify-between p-10">
            <img src={logo} className="w-20 h-20" />
            <h2 className="font-semibold">{order.product}</h2>
            <div className="">Order Date: {order.quantity}</div>
          </div>
          <div className="border p-4 flex flex-col-reverse md:flex-row-reverse justify-between">
            <span>Order Total: {order.totalAmount}</span>
            <span>Delivered by : {order.totalAmount}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;