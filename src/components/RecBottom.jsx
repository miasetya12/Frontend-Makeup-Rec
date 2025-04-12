import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const RecBottom = ({ product_id, userId }) => {
    const [userData, setUserData] = useState(null);
    const [products, setProducts] = useState([]);
    const [productsAll, setProductsAll] = useState([]);
    const [makeupParts, setMakeupParts] = useState([]);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasReviews, setHasReviews] = useState(false);
    const [userReviews, setUserReviews] = useState([]);


    const serverIP = 'http://127.0.0.1:5000'; // Ensure the server IP is correct
//    const serverIP = 'https://clownfish-app-73v5y.ondigitalocean.app/';
    console.log('Received product_id in RecBottom:', product_id);
    console.log('Received userId in RecBottom:', userId);

        useEffect(() => {
        const fetchUserReviews = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`${serverIP}/reviews/${userId}`);
                    setUserReviews(response.data.reviews || []);
                } catch (error) {
                    console.error('Error fetching user reviews:', error);
                }
            }
        };

        fetchUserReviews();
    }, [userId]);
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


    // useEffect(() => {
    //     if (productsAll.length > 0 && userData) {
    //         fetchRecommendations({
    //             makeupPartInput: makeupParts[0],
    //             productCategory: products[0]?.makeup_type,
    //             selectedProduct: product_id,
    //             userDescription: null,
    //             topN: 5,
    //             productIdRefs: product_id,
    //         });
    //     }
    // }, [productsAll, userData]); // Tambahkan dependency


    // useEffect(() => {
    //     const checkUserReviews = async () => {
    //         if (userId) {
    //             try {
    //                 const response = await axios.get(`${serverIP}/reviews/${userId}`);
    //                 if (response.data.reviews && response.data.reviews.length > 0) {
    //                     setHasReviews(true);
    //                 }
    //             } catch (error) {
    //                 console.error('Error checking user reviews:', error);
    //             }
    //         }
    //     };

    //     checkUserReviews();
    // }, [userId]);

//     useEffect(() => {
//     const checkUserReviews = async () => {
//         setHasReviews(false);  // Reset dulu
//         if (userId) {
//             try {
//                 const response = await axios.get(`${serverIP}/reviews/${userId}`);
//                 if (response.data.reviews && response.data.reviews.length > 0) {
//                     setHasReviews(true);
//                 }
//             } catch (error) {
//                 console.error('Error checking user reviews:', error);
//             }
//         }
//     };

//     checkUserReviews();
    
// }, [userId]);

// useEffect(() => {
//     const checkUserReviews = async () => {
//         if (userId) {
//             try {
//                 const response = await axios.get(`${serverIP}/reviews/${userId}`);
//                 const hasReview = response.data.reviews?.length > 0;
//                 setHasReviews(hasReview);
//                 console.log(`User ${userId} has reviews:`, hasReview);
//             } catch (error) {
//                 if (error.response?.status === 404) {
//                     // Tidak ditemukan = user belum pernah review
//                     setHasReviews(false);
//                     console.log(`User ${userId} has no reviews.`);
//                 } else {
//                     // Error lain yang lebih serius
//                     console.error('Error checking user reviews:', error);
//                     setHasReviews(false);
//                 }
//             }
//         } else {
//             setHasReviews(false);
//         }
//     };

//     checkUserReviews();
// }, [userId]);




    // const fetchRecommendations = async (params) => {
    //     setLoading(true);  // Start loading

    //     try {
    //         // const cbfWeight = 4;
    //         // const cfWeight = 1;
    //         // const apiName = 'hybrid_tfidf'; // API name being used

    //         const cbfWeight = hasReviews ? 2 : 4;
    //         const cfWeight = hasReviews ? 1 : 1;
    //         const apiName = hasReviews ? 'hybrid_tfidf2' : 'hybrid_tfidf';
    //         const apiEndpoint = `${serverIP}/recommend/${apiName}`;
    //         const response = await axios.get(apiEndpoint, {
    //             params: {
    //                 makeup_part_input: params.makeupPartInput,
    //                 product_category: params.productCategory,
    //                 target_product_id: params.selectedProduct,
    //                 user_id: userId,
    //                 skin_type: userData?.skintype,
    //                 skin_tone: userData?.skintone,
    //                 under_tone: userData?.undertone,
    //                 user_description: params.userDescription,
    //                 top_n: params.topN,
    //                 product_id_refs: params.productIdRefs,
    //                 cbf_weight: cbfWeight,
    //                 cf_weight: cfWeight,
    //             },
    //         });

    //         // Log the entire response data
    //         console.log('API Response:', response.data);
    //         console.log("API Endpoint:", apiEndpoint);
    //         console.log("CBF Weight:", cbfWeight);
    //         console.log("CF Weight:", cfWeight);


    //         // Assuming response.data.recommendations is an array
    //         if (Array.isArray(response.data.recommendations)) {

    //             const mergedRecommendations = response.data.recommendations.map((recommendation) => {
    //     const productDetails = productsAll.find((product) => `${product.product_id}` === `${recommendation.product_id}`);
    //     return {
    //         ...recommendation,
    //         ...productDetails,
    //     }

    //             });

    //             // Log the recommendations
    //             console.log(`Recommendations for cbfWeight: ${cbfWeight}, cfWeight: ${cfWeight}`);
    //             console.table(mergedRecommendations);

    //             // Set all recommendations
    //             setRecommendedProducts(mergedRecommendations);

    //             // Save in localStorage
    //             // localStorage.setItem('recommendedProducts', JSON.stringify(mergedRecommendations));
    //         } else {
    //             console.error('Invalid recommendations data:', response.data.recommendations);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching recommendations:', error);
    //     } finally {
    //         setLoading(false);  // End loading
    //     }
    // };


