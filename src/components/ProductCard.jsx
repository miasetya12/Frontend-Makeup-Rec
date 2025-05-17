// import React from 'react';
// import { Link } from 'react-router-dom';

// const ProductCard = ({ product_id, image, name, brand, shade, price, stars }) => {
//     const [productStats, setProductStats] = useState(null);
//     const renderStars = (stars) => {
//         return [...Array(stars)].map((_, index) => (
//             <span key={index} className="star">⭐</span>
//         ));
//     };

//     useEffect(() => {
//     const fetchProductStats = async () => {
//         try {
//             const response = await axios.get(`${serverIP}/product_stats/${product_id}`);
//             setProductStats(response.data);
//         } catch (error) {
//             console.error('Error fetching product stats:', error);
//         }
//     };

//     fetchProductStats();
// }, [product_id]); // hanya dijalankan sekali saat product_id berubah


//     return (
//         <div className="product-card">
//             <Link to={`/product/${product_id}`} className="product-link">
//                 <div className="image-container">
//                     <img src={image} alt={name} />
//                 </div>

//                 <h3 className="product-name">{name}</h3>
//                 <p className="product-brand">{brand}</p>
//                 {shade !== 0 && <p className="product-shade">{shade}</p>}

//                 <p className="product-price">{price}</p>

//                 {stars !== undefined && (
//                     <div className="stars">
//                         {renderStars(stars)} <span className="rating">({stars})</span>
//                     </div>
//                 )}

//                  {productStats && (
//                     <div className="product-stats">
//                         <p><b>⭐ Rata-rata Rating:</b> {productStats.avg_rating.toFixed(1)}</p>
//                         <p><b>📦 Total Terjual:</b> {productStats.total_sold}</p>
//                     </div>
//                 )}
//             </Link>
//         </div>
//     );
// };

// export default ProductCard;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // penting untuk fetch data

const ProductCard = ({ product_id, image, name, brand, shade, price, stars }) => {
    const [productStats, setProductStats] = useState(null);
    const serverIP = 'http://127.0.0.1:5000'; // tambahkan IP server API-mu

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
    }, [product_id]);

    const renderStars = (stars) => {
        return [...Array(stars)].map((_, index) => (
            <span key={index} className="star">⭐</span>
        ));
    };

    return (
        <div className="product-card">
            <Link to={`/product/${product_id}`} className="product-link">
                <div className="image-container">
                    <img src={image} alt={name} />
                </div>

                <h3 className="product-name">{name}</h3>
                <p className="product-brand">{brand}</p>
                {shade !== 0 && <p className="product-shade">{shade}</p>}
                <p className="product-price">{price}</p>

                {stars !== undefined && (
                    <div className="stars">
                        {renderStars(stars)} <span className="rating">({stars})</span>
                    </div>
                )}

                {productStats && (
                    <div className="product-stats">
                        <p>⭐ Rata-rata Rating: {productStats.avg_rating.toFixed(1)}</p>
                        <p>📦 Total Terjual: {productStats.total_sold}</p>
                    </div>
                )}
            </Link>
        </div>
    );
};

export default ProductCard;
