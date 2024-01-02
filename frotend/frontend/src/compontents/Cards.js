import React, { useState, useEffect } from "react";

import logo from "./download.jpeg";

function Cards() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    function getCookie(cookieName) {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName + "=")) {
          return decodeURIComponent(cookie.substring(cookieName.length + 1));
        }
      }
      return null; // Cookie not found
    }

    const number = getCookie("number");

    fetch(`https://shivams.onrender.com/apoo/gorder/${number}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setOrders(data.data);
        } else {
          setError("Data is not an array");
        }
      })
      .catch((error) => {
        setError("Error fetching orders");
        console.error("Error fetching orders:", error);
      });
  }, []);

  const handleReturn = (productId) => {
    fetch(`https://shivams.onrender.com/admin/order/return/${productId}`, {
      method: "PUT",
    })
      .then((response) => {
        if (response.status === 200) {
          const updatedProducts = orders.map((product) => {
            if (product._id === productId) {
              product.status = "Return";
            }
            return product;
          });
          setOrders(updatedProducts);
        } else {
          setError("Error returning the order");
        }
      })
      .catch((error) => {
        setError("Error returning the order");
        console.error("Error returning the order:", error);
      });
  };

  const handleCancel = (productId) => {
    fetch(`https://shivams.onrender.com/admin/order/cancel/${productId}`, {
      method: "PUT",
    })
      .then((response) => {
        if (response.status === 200) {
          const updatedProducts = orders.map((product) => {
            if (product._id === productId) {
              product.status = "Cancel";
            }
            return product;
          });
          setOrders(updatedProducts);
        } else {
          setError("Error canceling the order");
        }
      })
      .catch((error) => {
        setError("Error canceling the order");
        console.error("Error canceling the order:", error);
      });
  };

  return (
    <div className="flex flex-col w-full p-5 justify-center mx-auto container text-left">
      {error && <p className="text-red-500">{error}</p>}
      {orders.map((order) => (
        <div key={order._id} className="my-4 border">
          <div className="bg-gray-100 p-4">Order ID: {order._id}</div>
          <div className="flex flex-col space-y-7 md:flex-row justify-between p-10">
            <img src={order.image} alt={order.product} className="w-20 h-20" />
            <h2 className="font-semibold">{order.product}</h2>
            <div className="">Quantity: {order.quantity} KG</div>
          </div>
          <div className="border p-4 flex flex-col-reverse md:flex-row-reverse justify-between">
            <span>Order Total: {order.totalAmount}</span>
            <span>Delivered by: {order.status}</span>
            {order.status === "Pending" ? (
              <>
                <button
                  onClick={() => handleReturn(order._id)}
                  className="bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-brown-dark"
                >
                  Return
                </button>
                <button
                  onClick={() => handleCancel(order._id)}
                  className="bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-brown-dark"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                {order.status === "Cancel" ? (
                  <button
                    onClick={() => handleReturn(order._id)}
                    className="bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-brown-dark"
                  >
                    Return
                  </button>
                ) : (
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-brown-dark"
                  >
                    Cancel
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;
