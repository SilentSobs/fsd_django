import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form } from 'react-bootstrap';
import { listProductDetails } from '../actions/productActions';

const SingleProduct = () => {
  // Get the product ID from the URL
  const { id } = useParams();
  
  // Set up Redux hooks
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetailsReducer || {});
  const { loading, error, product = {} } = productDetails;
  
  // State for quantity selection
  const [qty, setQty] = useState(1);
  
  // When component loads, fetch product data
  useEffect(() => {
    console.log('Loading product with ID:', id);
    dispatch(listProductDetails(id));
  }, [dispatch, id]);
  
  // Log product data when it changes
  useEffect(() => {
    console.log('Current product data:', product);
    console.log('In stock?', product.countInStock > 0);
  }, [product]);
  
  // Simple loading message
  if (loading) {
    return <div className="container mt-4">Loading product data...</div>;
  }
  
  // Basic error display
  if (error) {
    return (
      <div className="container mt-4 alert alert-danger">
        <h4>Error Loading Product</h4>
        <p>{error}</p>
        <p>Product ID: {id}</p>
      </div>
    );
  }
  
  return (
    <div className="container mt-4">
      <div className="card">
        <img
          src={`http://127.0.0.1:8000/${product.image}`}
          alt={product.name}
          className="card-img-top"
        />
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <p className="card-text">{product.description}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          
          {/* STOCK STATUS */}
          <div style={{fontSize: "18px", padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "5px", margin: "15px 0"}}>
            <strong>Stock Status: </strong>
            {product.countInStock > 0 ? (
              <span style={{color: "green", fontWeight: "bold"}}>
                IN STOCK ({product.countInStock} available)
              </span>
            ) : (
              <span style={{color: "red", fontWeight: "bold"}}>
                OUT OF STOCK
              </span>
            )}
          </div>
          

          <p style={{fontSize: "16px"}}>⭐ {product.rating} ({product.numReviews} reviews)</p>
          
          <Row>
            <Col xs='auto' className='my-1'>
              <Form.Control
                as="select"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              >
                {
                  [...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))
                }
              </Form.Control>
            </Col>
          </Row>

          <button 
            className="btn btn-success" 
            style={{
              padding: "12px 30px", 
              fontSize: "18px", 
              fontWeight: "bold",
              marginTop: "10px"
            }}
            disabled={product.countInStock === 0}
          >
            {product.countInStock > 0 ? 'Add To Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;