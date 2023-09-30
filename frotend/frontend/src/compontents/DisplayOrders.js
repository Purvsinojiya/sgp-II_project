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
    <div>
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Amount
            </th>
            {/* Add other table headers for order properties */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{order.product}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.totalAmount}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.createdAt}</td>
              {/* Add other table cells for order properties */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayOrders;
