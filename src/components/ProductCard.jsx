// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product_id, image, name, brand, shade, price, stars }) => {
    // Generate an array of stars based on the order
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

                {/* Conditionally render shade if it's not 0 */}
                {shade !== 0 && <p className="product-shade">{shade}</p>}

                <p className="product-price">Rp {price}</p>

                {/* Display stars and rating */}
                {stars !== undefined && (
                    <div className="stars">
                        {renderStars(stars)} <span className="rating">({stars})</span>
                    </div>
                )}
            </Link>
        </div>
    );
};

export default ProductCard;
