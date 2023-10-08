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
    <div className="container mx-auto mt-8">
    <h1 className="flex text-2xl font-semibold mb-4 justify-center">Current Stock</h1>
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr>
          <th className="px-4 py-2 bg-[#FCE8C9] opacity-75">Stock ID</th>
          <th className="px-4 py-2 bg-[#FCE8C9] opacity-75">Product Name</th>
          <th className="px-4 py-2 bg-[#FCE8C9] opacity-75">Seller Name</th>
          <th className="px-4 py-2 bg-[#FCE8C9] opacity-75">Quantity</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((item, index) => (
          <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
            <td className="px-4 py-2 text-center">{item.productName}</td>
            <td className="px-4 py-2 text-center">{item.addquantity}</td>
            <td className="px-4 py-2 text-center">{item.sellerName}</td>
            <td className="px-4 py-2 text-center">{item.currentStock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default DisplayStock;
