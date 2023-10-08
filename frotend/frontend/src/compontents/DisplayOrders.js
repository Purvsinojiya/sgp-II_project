import React, { useState, useEffect } from 'react';
var localStorage = require('localStorage')

function DisplayOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem('adminAuthtoken'); 
    console.log(token)
    fetch('http://localhost:7000/admin/order', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch orders data');
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="flex text-2xl font-semibold mb-4 justify-center">All Orders</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-[#FCE8C9] opacity-75">Order ID</th>
            <th className="px-4 py-2 bg-[#FCE8C9] opacity-75">Customer Name</th>
            <th className="px-4 py-2 bg-[#FCE8C9] opacity-75">Total Amount</th>
            <th className="px-4 py-2 bg-[#FCE8C9] opacity-75">Order Status</th>
            <th className="px-4 py-2 bg-[#FCE8C9] opacity-75">Date and Time</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
              <td className="px-4 py-2 text-center">{order.product}</td>
              <td className="px-4 py-2 text-center">{order.quantity}</td>
              <td className="px-4 py-2 text-center">₹{order.totalAmount.toFixed(2)}</td>
              <td className={`px-4 py-2 text-center ${getStatusColor(order.status)}`}>
                {order.status}
              </td>
              <td className="px-4 py-2 text-center">{order.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getStatusColor(orderStatus) {
  switch (orderStatus) {
    case 'Pending':
      return 'bg-green-200'; // Green background for Pending
    case 'cancal':
      return 'bg-red-200'; // Red background for Cancel
    case 'return':
      return 'bg-yellow-200'; // Yellow background for Return
    default:
      return '';
  }
}

export default DisplayOrders;
