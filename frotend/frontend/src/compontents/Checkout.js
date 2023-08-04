// Checkout.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

function Checkout() {
  const { cartState } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleCheckout = () => {
    // Add logic here to process the checkout and place the order
    // For example, you can send the order data to the server and clear the cart.
    console.log('Order placed:', cartState.cartItems, 'Shipping Address:', address);
    // Clear the cart after successful checkout
    // dispatch({ type: 'CLEAR_CART' });
    navigate('/payment'); // Navigate to the order confirmation page
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 border shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Address Details</h2>
      <textarea
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter your shipping address"
        value={address}
        onChange={handleAddressChange}
      />
      <div className="button-container">
        <button
          onClick={handleCheckout}
          disabled={!address.trim() || cartState.cartItems.length === 0}
          className={`px-4 py-2 rounded-md ${
            !address.trim() || cartState.cartItems.length === 0
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
          } text-white`}
        >
          Checkout
        </button>
        <Link to="/cart">
          <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 cursor-pointer text-white ml-2">
            Back to Cart
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Checkout;
