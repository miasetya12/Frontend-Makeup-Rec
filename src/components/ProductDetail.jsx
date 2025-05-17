import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header'; 
import RecBottom from './RecBottom';

const ProductDetail = () => {
    const { product_id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [rating, setRating] = useState(0);
    const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
    const [message, setMessage] = useState('');
    const [hasRated, setHasRated] = useState(false);
    const [userRating, setUserRating] = useState(null);
    const [productStats, setProductStats] = useState(null);


    const serverIP = 'http://127.0.0.1:5000';

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${serverIP}/products/${product_id}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        const fetchUserRating = async () => {
            if (!userId) return;

            try {
                const response = await axios.get(`${serverIP}/reviews/${userId}`);
                if (Array.isArray(response.data.reviews)) {
                    const found = response.data.reviews.find(r => r.product_id === parseInt(product_id));
                    if (found) {
                        setUserRating(found.stars);
                        setHasRated(true);
                    } else {
                        setHasRated(false);
                        setUserRating(null);
                    }
                } else {
                    console.error('Invalid response format for reviews:', response.data.reviews);
                    setMessage('Error: Invalid response format for reviews');
                }
            } catch (error) {
                console.error('Error fetching user reviews:', error);
                setMessage('Error fetching reviews');
            }
        };

        fetchProduct();
        fetchUserRating();
    }, [product_id, userId]);

        useEffect(() => {
            const fetchProductStats = async () => {
                try {
                    const response = await axios.get(`${serverIP}/product_stats/${product_id}`);
                    setProductStats(response.data);
                } catch (error) {
                    console.error('Error fetching product stats:', error);
                }
            };

            fetchProductStats();
        }, [product_id]); // hanya dijalankan sekali saat product_id berubah


    const handleRatingChange = (e) => setRating(e.target.value);

    const handleSubmitRating = async (e) => {
        e.preventDefault();
        if (!rating || !userId) {
            setMessage('Rating and User ID are required');
            return;
        }

        try {
            const response = await fetch(`${serverIP}/submit_rating`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: parseInt(userId),
                    product_id: parseInt(product_id),
                    stars: parseInt(rating),
                }),
            });

            if (!response.ok) throw new Error('Failed to submit rating');
            const result = await response.json();
            setMessage(result.message || 'Give Rating Success');

            const ratedProducts = JSON.parse(localStorage.getItem('ratedProducts')) || [];
            ratedProducts.push(product_id);
            localStorage.setItem('ratedProducts', JSON.stringify(ratedProducts));

            setHasRated(true);
            setUserRating(parseInt(rating)); // update langsung supaya tidak perlu refresh
        } catch (error) {
            console.error('Error submitting rating:', error);
            setMessage('Error submitting rating');
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <Header userId={userId} setUserId={setUserId} />
            <div className="main-page-detail">
                <button onClick={() => navigate(-1)}>Kembali</button>
            
                <div className="kiri_umum">
                    <div className="kiri">
                        <img src={product.image_url} alt={product.product_name} />
                    </div>

                    <div className="rate-section">
                        {hasRated ? (
                            userRating !== null ? (
                                <p>Rating Anda: {userRating}</p>
                            ) : (
                                <p>Loading your rating...</p>
                            )
                        ) : (
                            <form onSubmit={handleSubmitRating} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <select
                                    id="rating"
                                    name="rating"
                                    value={rating}
                                    onChange={handleRatingChange}
                                    style={{
                                        padding: '5px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        width: '50px',
                                        backgroundColor: '#ffffff',
                                    }}
                                >
                                    <option value="0" disabled></option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                <button type="submit">Beri Rating</button>
                            </form>
                        )}
                    </div>  
                </div>

                <div className="kanan">
                    <h2>{product.product_name}</h2>
                    <p><b>{product.shade_name}</b></p>
                    <p>{product.product_description}</p>
                    
                    
                    {productStats && (
                    <div className="product-stats">
                        <p>💰 Harga: {product.price !== undefined ? `${product.price}` : 'N/A'}</p>
                        <p>⭐ Rata-rata Rating: {productStats.avg_rating.toFixed(1)}</p>
                        <p>📦 Total Terjual: {productStats.total_sold}</p>
                    </div>
                )}

                </div>
            </div>

            <div className="bawah">
                {userId ? (
                    <RecBottom product_id={product_id} userId={userId} />
                ) : (
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <p>Mohon untuk<button onClick={() => navigate('/login')} style={{ textDecoration: 'underline', background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>masuk</button>/<button onClick={() => navigate('/register')} style={{ textDecoration: 'underline', background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>daftar</button>terlebih dahulu untuk melihat rekomendasi</p>
                    </div>
                )}
            </div>
        </div> 
    );
};

export default ProductDetail;
