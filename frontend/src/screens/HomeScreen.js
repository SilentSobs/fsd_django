import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard'; 
import axios from 'axios';
import Cookies from 'js-cookie';  

const HomeScreen = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const token = Cookies.get('access_token'); 
                console.log("Access Token:", token);

                const { data } = await axios.get('http://127.0.0.1:8000/api/products', {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                });

                console.log(data);
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }

        fetchProduct();
    }, []);

    return (
        <div className="row">
            {products.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    );
};

export default HomeScreen;
