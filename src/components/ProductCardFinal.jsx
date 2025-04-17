import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCardRec = ({ product_id, image, name, brand, shade, price, stars, info, api,cbf_weight, cf_weight,onThumbsChange, scenarioNumber }) => {
    // const [thumbsUpClicked, setThumbsUpClicked] = useState(false);
    // const [thumbsDownClicked, setThumbsDownClicked] = useState(false);
    // const [order, setOrder] = useState(0);
    const [hovered, setHovered] = useState(false);
    
    // const handleThumbsUpClick = () => {
    //     if (thumbsUpClicked) {
    //         setThumbsUpClicked(false);
    //         onThumbsChange(product_id, false, thumbsDownClicked, scenarioNumber, order);
    //     } else {
    //         setThumbsUpClicked(true);
    //         setThumbsDownClicked(false);
    //         onThumbsChange(product_id, true, false, scenarioNumber, order);
    //     }
    // };

    // const handleThumbsDownClick = () => {
    //     if (thumbsDownClicked) {
    //         setThumbsDownClicked(false);
    //         onThumbsChange(product_id, thumbsUpClicked, false, scenarioNumber, order);
    //     } else {
    //         setThumbsDownClicked(true);
    //         setThumbsUpClicked(false);
    //         onThumbsChange(product_id, false, true, scenarioNumber, order);
    //     }
    // };

    // const handleOrderChange = (event) => {
    //     const newOrder = parseInt(event.target.value, 10);
    //     setOrder(newOrder);
    //     // Kirim nilai dropdown bersama data thumbs up/down ke onThumbsChange
    //     onThumbsChange(product_id, thumbsUpClicked, thumbsDownClicked, scenarioNumber, newOrder);
    // };

    const renderStars = (stars) => {
        return [...Array(stars)].map((_, index) => (
            <span key={index} className="star">⭐</span>
        ));
    };

    return (
        <div className="product-card-container-2"
        onMouseEnter={() => setHovered(true)} 
            onMouseLeave={() => setHovered(false)} 
            style={{ position: 'relative' }} 
        >
           
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

export default ProductCardRec;
