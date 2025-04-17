import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product_id, image, name, brand, shade, price, stars }) => {
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
            </Link>
        </div>
    );
};

export default ProductCard;
