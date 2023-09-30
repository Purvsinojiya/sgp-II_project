import React, { useState, useEffect } from 'react';

function DisplayStock() {
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminAuthtoken');
    fetch('http://localhost:7000/admin/stocks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products data');
        }
        return response.json();
      })
      .then((data) => {
        setStocks(data);
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
      <h1 className="text-2xl font-bold mb-4">All Stocks</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock
            </th>
            {/* Add other table headers for product properties */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {stocks.map((stock, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{stock.productName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{stock.addquantity}</td>
              <td className="px-6 py-4 whitespace-nowrap">{stock.sellerName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{stock.currentStock}</td>
        
              {/* Add other table cells for product properties */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayStock;
