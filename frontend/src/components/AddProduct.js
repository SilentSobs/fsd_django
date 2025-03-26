import React, { useState } from 'react';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    brand: '',
    category: '',
    description: '',
    rating: '',
    numReviews: '',
    price: '',
    countInStock: '',
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the request body (we'll use JSON format)
    const requestBody = {
      ...productData,
    };

    try {
      // Make the API call to the backend
      const response = await fetch('http://127.0.0.1:8000/api/products/add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Sending JSON data
        },
        body: JSON.stringify(requestBody), // Convert the data to JSON
      });

      // Check if the request was successful
      if (response.ok) {
        console.log('Product added successfully');
        setSuccess(true); // Set success state to true
        setProductData({
          name: '',
          brand: '',
          category: '',
          description: '',
          rating: '',
          numReviews: '',
          price: '',
          countInStock: '',
        });
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Failed to add product');
        setSuccess(false);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Error adding product');
      setSuccess(false);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      
      {/* Show success or error messages */}
      {success && <p style={{ color: 'green' }}>Product added successfully!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Product Brand */}
        <div>
          <label>Brand</label>
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            placeholder="Enter brand"
            required
          />
        </div>

        {/* Product Category */}
        <div>
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            placeholder="Enter category"
            required
          />
        </div>

        {/* Product Description */}
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            required
          />
        </div>

        {/* Product Rating */}
        <div>
          <label>Rating</label>
          <input
            type="number"
            name="rating"
            value={productData.rating}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
            placeholder="Enter rating"
            required
          />
        </div>

        {/* Number of Reviews */}
        <div>
          <label>Number of Reviews</label>
          <input
            type="number"
            name="numReviews"
            value={productData.numReviews}
            onChange={handleChange}
            placeholder="Enter number of reviews"
            required
          />
        </div>

        {/* Product Price */}
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            step="0.01"
            placeholder="Enter price"
            required
          />
        </div>

        {/* Count in Stock */}
        <div>
          <label>Count in Stock</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            placeholder="Enter stock count"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
