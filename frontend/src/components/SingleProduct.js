import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { listProductDetails } from '../actions/productActions';

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const productDetails = useSelector(state => state.productDetailsReducer || {});
  const { loading, error, product = { reviews: [] } } = productDetails;

  useEffect(() => {
    console.log('Component mounted with ID:', id);
    
    // First test direct API call to verify endpoint
    axios.get(`http://127.0.0.1:8000/api/products/${id}`)
      .then(response => {
        console.log('Direct API call successful:', response.data);
      })
      .catch(err => {
        console.error('Direct API call failed:', err.message);
        
        // Try alternative endpoint formats if first one fails
        axios.get(`http://127.0.0.1:8000/api/products/${id}/`)
          .then(res => console.log('With trailing slash works:', res.data))
          .catch(() => {
            axios.get(`http://127.0.0.1:8000/api/product/${id}`)
              .then(res => console.log('Singular endpoint works:', res.data))
              .catch(() => console.log('Alternative endpoints also failed'));
          });
      });
    
    // Dispatch normal action
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  // Show API error if there is one
  if (error) {
    return (
      <div className="container mt-4 alert alert-danger">
        <h4>Error Loading Product</h4>
        <p>{error}</p>
        <p>Product ID: {id}</p>
        <p>Try these troubleshooting steps:</p>
        <ul>
          <li>Check that the product ID {id} exists in your database</li>
          <li>Verify your API endpoint format in the productActions.js file</li>
          <li>Check server logs for more details</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <img
          src={`http://127.0.0.1:8000/${product?.image}`}
          alt={product?.name}
          className="card-img-top"
        />
        <div className="card-body">
          <h2 className="card-title">{product?.name}</h2>
          <p className="card-text">{product?.description}</p>
          <p><strong>Brand:</strong> {product?.brand}</p>
          <p><strong>Price:</strong> ${product?.price}</p>
          <p className={product?.countInStock > 0 ? "text-success" : "text-danger"}>
            {product?.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
          </p>
          <p>⭐ {product?.rating} ({product?.numReviews} reviews)</p>
          <button
            className="btn btn-primary mt-3"
            disabled={product?.countInStock === 0}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;