//     const fetchRecommendations = async (params) => {
//     setLoading(true);

//     try {
//         // Cek apakah user punya review dulu
//         const reviewRes = await axios.get(`${serverIP}/reviews/${userId}`);
//         const hasReview = reviewRes.data.reviews?.length > 0;

//         // Pakai if untuk atur bobot dan API
//         let cbfWeight, cfWeight, apiName;
//         if (hasReview) {
//             cbfWeight = 2;
//             cfWeight = 1;
//             apiName = 'hybrid_tfidf2';
//         } else {
//             cbfWeight = 4;
//             cfWeight = 1;
//             apiName = 'hybrid_tfidf';
//         }

//         const apiEndpoint = `${serverIP}/recommend/${apiName}`;
//         console.log(`User has review: ${hasReview}`);
//         console.log(`Using API: ${apiName} with CBF:CF = ${cbfWeight}:${cfWeight}`);

//         const response = await axios.get(apiEndpoint, {
//             params: {
//                 makeup_part_input: params.makeupPartInput,
//                 product_category: params.productCategory,
//                 target_product_id: params.selectedProduct,
//                 user_id: userId,
//                 skin_type: userData?.skintype,
//                 skin_tone: userData?.skintone,
//                 under_tone: userData?.undertone,
//                 user_description: params.userDescription,
//                 top_n: params.topN,
//                 product_id_refs: params.productIdRefs,
//                 cbf_weight: cbfWeight,
//                 cf_weight: cfWeight,
//             },
//         });

//         const mergedRecommendations = response.data.recommendations.map((rec) => {
//             const productDetails = productsAll.find(
//                 (product) => `${product.product_id}` === `${rec.product_id}`
//             );
//             return { ...rec, ...productDetails };
//         });

//         setRecommendedProducts(mergedRecommendations);
//     } catch (error) {
//         console.error('Error fetching recommendations:', error);
//     } finally {
//         setLoading(false);
//     }
// };


