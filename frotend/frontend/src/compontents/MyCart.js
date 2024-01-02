import React, { useState, useEffect } from "react";

import Navbar from "./Navbar";

const dummyCartData = [
  {
    id: 1,
    image: "https://media.istockphoto.com/id/1412962566/photo/betel-nut-or-areca-nut-background.jpg?s=612x612&w=0&k=20&c=vHvmkL0haGIyV4lYtomZC3Z5nQXtKuOkBIYtO-T4EUo=",
    product: "Product 1",
    quantity: 2,
    pricePerKg: 12.99, // Price without currency symbol
  },
  {
    id: 2,
    image: "https://media.istockphoto.com/id/1412962566/photo/betel-nut-or-areca-nut-background.jpg?s=612x612&w=0&k=20&c=vHvmkL0haGIyV4lYtomZC3Z5nQXtKuOkBIYtO-T4EUo=",
    product: "Product 2",
    quantity: 1,
    pricePerKg: 15.49, // Price without currency symbol
  },
  {
    id: 3,
    image: "https://media.istockphoto.com/id/1412962566/photo/betel-nut-or-areca-nut-background.jpg?s=612x612&w=0&k=20&c=vHvmkL0haGIyV4lYtomZC3Z5nQXtKuOkBIYtO-T4EUo=",
    product: "Product 1",
    quantity: 2,
    pricePerKg: 12.99, // Price without currency symbol
  },
  // Add more product items as needed
];

function MyCart() {
  const [cartData, setCartData] = useState(dummyCartData);
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

    fetch(`https://shivams.onrender.com/apoo/addtocart/${number}`)
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
  // Function to calculate the total cost for a product
  const calculateProductCost = (product) => {
    return product.quantity * product.productPrice;
  };

  // Function to increase the quantity of a product
  const increaseQuantity = (productId) => {
    const updatedCart = orders.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    setOrders(updatedCart); // Use setOrders to update the state
  };

  // Function to decrease the quantity of a product
  const decreaseQuantity = (productId) => {
    const updatedCart = orders.map((product) => {
      if (product.id === productId && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    setOrders(updatedCart); // Use setOrders to update the state
  };

  // Function to remove all products from the cart
  const removeAllProducts = () => {
    setCartData([]);
  };

  return (
    <>
     <Navbar></Navbar>
    <main className="p-6 md:p-10 min-h-screen mx-6 md:mx-14 flex items-center justify-center">
   
      <div className="w-full bg-white flex flex-col">
        <div className="text-gray-700 rounded-t-lg text-3xl font-medium mt-4 font-sans md:flex md:justify-center">My Shopping Cart</div>
        <div className="md:flex md:justify-end">
          <button
            className="text-xl hover:bg-red-600 text-black py-2 px-4 rounded-lg mb-4 mt-4"
            onClick={removeAllProducts}
          >
            Remove All
          </button>
        </div>
        <hr className="mt-2 border-t-2 border-orange-300 mb-4" />
        {orders.map((product) => (
          <div
            key={product.id}
            className="p-4 border bg-gray-200 border-gray-300 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between mb-4"
          >
            <div className="flex items-center mb-4 md:mb-0 w-full">
              <img src={product.image} alt={product.product} className="w-24 h-24 rounded-lg border-2 md:m-0 m-2 border-gray-300" />
              <div className="mt-4 md:ml-4 w-full">
                <div className="text-xl text-gray-800 font-semibold">{product.product}</div>
                <div className="text-lg text-gray-700">Price: ₹{product.productPrice.toFixed(2)}</div>
              </div>
            </div>
            <div className="md:flex md:justify-end md:w-full">
              <div className="mt-4 md:mt-0">
                <button
                  className="text-gray-700 bg-white rounded-full py-2 px-3 ml-2 mr-2"
                  onClick={() => decreaseQuantity(product.id)}
                >
                  -
                </button>
                <div className="text-lg text-gray-700 font-light inline-block">{product.quantity}</div>
                <button
                  className="text-gray-700 bg-white rounded-full py-2 px-3 ml-2"
                  onClick={() => increaseQuantity(product.id)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="text-lg font-light w-full md:flex md:justify-end">
              Total: ₹{(calculateProductCost(product)).toFixed(2)}
            </div>
          </div>
        ))}
        <hr className="mt-2 border-t-2 border-orange-300" />
        <div className="text-xl mt-2 font-medium md:self-end">
          Total Cost: ₹{orders.reduce((total, product) => total + calculateProductCost(product), 0).toFixed(2)}
        </div>
        <div className="md:flex md:justify-end">
          <button className="bg-[#C4EF7F] hover:bg-[#9bcf47] text-white text-3xl font-light py-2 px-14 shadow-lg rounded-lg mt-4 mb-4">
            Buy Now
          </button>
        </div>
        {cartData.length === 0 && (
          <div className="text-center mt-4">
            Your cart is empty.
          </div>
        )}
      </div>
    </main>
    </>
  );
}

export default MyCart;
