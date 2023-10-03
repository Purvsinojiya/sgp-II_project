import React, { useState } from 'react';
import axios from 'axios';

function AddProduct() {
  const [product, setProduct] = useState({
    imageUrl: '',
    productName: '',
    productPrice: '',
    productDescription: '',
    sellerPlace: '',
    quantity: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Retrieve the token from localStorage
    const token = localStorage.getItem('adminAuthtoken'); 
    // Create headers with the authorization token
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`, // Add the token as a Bearer token
    };
  
    try {
      const response = await axios.post('http://localhost:7000/admin/addProduct', product, { headers });
      console.log('Product added:', response.data);
      // Do something with the response if needed
    } catch (error) {
      console.error('Error adding product:', error.response.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 bg-orange-200">
    <div className="w-[20rem] h-auto mx-auto p-5 m-2 bg-white rounded shadow-xl">
      <h1 className="text-[1.4rem] font-bold mb-3 text-neutral-600">
        Add Product
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label
            htmlFor="imageUrl"
            className="block text-gray-700 font-bold mb-2 text-sm"
          >
            Image URL:
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            required
            className="w-[100%] shadow p-[0.3rem] border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="productName"
            className="block text-gray-700 font-bold mb-2 text-sm"
          >
            Product Name:
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            required
            className="w-[100%] shadow p-[0.3rem] border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="productPrice"
            className="block text-gray-700 font-bold mb-2 text-sm"
          >
            Product Price:
          </label>
          <input
            type="number"
            id="productPrice"
            name="productPrice"
            value={product.productPrice}
            onChange={handleChange}
            required
            className="w-[100%] shadow p-[0.3rem] border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="quantity"
            className="block text-gray-700 font-bold mb-2 text-sm "
          >
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
            className="w-[100%] shadow p-[0.3rem] border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="sellerPlace"
            className="block text-gray-700 font-bold mb-2 text-sm"
          >
            Seller Place:
          </label>
          <input
            type="text"
            id="sellerPlace"
            name="sellerPlace"
            value={product.sellerPlace}
            onChange={handleChange}
            required
            className="w-[100%] p-[0.3rem] shadow rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="productDescription"
            className="block text-gray-700 font-bold mb-2 text-sm"
          >
            Product Description:
          </label>
          <textarea
            id="productDescription"
            name="productDescription"
            value={product.productDescription}
            onChange={handleChange}
            required
            className="w-[100%] p-[0.3rem] border rounded shadow focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-orange-300 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Add Product
        </button>
      </form>
    </div>
  </div>
  );
}

export default AddProduct;
