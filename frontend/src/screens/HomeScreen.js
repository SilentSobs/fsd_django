import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard'; 
import axios from 'axios';

const HomeScreen = () => {
    const [products,setProducts] = useState([]);

    useEffect(() => {

        async function fetchProduct() {

            const {data} = await axios.get('http://127.0.0.1:8000/api/products');
            setProducts(data)
        }

        fetchProduct()
        
    },[])
    return (
        <div className="row">
            {products.map((product) => (
                <ProductCard key={product._id} product={product} /> // Use ProductCard
            ))}
        </div>
    );
};

export default HomeScreen;
