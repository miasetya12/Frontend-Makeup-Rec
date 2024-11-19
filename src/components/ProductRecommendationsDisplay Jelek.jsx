import React, { useState, useEffect } from 'react';
import ProductCardRec from './ProductCardRec';
import ScenarioOrder from './ScenarioOrder';

const ProductRecommendationsDisplay = ({ recommendedProducts, onReset }) => {
    const [storedRecommendations, setStoredRecommendations] = useState([]);
    const [userRecommendations, setUserRecommendations] = useState([]);
    const [orderData, setOrderData] = useState({
        first: '',
        second: '',
        third: '',
        fourth: '',
        fifth: '',
        sixth: '',
        seventh: ''
    });
    const [isOrderVisible, setIsOrderVisible] = useState(false); // New state for visibility of ScenarioOrder

    useEffect(() => {
        const storedRecommendations = JSON.parse(localStorage.getItem('recommendedProducts')) || [];
        console.log("Stored recommendations from localStorage:", storedRecommendations);
        setStoredRecommendations(storedRecommendations);
    }, []);

    useEffect(() => {
        if (recommendedProducts.length > 0) {
            console.log("New recommendations added:", recommendedProducts);
            localStorage.setItem('recommendedProducts', JSON.stringify(recommendedProducts));
            setStoredRecommendations(recommendedProducts);
        }
    }, [recommendedProducts]);

    const handleReset = () => {
        console.log("Resetting recommendations...");
        localStorage.removeItem('recommendedProducts');
        localStorage.removeItem('userRecommendations');
        localStorage.removeItem('orderData');
        setStoredRecommendations([]);
        setUserRecommendations([]);
        setOrderData({});
        onReset();
    };

    const handleSaveAll = () => {
        const userId = localStorage.getItem('userId');
        console.log("Saving all recommendations for user:", userId);
        console.log("User recommendations:", userRecommendations);
        console.log("User scenario order:", orderData);

        const recommendationsArray = Object.keys(userRecommendations).map(scenario => ({
            scenario: parseInt(scenario),
            products: userRecommendations[scenario]
        }));

        const recommendationData = {
            user_id: userId,
            recommendations: recommendationsArray,
            timestamp: Date.now()
        };

        fetch('http://localhost:5000/save_recommendation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recommendationData),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('All recommendations saved:', data);

            const orderDataToSave = {
                user_id: userId,
                order: orderData,
                timestamp: Date.now()
            };

            fetch('http://localhost:5000/save_order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderDataToSave),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Order saved:', data);
                setIsOrderVisible(false); // Hide the order form after saving
                handleReset();
            })
            .catch((error) => {
                console.error('Error saving order:', error);
            });

        })
        .catch((error) => {
            console.error('Error saving all recommendations:', error);
        });
    };

    const handleOrderChange = (order) => {
        console.log("Order received from child:", order);
        setOrderData(order);
    };

    const handleThumbsChange = (productId, thumbsUpStatus, thumbsDownStatus, scenarioNumber, order) => {
        setUserRecommendations((prevRecommendations) => {
            let updatedRecommendations = { ...prevRecommendations };
            let productFound = false;

            for (let scenario in updatedRecommendations) {
                const updatedScenario = updatedRecommendations[scenario];
                const existingProductIndex = updatedScenario.findIndex(item => item.product_id === productId);

                if (existingProductIndex !== -1 && scenarioNumber === parseInt(scenario)) {
                    updatedScenario[existingProductIndex].revOrNot = thumbsUpStatus ? true : thumbsDownStatus ? false : updatedScenario[existingProductIndex].revOrNot;
                    updatedScenario[existingProductIndex].order = order;
                    productFound = true;
                    break;
                }
            }

            if (!productFound) {
                const updatedScenario = updatedRecommendations[scenarioNumber] || [];
                updatedScenario.push({
                    product_id: productId,
                    revOrNot: thumbsUpStatus ? true : thumbsDownStatus ? false : null,
                    order: order,
                });
                updatedRecommendations[scenarioNumber] = updatedScenario;
            }

            return updatedRecommendations;
        });
    };

    return (
        <div>
            <h2>Recommendations</h2>
            {storedRecommendations.length > 0 ? (
                Array.from({ length: Math.ceil(storedRecommendations.length / 5) }).map((_, index) => {
                    const start = index * 5;
                    const end = start + 5;
                    const productsInScenario = storedRecommendations.slice(start, end);

                    return (
                        <div key={`scenario-${index}`}>
                            <div className="scenario-title">
                                <h3>Recommendation Scenario {index + 1}</h3>
                            </div>

                            <div className="product-grid-container">
                                {productsInScenario.map((product, idx) => (
                                    <div key={`${product.product_id}-${start + idx}`} className="product-card-wrapper">
                                        <div className="product-card">
                                            <ProductCardRec
                                                product_id={product.product_id}
                                                image={product.image_url}
                                                name={product.product_name}
                                                brand={product.brand_name}
                                                shade={product.shade_name}
                                                price={product.price}
                                                stars={product.stars}
                                                api={product.api}
                                                onThumbsChange={handleThumbsChange}
                                                scenarioNumber={index + 1}
                                            />
                                            <p>Recommended by: {product.api} (cbfWeight: {product.cbfWeight}, cfWeight: {product.cfWeight})</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })
            ) : (
                <p>No recommendations available. Please try again.</p>
            )}

            {/* Show ScenarioOrder only if isOrderVisible is true */}
            {isOrderVisible && <ScenarioOrder onOrderChange={handleOrderChange} />}
            
            <button onClick={handleSaveAll}>Save All Recommendations</button>
            <button onClick={handleReset}>Reset Recommendations</button>
        </div>
    );
};

export default ProductRecommendationsDisplay;
