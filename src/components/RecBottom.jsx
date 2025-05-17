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
    const [userReviews, setUserReviews] = useState([]);

    const serverIP = 'http://127.0.0.1:5000';

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

    useEffect(() => {
        const fetchUserData = async () => {
            if (userId) {
                try {
                    const response = await fetch(`${serverIP}/user/${userId}`);
                    const data = await response.json();
                    console.log('User Data fetched:', data);
                    setUserData(data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };
        fetchUserData();
    }, [userId]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${serverIP}/products/${product_id}`);
                const data = await response.json();
                console.log('Products fetched:', data);

                const productsArray = Array.isArray(data) ? data : [data];
                setProducts(productsArray);

                const makeupPartsSet = new Set(productsArray.map((product) => product.makeup_part));
                setMakeupParts([...makeupPartsSet]);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [product_id]);

    useEffect(() => {
        const fetchProductsAll = async () => {
            try {
                const response = await fetch(`${serverIP}/products`);
                const data = await response.json();
                
                console.log('Data produk yang diterima:', data);
                console.log('Jumlah produk:', data.length);

                if (Array.isArray(data)) {
                    setProductsAll(data);
                } else {
                    console.log('Data yang diterima tidak dalam bentuk array, mencoba untuk memprosesnya');
                    setProductsAll([data]); // Jika tidak array, ubah jadi array dengan 1 elemen
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProductsAll();
    }, []);

    useEffect(() => {
        // Panggil rekomendasi hanya jika makeupParts, products, userData ready
        if (makeupParts.length > 0 && userData && products.length > 0) {
            fetchRecommendations({
                makeupPartInput: makeupParts[0],
                productCategory: products[0]?.makeup_type,
                selectedProduct: product_id,
                userDescription: null,
                topN: 5,
                productIdRefs: product_id,
            });
        }
    }, [makeupParts, userData, products, product_id]);

    const fetchRecommendations = async (params) => {
        setLoading(true);
        try {
            let hasReview = false;
            try {
                const reviewRes = await axios.get(`${serverIP}/reviews/${userId}`);
                hasReview = reviewRes.data.reviews?.length > 0;
            } catch (error) {
                if (error.response?.status === 404) {
                    hasReview = false;
                    console.log(`User ${userId} has no reviews.`);
                } else {
                    console.error('Error checking user reviews:', error);
                    hasReview = false;
                }
            }

            let cbfWeight, cfWeight, apiName;
            if (hasReview) {
                cbfWeight = 2;
                cfWeight = 1;
                apiName = 'hybrid_2';
            } else {
                cbfWeight = 4;
                cfWeight = 1;
                apiName = 'hybrid_1';
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
                const recProductId = parseInt(rec.product_id);
                const productDetails = productsAll.find(
                    (product) => parseInt(product.product_id) === recProductId
                );

                // Log untuk memeriksa kecocokan product_id
                // console.log(`Mencocokkan rekomendasi ID: ${recProductId}`);
                // console.log('Produk ditemukan:', productDetails);

                return { ...rec, ...productDetails };
            });

            console.log('Hasil rekomendasi yang diterima:', mergedRecommendations);

            setRecommendedProducts(mergedRecommendations);

        } catch (error) {
            console.error('Error fetching recommendations:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='rekomendasiBawah'>
            <h2>Mungkin Anda Suka</h2>
            <div className="product-grid">
                {loading ? (
                    <div className="overlay">
                        <div className="spinner"></div>
                    </div>
                ) : recommendedProducts.length > 0 ? (
                    recommendedProducts.map((product) => (
                        <ProductCard
                            key={product.product_id}
                            product_id={product.product_id}
                            image={product.image_url || '/default-placeholder.png'}
                            name={product.product_name}
                            brand={product.brand_name}
                            shade={product.shade_name || 'No Shade'}
                            price={product.price || 'Unknown Price'}
                        />
                    ))
                ) : (
                    <p>No recommendations available.</p>
                )}
            </div>
        </div>
    );
};

export default RecBottom;
