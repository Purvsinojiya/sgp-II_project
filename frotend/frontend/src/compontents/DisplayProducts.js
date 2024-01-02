import React, { useState, useEffect } from 'react';

function DisplayProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminAuthtoken'); 
    fetch('https://shivams.onrender.com/admin/getallProduct', {
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
        setProducts(data);
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
    <h1 className="flex text-2xl font-semibold mb-4 justify-center">All Products</h1>
    <table className="min-w-full border border-gray-400">
      <thead>
        <tr>
         
          <th className="px-4 py-2 bg-[#FCE8C9] opacity-75">Product Name</th>
          <th className="px-4 py-2 bg-[#FCE8C9] opacity-75">Price</th>
         
        </tr>
      </thead>
      <tbody>
        {products.map((product,index) => (
          <tr key={product.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
            <td className="px-4 py-2 text-center">{product.productName}</td>
            <td className="px-4 py-2 text-center">{product.productPrice}</td>
          
           
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}

export default DisplayProducts;
