import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductRecommendations = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const targetProductId = 10; // Replace with the desired product ID
    const skinType = ''; // Fill in if applicable
    const skinTone = ''; // Fill in if applicable
    const underTone = ''; 
    const topN = 5; // Number of products to display

    useEffect(() => {
        const fetchData = async () => {
            try {
               
                // const response = await axios.get('http://127.0.0.1:5000/recommend/word2vec', {
                const response = await axios.get('https://flask-backend-ta-e62ef4a96bf0.herokuapp.com/recommend/word2vec', {
                    params: {
                        target_product_id: targetProductId, // Match with the Flask API
                        skin_type: skinType,
                        skin_tone: skinTone,
                        under_tone: underTone,
                        top_n: topN,
                    },
                });
                
                console.log(response.data); // Log the entire response for debugging
                setProducts(response.data.recommendations); // Match the response structure
                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err); // Log the error for debugging
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run once on mount

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Product Recommendations</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.product_id}>
                        Product: {product.product_name} | Product ID: {product.product_id} | Score: {product.score.toFixed(4)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductRecommendations;
