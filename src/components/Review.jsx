// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Header from './Header'; 
// import ProductCard from './ProductCard'

// const Review = ({ userId }) => {
//     const navigate = useNavigate();
//     const [reviews, setReviews] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchReviews = async () => {
//             if (userId) {
//                 try {
//                     const response = await axios.get(`http://localhost:5000/reviews/${userId}`);
//                     setReviews(response.data.reviews);
//                 } catch (error) {
//                     console.error(error);
//                 } finally {
//                     setLoading(false);
//                 }
//             }
//         };

//         fetchReviews();

//         const fetchProducts = async () => {
//             try {
//                 // const response = await fetch('http://127.0.0.1:5000/products');
//                 const response = await fetch('http://localhost:5000/products');
                
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const data = await response.json();
//                 setProducts(data); // Menyimpan data produk
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             }
//         };

//         fetchProducts();
//     }, [userId]);

//     const handleViewReviews = () => {
//         navigate(`/reviews/${userId}`); // Navigate to reviews page
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h2>Hello, User {userId}</h2>
//             <button onClick={handleViewReviews}>View My Reviews</button>
//             <h3>Your Reviews:</h3>
//             <ul>
//                 {reviews.length > 0 ? (
//                     reviews.map((review) => (
//                         <li key={review.product_id}>
//                             Product ID: {review.product_id}, Stars: {review.stars}
//                         </li>
//                     ))
//                 ) : (
//                     <li>No reviews found.</li>
//                 )}
//             </ul>
//         </div>
//     );
// };

// export default Review;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header'; 
import ProductCard from './ProductCard';

const Review = ({ userId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:5000/reviews/${userId}`);
                    setReviews(response.data.reviews);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchReviews();

        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/products');
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data); // Menyimpan data produk
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Hello, User {userId}</h2>
            <h3>Your Reviews:</h3>
            <ul>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <li key={review.product_id}>
                            Product ID: {review.product_id}, Stars: {review.stars}
                        </li>
                    ))
                ) : (
                    <li>No reviews found.</li>
                )}
            </ul>
        </div>
    );
};

export default Review;