const fetchRecommendations = async (params) => {
    setLoading(true);

    try {
        // Cek apakah user punya review
        let hasReview = false;
        try {
            const reviewRes = await axios.get(`${serverIP}/reviews/${userId}`);
            hasReview = reviewRes.data.reviews?.length > 0;
        } catch (error) {
            if (error.response?.status === 404) {
                // User belum punya review
                hasReview = false;
                console.log(`User ${userId} has no reviews.`);
            } else {
                // Error lain (misal server down), log dan default ke false
                console.error('Error checking user reviews:', error);
                hasReview = false;
            }
        }

        // Tentukan bobot dan API
        let cbfWeight, cfWeight, apiName;
        if (hasReview) {
            cbfWeight = 2;
            cfWeight = 1;
            apiName = 'hybrid_tfidf2';
        } else {
            cbfWeight = 4;
            cfWeight = 1;
            apiName = 'hybrid_tfidf';
        }

        const apiEndpoint = `${serverIP}/recommend/${apiName}`;
        console.log(`User has review: ${hasReview}`);
        console.log(`Using API: ${apiName} with CBF:CF = ${cbfWeight}:${cfWeight}`);

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

        const mergedRecommendations = response.data.recommendations.map((rec) => {
            const productDetails = productsAll.find(
                (product) => `${product.product_id}` === `${rec.product_id}`
            );
            return { ...rec, ...productDetails };
        });

        setRecommendedProducts(mergedRecommendations);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
    } finally {
        setLoading(false);
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

export default RecBottom;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ProductCard from './ProductCard';

// const RecBottom = ({ product_id, userId }) => {
//     const [userData, setUserData] = useState(null);
//     const [products, setProducts] = useState([]);
//     const [productsAll, setProductsAll] = useState([]);
//     const [makeupParts, setMakeupParts] = useState([]);
//     const [recommendedProducts, setRecommendedProducts] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const serverIP = 'http://127.0.0.1:5000'; // Ensure the server IP is correct

//     console.log('Received product_id in RecBottom:', product_id);
//     console.log('Received userId in RecBottom:', userId);

//     // Fetch user data
//     useEffect(() => {
//         const fetchUserData = async () => {
//             if (userId) {
//                 try {
//                     const response = await fetch(`${serverIP}/user/${userId}`);
//                     const data = await response.json();
//                     console.log('User Data fetched:', data);
//                     setUserData(data);
//                 } catch (error) {
//                     console.error('Error fetching user data:', error);
//                 }
//             }
//         };

//         fetchUserData();
//     }, [userId]);

//     // Fetch products only once
//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await fetch(`${serverIP}/products/${product_id}`);
//                 const data = await response.json();
//                 console.log('Products fetched:', data);

//                 const productsArray = Array.isArray(data) ? data : [data]; // Ensure it's an array
//                 setProducts(productsArray);

//                 // Extract makeup parts (e.g., foundation, lipstick, etc.) from product data
//                 const makeupPartsSet = new Set(productsArray.map((product) => product.makeup_part));
//                 setMakeupParts([...makeupPartsSet]);

//                 // Fetch all products to get the full list for recommendations
//                 fetchAllProducts();
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             }
//         };

//         fetchProducts();
//     }, [product_id]);

//     // Fetch all products for recommendations (only once)
//     const fetchAllProducts = async () => {
//         try {
//             const response = await fetch(`${serverIP}/products`);
//             const data = await response.json();
//             console.log('All products fetched:', data);
//             setProductsAll(data);
//         } catch (error) {
//             console.error('Error fetching all products:', error);
//         }
//     };

//     // Fetch recommendations when user data and productsAll are available
//     useEffect(() => {
//         if (productsAll.length > 0 && userData) {
//             fetchRecommendations({
//                 makeupPartInput: makeupParts[0], // Example: take the first makeup part
//                 productCategory: products[0]?.makeup_type, // Example: take the makeup type from the first product
//                 selectedProduct: product_id,
//                 userDescription: null,
//                 topN: 5, // Example: top 5 recommendations
//                 productIdRefs: product_id,
//             });
//         }
//     }, [productsAll, userData]); // Dependency on both userData and productsAll

//     const fetchRecommendations = async (params) => {
//         setLoading(true);  // Start loading

//         try {
//             const cbfWeight = 1;
//             const cfWeight = 1;
//             const apiName = 'hybrid_tfidf'; // API name being used

//             const apiEndpoint = `${serverIP}/recommend/${apiName}`;
//             const response = await axios.get(apiEndpoint, {
//                 params: {
//                     makeup_part_input: params.makeupPartInput,
//                     product_category: params.productCategory,
//                     target_product_id: params.selectedProduct,
//                     user_id: userId,
//                     skin_type: userData?.skintype,
//                     skin_tone: userData?.skintone,
//                     under_tone: userData?.undertone,
//                     user_description: params.userDescription,
//                     top_n: params.topN,
//                     product_id_refs: params.productIdRefs,
//                     cbf_weight: cbfWeight,
//                     cf_weight: cfWeight,
//                 },
//             });

//             console.log('API Response:', response.data);

//             if (Array.isArray(response.data.recommendations)) {
//                 const mergedRecommendations = response.data.recommendations.map((recommendation) => {
//                     const productDetails = productsAll.find((product) => `${product.product_id}` === `${recommendation.product_id}`);
//                     return {
//                         ...recommendation,
//                         ...productDetails,
//                     };
//                 });

//                 console.log(`Recommendations for cbfWeight: ${cbfWeight}, cfWeight: ${cfWeight}`);
//                 console.table(mergedRecommendations);

//                 setRecommendedProducts(mergedRecommendations);
//             } else {
//                 console.error('Invalid recommendations data:', response.data.recommendations);
//             }
//         } catch (error) {
//             console.error('Error fetching recommendations:', error);
//         } finally {
//             setLoading(false);  // End loading
//         }
//     };

//     // Handle product click to reset recommendations
//     const handleProductClick = () => {
//         setRecommendedProducts([]); // Clear current recommendations
//         setLoading(true);  // Show loading spinner again
//         // Trigger re-fetch of recommendations by resetting the state
//         fetchRecommendations({
//             makeupPartInput: makeupParts[0], // Example: take the first makeup part
//             productCategory: products[0]?.makeup_type, // Example: take the makeup type from the first product
//             selectedProduct: product_id,
//             userDescription: null,
//             topN: 15,
//             productIdRefs: product_id,
//         });
//     };

//     return (
//         <div className='rekomendasiBawah'>
//             <h2>Maybe You Like It</h2>

//             <div className="product-grid">
//                 {recommendedProducts.length > 0 ? (
//                     recommendedProducts.map((product) => (
//                         <ProductCard
//                             key={product.product_id}
//                             product_id={product.product_id}
//                             image={product.image_url}
//                             name={product.product_name}
//                             brand={product.brand_name}
//                             shade={product.shade_name || 'No Shade'}
//                             price={product.price || 'Unknown Price'}
//                             onClick={handleProductClick}  // Trigger reset on product click
//                         />
//                     ))
//                 ) : (
//                     !loading && <p>No recommendations available.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default RecBottom;
