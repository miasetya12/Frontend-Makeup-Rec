import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductInputForm from './ProductInputForm';
import ProductRecommendationsDisplay from './ProductRecommendationsDisplay';
import Header from './Header';


const ProductRecommendations = ({ userId, setUserId }) => {
    const [products, setProducts] = useState([]);
    const [makeupParts, setMakeupParts] = useState([]);
    const [productCategories, setProductCategories] = useState([]);
    const [userData, setUserData] = useState(null);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [selectedApi, setSelectedApi] = useState({ api: '', weightConfig: null });
    const [loading, setLoading] = useState(false);  // Added loading state

    const serverIP = 'http://127.0.0.1:5000/'
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
        setLoading(true);  // Start loading

        try {
            const weightConfigs = [
                { cbfWeight: 4, cfWeight: 1},
                { cbfWeight: 2, cfWeight: 1 },
                { cbfWeight: 1, cfWeight: 1 },
                { cbfWeight: 1, cfWeight: 2 },
                { cbfWeight: 1, cfWeight: 4},
                { cbfWeight: 1, cfWeight: 0 },
                { cbfWeight: 0, cfWeight: 1 }               
            ];

    const apiName = 'hybrid_1'; // Nama API yang sedang digunakan
     
    const recommendations = await Promise.all(
    weightConfigs.map(async (config) => {
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
                cbf_weight: config.cbfWeight,
                cf_weight: config.cfWeight,
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
                    cbfWeight: config.cbfWeight,
                    cfWeight: config.cfWeight,
                };
            });

            console.log(`Recommendations for cbfWeight: ${config.cbfWeight}, cfWeight: ${config.cfWeight}`);
            console.table(mergedRecommendations);

            return mergedRecommendations;
        } else {
            console.error('Invalid recommendations data:', response.data.recommendations);
            return [];
        }
    })
);

            const allRecommendations = recommendations.flat();
            setRecommendedProducts(allRecommendations);
            const lastConfig = weightConfigs[weightConfigs.length - 1];
            setSelectedApi({
                api: apiName,
                weightConfig: lastConfig,
            });
            localStorage.setItem('recommendedProducts', JSON.stringify(allRecommendations));
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        } finally {
            setLoading(false); 
        }
    };

    const handleReset = () => {
        setRecommendedProducts([]);
        localStorage.removeItem('recommendedProducts');
    };

    return (
        <div>
            <Header userId={userId} setUserId={setUserId} />
            <div className="main-page">
            {/* <h2>Rekomendasi Produk 1 (Lakukan sebanyak 2 kali)</h2> */}
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
                        <ProductRecommendationsDisplay
                            recommendedProducts={recommendedProducts}
                            onReset={handleReset}
                        />
                    )}

                </>
            ) : (
                <p>Loading user data...</p>
            )}
        </div></div>
    );
};

export default ProductRecommendations;