import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    console.log(product.image)
    return (
        <div className="col-12 col-sm-6 col-md-4 mb-4">
            <Link to={`/product/${product._id}`} className="text-decoration-none">
                <div className="card text-center shadow-sm p-3">

                    <img
                        src={`http://127.0.0.1:8000/${product.image}`}
                        alt={product.name}
                        className="card-img-top"
                    />
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text text-muted">{product.description}</p>
                        <p className="fw-bold">Price: ${product.price}</p>
                        <p className={product.countInStock > 0 ? "text-success" : "text-danger"}>
                            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                        </p>
                        <p>⭐ {product.rating} ({product.numReviews} reviews)</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
