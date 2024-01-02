import React, { useState, useEffect } from "react";

import Cards from "./Cards";
import Navbar from "./Navbar";

export default function Products() {
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
        fetch(`https://shivams.onrender.com/apoo/gorder/${number}`)
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

    <div className="flex flex-col border bg-white shadow p-3 justify-center mx-auto text-left">
    <Navbar/>
      <Cards />
    </div>
  );
}