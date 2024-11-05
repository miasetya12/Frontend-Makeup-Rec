// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product_id, image, name, price }) => {
    return (
        <div className="product-card">
            <Link to={`/product/${product_id}`} className="product-link">
                <div className="image-container">
                    <img src={image} alt={name} />
                </div>
                <h3>{name}</h3>
                <p>Price: {price}</p>
            </Link>
        </div>
    );
};

export default ProductCard;
