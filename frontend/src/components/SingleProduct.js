import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/product/${id}`);
      setProduct(data);
    }
    
    fetchProduct(); // Call the function
  }, [id]); 

  return (
    <div className="container mt-4">
      <div className="card">
        <img src={product.image} alt={product.name} className="card-img-top" />
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <p className="card-text">{product.description}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p className={product.countInStock > 0 ? "text-success" : "text-danger"}>
            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
          </p>
          <p>⭐ {product.rating} ({product.numReviews} reviews)</p>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;