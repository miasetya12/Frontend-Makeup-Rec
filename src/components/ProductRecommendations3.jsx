import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductInputForm from './ProductInputForm';
import ProductRecommendationsDisplay3 from './ProductRecommendationsDisplay3';
import Header from './Header';

const ProductRecommendations2 = ({ userId, setUserId }) => {
    const [products, setProducts] = useState([]);
    const [makeupParts, setMakeupParts] = useState([]);
    const [productCategories, setProductCategories] = useState([]);
    const [userData, setUserData] = useState(null);
    const [recommendedProducts_2, setRecommendedProducts_2] = useState([]);
    const [selectedApi, setSelectedApi] = useState({ api: '', weightConfig: null });
    const [loading, setLoading] = useState(false);
    const [userReviews, setUserReviews] = useState([]);

    const serverIP = 'http://127.0.0.1:5000';

    // Fetch User Data
    useEffect(() => {
        const fetchUserData = async () => {
            if (userId) {
                try {
                    const response = await fetch(`${serverIP}/user/${userId}`);
                    const data = await response.json();
                    setUserData(data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };
        fetchUserData();
    }, [userId]);

    // Fetch User Reviews
    // useEffect(() => {
    //     const fetchUserReviews = async () => {
    //         if (userId) {
    //             try {
    //                 const response = await axios.get(`${serverIP}/reviews/${userId}`);
    //                 const reviews = response.data.reviews || [];
    //                 setUserReviews(reviews);
    //                 console.log("User reviews detected:", reviews.length);
    //             } catch (error) {
    //                 console.error('Error fetching user reviews:', error);
    //             }
    //         }
    //     };
    //     fetchUserReviews();
    // }, [userId]);

    // Fetch User Reviews
    useEffect(() => {
        const fetchUserReviews = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`${serverIP}/reviews/${userId}`);
                    const reviews = response.data.reviews || [];
                    setUserReviews(reviews);
                    console.log("User reviews detected:", reviews.length);
                } catch (error) {
                    if (error.response?.status === 404) {
                        console.log(`No reviews found for user ${userId}`);
                        setUserReviews([]); // kosongkan jika tidak ada review
                    } else {
                        console.error('Error fetching user reviews:', error);
                    }
                }
            }
        };
        fetchUserReviews();
    }, [userId]);


    // Fetch Product List
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${serverIP}/products`);
                const data = await response.json();
                setProducts(data);

                const makeupPartsSet = new Set(data.map((product) => product.makeup_part));
                setMakeupParts([...makeupPartsSet]);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleMakeupPartChange = (makeupPartInput) => {
        const filteredCategories = new Set(
            products
                .filter((product) => product.makeup_part === makeupPartInput)
                .map((product) => product.makeup_type)
        );
        setProductCategories([...filteredCategories]);
    };

    const fetchRecommendations = async (params) => {
        setLoading(true);
        try {
            const userHasReview = userReviews && userReviews.length > 0;
            const weightConfig = userHasReview ? { cbfWeight: 2, cfWeight: 1 } : { cbfWeight: 4, cfWeight: 1 };
            const apiName = userHasReview ? 'hybrid_2' : 'hybrid_1';

            console.log('--- FETCHING RECOMMENDATIONS ---');
            console.log(userHasReview ? '🧑‍💼 User has reviews (existing user)' : '🆕 New user (no reviews)');
            console.log(`📦 Using API: ${apiName} | CBF: ${weightConfig.cbfWeight}, CF: ${weightConfig.cfWeight}`);

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
                    cbf_weight: weightConfig.cbfWeight,
                    cf_weight: weightConfig.cfWeight,
                },
            });

            console.log('API Response:', response.data);

            if (Array.isArray(response.data.recommendations)) {
                const mergedRecommendations = response.data.recommendations.map((recommendation) => {
                    const productDetails = products.find((product) => product.product_id === recommendation.product_id);
                    return {
                        ...recommendation,
                        ...productDetails,
                        api: apiName,
                        cbfWeight: weightConfig.cbfWeight,
                        cfWeight: weightConfig.cfWeight,
                    };
                });

                setRecommendedProducts_2(mergedRecommendations);
                setSelectedApi({
                    api: apiName,
                    weightConfig,
                });
                localStorage.setItem('recommendedProducts_2', JSON.stringify(mergedRecommendations));
            } else {
                console.error('Invalid recommendations data:', response.data.recommendations);
            }
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setRecommendedProducts_2([]);
        localStorage.removeItem('recommendedProducts_2');
    };

    return (
        <div>
            <Header userId={userId} setUserId={setUserId} />
            <div className="main-page">
                <h2>Rekomendasi Produk</h2>

                {userData ? (
                    <>
                        <ProductInputForm
                            onSubmit={fetchRecommendations}
                            makeupParts={makeupParts}
                            productCategories={productCategories}
                            onMakeupPartChange={handleMakeupPartChange}
                            onProductCategoryChange={() => {}}
                        />

                        {loading ? (
                            <div className="overlay">
                                <div className="spinner"></div>
                            </div>
                        ) : (
                            <ProductRecommendationsDisplay3
                                recommendedProducts_2={recommendedProducts_2}
                                onReset={handleReset}
                            />
                        )}
                    </>
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>
        </div>
    );
};

export default ProductRecommendations2;
