import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header'; 
import ProductCard from './ProductCard';

const Review = ({ userId, setUserId }) => {
    const [reviews, setReviews] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/products'); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log("Fetched Products:", data); // Log data produk
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        const fetchReviews = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`http://127.0.0.1:5000/reviews/${userId}`);
                    console.log("Fetched Reviews:", response.data.reviews); // Log data review
                    setReviews(response.data.reviews);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchProducts().then(fetchReviews); // Memastikan produk di-fetch lebih awal
    }, [userId]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // Fungsi untuk menemukan produk berdasarkan ID
    const getProductById = (productId) => {
        const product = products.find((product) => String(product.product_id) === String(productId));
        console.log(`Matching Product for ID ${productId}:`, product); // Log produk yang cocok
        return product;
    };


    return (
        <div>
            
            <Header userId={userId} setUserId={setUserId}/> {/* Pass userId and setUserId */}
            <div className="main-page">
            {/* <h2>Hello, User {userId}</h2> */}
            <div className="container-3">
             <h3>Your Products Review (User {userId})</h3>
            </div>
            <div className="product-grid">
                {reviews.length > 0 ? (
                    reviews.map((review) => {
                        const product = getProductById(review.product_id);
                        return (
                            product ? (
                                <ProductCard
                                    key={product.product_id}
                                    product_id={product.product_id}
                                    image={product.image_url}
                                    name={product.product_name}
                                    brand={product.brand_name}
                                    shade={product.shade_name}
                                    price={product.price}
                                    stars={review.stars} // Pass the stars as a prop
                                />
                            ) : (
                                <p key={review.product_id}>Product not found</p>
                            )
                        );
                    })
                ) : (
                    <p>No reviews found.</p>
                )}
            </div>
        </div>
        </div>
    );


};

export default Review;
