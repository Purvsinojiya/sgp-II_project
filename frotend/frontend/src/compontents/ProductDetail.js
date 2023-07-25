// ProductDetail.js (frontend)

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch the product data based on the ID from the backend server
    fetch(`http://localhost:7000/apoo/home/${id}`) // Replace this with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching product:', error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{product.productName}</h2>
      <img src={product.imageUrl} alt={product.productName} />
      <p>Price: ${product.productPrice}</p>
      <p>Description: {product.productDescription}</p>
    </div>
  );
}

export default ProductDetail;
