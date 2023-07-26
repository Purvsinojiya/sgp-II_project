// frontend/src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function Addproduct() {
  const [product, setProduct] = useState({
    imageUrl: '',
    productName: '',
    productPrice: '',
    productDescription: '',
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
    try {
      const response = await axios.post('http://localhost:7000/admin/addProduct', product);
      console.log('Product added:', response.data);
      // Do something with the response if needed
    } catch (error) {
      console.error('Error adding product:', error.response.data);
    }
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleChange}
          required
        /><br/>

        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={product.productName}
          onChange={handleChange}
          required
        /><br/>

        <label htmlFor="productPrice">Product Price:</label>
        <input
          type="number"
          id="productPrice"
          name="productPrice"
          value={product.productPrice}
          onChange={handleChange}
          required
        /><br/>

        <label htmlFor="productDescription">Product Description:</label>
        <textarea
          id="productDescription"
          name="productDescription"
          value={product.productDescription}
          onChange={handleChange}
          required
        ></textarea><br/>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default Addproduct;
