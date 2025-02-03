import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import Header from './Header'; 
import RecBottom from './RecBottom';

const ProductDetail = () => {
    const { product_id } = useParams();
    const navigate = useNavigate(); // Initialize the navigate function
    const [product, setProduct] = useState(null);
    const [rating, setRating] = useState(0);
    const [userId, setUserId] = useState(localStorage.getItem('userId') || ''); // Ambil userId dari local storage
    const [message, setMessage] = useState('');
    const [hasRated, setHasRated] = useState(false);
    const [userRating, setUserRating] = useState(null); // Untuk menyimpan rating yang sudah diberikan pengguna

    const serverIP = 'http://127.0.0.1:5000/'
    // `${serverIP}/products`
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
            if (!userId) {
                console.log('UserId is missing');
                return; // Jangan fetch jika userId kosong
            }

            try {
                console.log(`Fetching reviews for userId: ${userId}`);
                const response = await axios.get(`${serverIP}/reviews/${userId}`);
                
                // Log the response to check the structure of the data
                console.log('Response from /reviews/:userId:', response);

                // Cek apakah response.data.reviews adalah array
                if (Array.isArray(response.data.reviews)) {
                    const reviews = response.data.reviews;
                    const userReview = reviews.find(review => review.product_id === parseInt(product_id));
                    if (userReview) {
                        console.log('User has already rated this product:', userReview);
                        setUserRating(userReview.stars); // Set user rating if found
                        setHasRated(true); // Tampilkan bahwa produk sudah di-rate
                    } else {
                        console.log('User has not rated this product yet');
                        setHasRated(false); // Jika belum ada rating, biarkan form submit rating muncul
                    }
                } else {
                    // Jika data bukan array, log dan tampilkan pesan kesalahan
                    console.error('Response data.reviews is not an array:', response.data.reviews);
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

    const handleRatingChange = (e) => setRating(e.target.value);

    const handleSubmitRating = async (e) => {
        e.preventDefault();

        if (!rating || !userId) {
            setMessage('Rating and User ID are required');
            return;
        }

        try {
            const response = await fetch(`${serverIP}/submit_rating` , {
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
            // setRating(3); // Reset rating
            
            // Simpan product_id di local storage
            const ratedProducts = JSON.parse(localStorage.getItem('ratedProducts')) || [];
            ratedProducts.push(product_id);
            localStorage.setItem('ratedProducts', JSON.stringify(ratedProducts));

            setHasRated(true); // Update state untuk menyembunyikan form
        } catch (error) {
            console.error('Error submitting rating:', error);
            setMessage('Error submitting rating');
        }
    };

    if (!product) return <div>Loading...</div>;


//    useEffect(() => {
//         const fetchUserData = async () => {
//             if (userId) {
//                 try {
//                     const response = await fetch(`${serverIP}/user/${userId}`);
//                     const data = await response.json();
//                     setUserData(data);
//                 } catch (error) {
//                     console.error('Error fetching user data:', error);
//                 }
//             }
//         };
//         fetchUserData();
//     }, [userId]);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await fetch(`${serverIP}/products`);
//                 const data = await response.json();
//                 setProducts(data);

//                 const makeupPartsSet = new Set(data.map((product) => product.makeup_part));
//                 setMakeupParts([...makeupPartsSet]);
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             }
//         };
//         fetchProducts();

        
//     }, []);

    

    return (
        <div>
            <Header userId={userId} setUserId={setUserId}/> {/* Pass userId and setUserId */}
            {/* <button onClick={() => navigate(-1)}>Back</button> Back button */}
            <div className="main-page-detail">
                <button onClick={() => navigate(-1)}>Back</button>
            
           
            <div className="kiri_umum">
                <div className="kiri">
                <img src={product.image_url} alt={product.product_name} />
                </div>

            <div className="rate-section">
            {hasRated ? (
                <p>Your Rating: {userRating || rating}</p>
            ) : (
        <form
                onSubmit={handleSubmitRating}
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                <select
                    id="rating"
                    name="rating"
                    value={rating}
                    onChange={handleRatingChange}
                    style={{
                        padding: '5px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        width: '50px', // Lebar kotak kecil
                        backgroundColor: '#ffffff',
                    }}
                >
                    <option value="0" disabled>
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button type="submit">Give Rating</button>
                </form>

            )}

            </div>  
            </div>

              <div className="kanan">
               <h2>{product.product_name}</h2>
             <p><b>{product.shade_name}</b></p>
            <p>{product.product_description}</p>
            <p>Price: {product.price !== undefined ? `${product.price}` : 'N/A'}</p>
            </div>
            
            </div>

    <div className="bawah">
        <RecBottom product_id={product_id} userId={userId} />
    </div>

        <div >
        </div>
        </div> 
        
    );
};

export default ProductDetail;
