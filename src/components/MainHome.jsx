import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Header from './Header';

const MainHome = ({ userId, setUserId }) => { // Accept setUserId as a prop
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                
                // const response = await fetch('http://localhost:5000/products');
                const response = await fetch('https://flask-backend-ta-e62ef4a96bf0.herokuapp.com/products');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data); // Store product data
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <Header userId={userId} setUserId={setUserId} /> {/* Pass userId and setUserId */}
            <div>
                <h1>{userId ? `Hello, User ${userId}` : "Welcome to the Home Page"}</h1>
                <h2>Popular Products</h2>
            </div>
            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard
                        key={product.product_id} // Unique ID from MongoDB
                        product_id={product.product_id}
                        image={product.image_url}
                        name={product.product_name}
                        price={product.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default MainHome;
