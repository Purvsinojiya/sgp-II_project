import React from 'react';
import { useCart } from './CartContext';

function Cart() {
  const { cartState } = useCart();

  if (cartState.cartItems.length === 0) {
    return <div className="text-center mt-8">Your cart is empty.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      <ul>
        {cartState.cartItems.map((item) => (
          // Add a unique key prop to each list item
          <li key={item.id} className="flex items-center space-x-4 mb-4">
            <img src={item.imageUrl} alt={item.productName} className="w-16 h-16 object-contain rounded" />
            <div className="flex-grow">
              <p className="font-bold">{item.productName}</p>
              <p>Price: ${item.productPrice}</p>
              <div className="flex items-center mt-2">
                <button className="px-2 py-1 bg-blue-500 text-white rounded" disabled>
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button className="px-2 py-1 bg-blue-500 text-white rounded" disabled>
                  +
                </button>
              </div>
              <p className="mt-2">Total Price: ${item.productPrice * item.quantity}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
