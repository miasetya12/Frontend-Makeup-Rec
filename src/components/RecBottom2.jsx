import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const RecBottom2 = ({ product_id, userId }) => {
    const [userData, setUserData] = useState(null);
    const [products, setProducts] = useState([]);
    const [productsAll, setProductsAll] = useState([]);
    const [makeupParts, setMakeupParts] = useState([]);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const serverIP = 'http://127.0.0.1:5000' // Ensure the server IP is correct
    console.log('Received product_id in RecBottom:', product_id);
    console.log('Received userId in RecBottom:', userId);

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            if (userId) {
                try {
                    const response = await fetch(`${serverIP}/user/${userId}`);
                    const data = await response.json();
                    console.log('User  Data fetched:', data);
                    setUserData(data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUserData();
    }, [userId]);

    // Fetch products
   useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${serverIP}/products/${product_id}`);
                const data = await response.json();
                console.log('Products fetched:', data); // Log the fetched products

                // Check if data is an array or an object
                const productsArray = Array.isArray(data) ? data : [data]; // Wrap in an array if it's an object

                setProducts(productsArray);

                // Extract makeup parts (e.g., foundation, lipstick, etc.) from product data
                const makeupPartsSet = new Set(productsArray.map((product) => product.makeup_part));
                setMakeupParts([...makeupPartsSet]);

                // Fetch recommendations after products are fetched
                if (userData) {
                    fetchRecommendations({
                        makeupPartInput: makeupParts[0], // Example: take the first makeup part
                        productCategory: productsArray[0]?.makeup_type, // Example: take the makeup type from the first product
                        selectedProduct: product_id,
                        userDescription: null,
                        topN: 5, // Example: top 5 recommendations
                        productIdRefs: product_id,
                    });
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [product_id, userData]); // Add userData as a dependency

    
    useEffect(() => {
        const fetchProductsAll = async () => {
            try {
                const response = await fetch(`${serverIP}/products`);
                const data = await response.json();
                console.log('All products fetched:', data); // Log seluruh produk
                setProductsAll(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProductsAll();
    }, []);


    useEffect(() => {
        if (productsAll.length > 0 && userData) {
            fetchRecommendations({
                makeupPartInput: makeupParts[0],
                productCategory: products[0]?.makeup_type,
                selectedProduct: product_id,
                userDescription: null,
                topN: 5,
                productIdRefs: product_id,
            });
        }
    }, [productsAll, userData]); // Tambahkan dependency

    const fetchRecommendations = async (params) => {
        setLoading(true);  // Start loading

        try {
            const cbfWeight = 2;
            const cfWeight = 1;
            const apiName = 'hybrid_2';

            const apiEndpoint = `${serverIP}/recommend/${apiName}`;
            const response = await axios.get(apiEndpoint, {
                params: {
                    makeup_part_input: params.makeupPartInput,
                    product_category: params.productCategory,
                    target_product_id: params.selectedProduct,
                    user_id: userId,
                    skin_type: userData?.skintype,
                    skin_tone: userData?.skintone,
                    under_tone: userData?.undertone,
                    user_description: params.userDescription,
                    top_n: params.topN,
                    product_id_refs: params.productIdRefs,
                    cbf_weight: cbfWeight,
                    cf_weight: cfWeight,
                },
            });

            console.log('API Response:', response.data);

            // Assuming response.data.recommendations is an array
            if (Array.isArray(response.data.recommendations)) {

                const mergedRecommendations = response.data.recommendations.map((recommendation) => {
        const productDetails = productsAll.find((product) => `${product.product_id}` === `${recommendation.product_id}`);
        return {
            ...recommendation,
            ...productDetails,
        }

                });

                console.log(`Recommendations for cbfWeight: ${cbfWeight}, cfWeight: ${cfWeight}`);
                console.table(mergedRecommendations);

                // Set all recommendations
                setRecommendedProducts(mergedRecommendations);
            } else {
                console.error('Invalid recommendations data:', response.data.recommendations);
            }
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        } finally {
            setLoading(false);  // End loading
        }
    };


    return (
      
         <div className='rekomendasiBawah'>
            
            <h2>Maybe You Like It</h2>

            <div className="product-grid">
                {loading ? (
                    <div className="overlay">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    recommendedProducts.length > 0 ? (
                        recommendedProducts.map((product) => (
                            <ProductCard
                                key={product.product_id}
                                product_id={product.product_id}
                                image={product.image_url}
                                name={product.product_name}
                                brand={product.brand_name}
                                shade={product.shade_name || 'No Shade'}
                                price={product.price || 'Unknown Price'}
                            />
                        ))
                    ) : (
                        <p>No recommendations available.</p>
                    )
                )}
            </div>
    </div>
    );
};

export default RecBottom2;
