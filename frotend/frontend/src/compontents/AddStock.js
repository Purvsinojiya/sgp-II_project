import React, { useState } from 'react';
import axios from 'axios';

function AddStock() {
  const [stock, setStock] = useState({
    sellerName: '',
    productName: '',
    addquantity: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStock({
      ...stock,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Calculate the new stock quantity by adding the entered quantity to the current stock
      const newStockQuantity = parseInt(stock.addquantity);
  
      // Prepare the data to send to the server
      const dataToSend = {
        sellerName: stock.sellerName,
        productName: stock.productName,
        addquantity: newStockQuantity, // Make sure to include addquantity in the data
      };
      const token = localStorage.getItem('adminAuthtoken'); 
  
      // Create headers with the authorization token
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `${token}`, // Add the token as a Bearer token
      };
  
      const response = await axios.post('http://localhost:7000/admin/addstock', dataToSend,{ headers });
      console.log('Stock added:', response.data);
  
      // Do something with the response if needed
    } catch (error) {
      console.error('Error adding stock:', error.response.data);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 bg-orange-200">
      <div className=" h-auto w-auto max-w-md mx-auto p-5 m-7 mt-4 pt-6 p-10 bg-white rounded shadow-xl">
        <h1 className="text-[1.4rem] font-bold mb-3 text-neutral-600">Add Stock</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="sellerName" className=" pt-2 block text-gray-700 font-bold mb-2">Seller Name:</label>
            <input
              type="text"
              id="sellerName"
              name="sellerName"
              value={stock.sellerName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="productName" className="block text-gray-700 font-bold mb-2">Product Name:</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={stock.productName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="addquantity" className="block text-gray-700 font-bold mb-2">Quantity:</label>
            <input
              type="number"
              id="addquantity"
              name="addquantity"
              value={stock.addquantity}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-orange-300 hover:bg-orange-500 text-white font-bold mt-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Add Stock
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddStock;
