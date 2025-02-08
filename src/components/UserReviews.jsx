// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const UserReviews = ({ userId }) => {
//     const [reviews, setReviews] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchReviews = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/reviews/${userId}`);
//                 setReviews(response.data.reviews);
//             } catch (error) {
//                 console.error(error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchReviews();
//     }, [userId]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h2>Your Reviews</h2>
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

// export default UserReviews;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserReviews = ({ userId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    // const serverIP = 'http://127.0.0.1:5000/'
    const serverIP = 'https://octopus-app-mavy6.ondigitalocean.app/';

    // `${serverIP}/products`
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                 
                // const response = await axios.get(`http://localhost:5000/reviews/${userId}`);
                const response = await axios.get(`${serverIP}//reviews/${userId}`);
                setReviews(response.data.reviews);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchReviews();
        }
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Your Reviews</h2>
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

export default UserReviews;
