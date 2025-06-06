import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCardRec = ({ product_id, image, name, brand, shade, price, stars, info, api,cbf_weight, cf_weight,onThumbsChange, scenarioNumber }) => {
    const [thumbsUpClicked, setThumbsUpClicked] = useState(false);
    const [thumbsDownClicked, setThumbsDownClicked] = useState(false);
    const [order, setOrder] = useState(0);
    const [hovered, setHovered] = useState(false);
    
    const handleThumbsUpClick = () => {
        if (thumbsUpClicked) {
            setThumbsUpClicked(false);
            onThumbsChange(product_id, false, thumbsDownClicked, scenarioNumber, order);
        } else {
            setThumbsUpClicked(true);
            setThumbsDownClicked(false);
            onThumbsChange(product_id, true, false, scenarioNumber, order);
        }
    };

    const handleThumbsDownClick = () => {
        if (thumbsDownClicked) {
            setThumbsDownClicked(false);
            onThumbsChange(product_id, thumbsUpClicked, false, scenarioNumber, order);
        } else {
            setThumbsDownClicked(true);
            setThumbsUpClicked(false);
            onThumbsChange(product_id, false, true, scenarioNumber, order);
        }
    };

    const handleOrderChange = (event) => {
        const newOrder = parseInt(event.target.value, 10);
        setOrder(newOrder);
        onThumbsChange(product_id, thumbsUpClicked, thumbsDownClicked, scenarioNumber, newOrder);
    };

    const renderStars = (stars) => {
        return [...Array(stars)].map((_, index) => (
            <span key={index} className="star">⭐</span>
        ));
    };

    return (
        <div className="product-card-container"
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
        
            <div className="thumbs-container">
                {/* Thumbs Up Button */}
                <button
                    className={`thumbs-up-button ${thumbsUpClicked ? 'clicked' : ''}`}
                    onClick={handleThumbsUpClick}
                    aria-label={thumbsUpClicked ? "Thumbs Up Clicked" : "Click to Thumbs Up"}
                    style={{ background: 'none', border: 'none' }}
                >
                    <i
                        className={`fa-solid fa-thumbs-up ${thumbsUpClicked ? 'clicked' : ''}`}
                        style={{ color: thumbsUpClicked ? '#3a6d59' : '' }}
                    ></i>
                </button>

                {/* Thumbs Down Button */}
                <button
                    className={`thumbs-down-button ${thumbsDownClicked ? 'clicked' : ''}`}
                    onClick={handleThumbsDownClick}
                    aria-label={thumbsDownClicked ? "Thumbs Down Clicked" : "Click to Thumbs Down"}
                    style={{ background: 'none', border: 'none' }}
                >
                    <i
                        className={`fa-solid fa-thumbs-down ${thumbsDownClicked ? 'clicked' : ''}`}
                        style={{ color: thumbsDownClicked ? '#d9262f' : '' }}
                    ></i>
                </button>
            </div>
             {/* Dropdown for order */}
                <select
                    className="order-dropdown"
                    value={order}
                    onChange={handleOrderChange}
                    
                    style={{
                        marginTop: '10px',
                        padding: '5px',
                        borderRadius: '5px',
                        width: '110px',
                        textAlign: 'center',
                        textAlignLast: 'center',
                    }}
                >
                    <option value={0} >Urutkan</option>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>
        </div>
    );
};

export default ProductCardRec;
