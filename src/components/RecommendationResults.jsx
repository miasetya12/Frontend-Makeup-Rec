import React from 'react';
import ProductCardRec from './ProductCardRec';

const RecommendationResults = ({ recommendedProducts, products, recommendationFetched }) => {
    return (
        <div className="product-grid">
            {recommendationFetched && <h2 className="mt-4">Recommendations</h2>}

            {recommendedProducts.length > 0 ? (
                recommendedProducts.map((recommendedProduct) => {
                    const product = products.find((p) => p.product_id === recommendedProduct.product_id);
                    return (
                        product ? (
                            <ProductCardRec
                                key={product.product_id}
                                product_id={product.product_id}
                                image={product.image_url}
                                name={product.product_name}
                                brand={product.brand_name}
                                shade={product.shade_name}
                                price={product.price}
                                stars={recommendedProduct.stars}
                            />
                        ) : (
                            <p key={recommendedProduct.product_id}>Product not found</p>
                        )
                    );
                })
            ) : (
                <p>No recommendations available. Please try again.</p>
            )}
        </div>
    );
};

export default RecommendationResults;
