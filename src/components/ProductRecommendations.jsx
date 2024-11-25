// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ProductCardRec from './ProductCardRec'; // Import the ProductCard component
// import Header from './Header';

// const ProductRecommendations = ({ userId, setUserId }) => {
//     const [products, setProducts] = useState([]); // Store fetched products
//     const [recommendedProducts, setRecommendedProducts] = useState([]); // Store recommendations
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [userData, setUserData] = useState(null); // Store user data

//     // Input parameters
//     const [makeupPartInput, setMakeupPartInput] = useState('');
//     const [productCategory, setProductCategory] = useState('');
//     const [skinType, setSkinType] = useState('');
//     const [skinTone, setSkinTone] = useState('');
//     const [underTone, setUnderTone] = useState('');
//     const [userDescription, setUserDescription] = useState('');
//     const [topN, setTopN] = useState(5); // Number of products to display

//     const [makeupParts, setMakeupParts] = useState([]); // Store unique makeup parts
//     const [productCategories, setProductCategories] = useState([]); // Store unique product categories filtered by makeup part

//     // Track selected API method
//     const [selectedApi, setSelectedApi] = useState('tfidf'); // Default to TF-IDF

//     // Track if recommendations are fetched
//     const [recommendationFetched, setRecommendationFetched] = useState(false);

//     // Fetch user data based on userId
//     useEffect(() => {
//         const fetchUserData = async () => {
//             if (userId) {
//                 try {
//                     const response = await fetch(`http://127.0.0.1:5000/user/${userId}`);
//                     if (!response.ok) {
//                         throw new Error('Network response was not ok');
//                     }
//                     const data = await response.json();
//                     setUserData(data); // Store user data
//                 } catch (error) {
//                     console.error('Error fetching user data:', error);
//                 }
//             }
//         };

//         fetchUserData();
//     }, [userId]);

//     // Fetch all products (This happens once, when component mounts)
//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await fetch('http://127.0.0.1:5000/products');
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const data = await response.json();
//                 setProducts(data); // Store product data

//                 // Extract unique makeup parts
//                 const makeupPartsSet = new Set(data.map((product) => product.makeup_part));
//                 setMakeupParts([...makeupPartsSet]); // Set unique makeup parts
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             }
//         };

//         fetchProducts();
//     }, []); // Fetch products once when the component mounts

//     // Filter product categories based on the selected makeup part
//     useEffect(() => {
//         if (makeupPartInput) {
//             const filteredCategories = new Set(
//                 products
//                     .filter((product) => product.makeup_part === makeupPartInput)
//                     .map((product) => product.sub_category)
//             );
//             setProductCategories([...filteredCategories]); // Set product categories based on the selected makeup part
//             setProductCategory(''); // Reset the selected product category when makeup part changes
//         }
//     }, [makeupPartInput, products]);

//     // Fetch recommendations based on selected API
//     const fetchRecommendations = async () => {
//         if (!userData) {
//             setError('User data is not available');
//             return;
//         }

//         setLoading(true);
//         try {
//             // Construct the request URL based on selected API
//             const apiEndpoint = `http://127.0.0.1:5000/recommend/${selectedApi}`;
//             const response = await axios.get(apiEndpoint, {
//                 params: {
//                     makeup_part_input: makeupPartInput,
//                     product_category: productCategory,
//                     target_product_id: 10,  // Example product ID
//                     user_id: userId,
//                     skin_type: userData.skintype,
//                     skin_tone: userData.skintone,
//                     under_tone: userData.undertone,
//                     user_description: userDescription,
//                     top_n: topN,
//                 },
//             });

//             // Store recommendations based on the selected API
//             setRecommendedProducts(response.data.recommendations);
//             setRecommendationFetched(true);  // Set recommendationFetched to true
//             setLoading(false);
//         } catch (err) {
//             console.error('Error fetching recommendations:', err);
//             setError('Error fetching recommendations');
//             setLoading(false);
//         }
//     };

//     // Reset recommendations only when the user explicitly clicks the button
//     const resetRecommendations = () => {
//         setRecommendedProducts([]); // Clear recommendations
//         setRecommendationFetched(false);  // Reset recommendationFetched
//     };

//     return (
//         <div>
//             <Header userId={userId} setUserId={setUserId} />
//             <h1>Product Recommendations</h1>

//             {/* Wait until user data is fetched before displaying the form */}
//             {userData ? (
//                 <div className="input-form">
//                     <label>
//                         Makeup Part:
//                         <select
//                             value={makeupPartInput}
//                             onChange={(e) => setMakeupPartInput(e.target.value)}
//                         >
//                             <option value="">Select Makeup Part</option>
//                             {makeupParts.map((part) => (
//                                 <option key={part} value={part}>
//                                     {part}
//                                 </option>
//                             ))}
//                         </select>
//                     </label>

//                     <label>
//                         Product Category:
//                         <select
//                             value={productCategory}
//                             onChange={(e) => setProductCategory(e.target.value)}
//                             disabled={!makeupPartInput} // Disable product category if no makeup part is selected
//                         >
//                             <option value="">Select Product Category</option>
//                             {productCategories.length === 0 ? (
//                                 <option disabled>No categories available</option>
//                             ) : (
//                                 productCategories.map((category) => (
//                                     <option key={category} value={category}>
//                                         {category}
//                                     </option>
//                                 ))
//                             )}
//                         </select>
//                     </label>

//                     <label>
//                         User Description:
//                         <input
//                             type="text"
//                             value={userDescription}
//                             onChange={(e) => setUserDescription(e.target.value)}
//                         />
//                     </label>

//                     <label>
//                         Top N Recommendations:
//                         <input
//                             type="number"
//                             value={topN}
//                             onChange={(e) => setTopN(parseInt(e.target.value, 10))}
//                         />
//                     </label>

//                     {/* Dropdown for selecting the API */}
//                     <label>
//                         Select Recommendation Method:
//                         <select
//                             value={selectedApi}
//                             onChange={(e) => setSelectedApi(e.target.value)}
//                         >
//                             <option value="tfidf">TF-IDF</option>
//                             <option value="svd">SVD</option>
//                             <option value="hybrid_tfidf">Hybrid TF-IDF</option>
//                             <option value="hybrid_word2vec">Hybrid Word2Vec</option>
//                         </select>
//                     </label>

//                     {/* Button container */}
//                     <div className="button-container">
//                         <button onClick={fetchRecommendations} disabled={loading}>
//                             {loading ? "Loading..." : "Get Recommendation"}
//                         </button>
//                         <button onClick={resetRecommendations} disabled={loading}>
//                             Reset Recommendations
//                         </button>
//                     </div>
//                 </div>
//             ) : (
//                 <p>Loading user data...</p>
//             )}

//             {/* Loading and error messages */}
//             {loading && <p>Loading recommendations...</p>}
//             {error && <p>{error}</p>}

//             {/* Display Recommendations Heading after fetching recommendations */}
//             {recommendationFetched && <h2 className="mt-4">Recommendations</h2>}

//             {/* Display recommendations */}
//             <div className="product-grid">
//                 {recommendedProducts.length > 0 ? (
//                     recommendedProducts.map((recommendedProduct) => {
//                         const product = products.find((p) => p.product_id === recommendedProduct.product_id);
//                         return (
//                             product ? (
//                                 <ProductCardRec
//                                     key={product.product_id}
//                                     product_id={product.product_id}
//                                     image={product.image_url}
//                                     name={product.product_name}
//                                     brand={product.brand_name}
//                                     shade={product.shade_name}
//                                     price={product.price}
//                                     stars={recommendedProduct.stars}
//                                 />
//                             ) : (
//                                 <p key={recommendedProduct.product_id}>Product not found</p>
//                             )
//                         );
//                     })
//                 ) : (
//                     <p>No recommendations available. Please try again.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ProductRecommendations;


// ini aman
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ProductInputForm from './ProductInputForm';
// import ProductRecommendationsDisplay from './ProductRecommendationsDisplay';
// import RecommendationSource from './RecommendationSource';
// import Header from './Header';

// const ProductRecommendations = ({ userId, setUserId }) => {
//     const [products, setProducts] = useState([]);
//     const [makeupParts, setMakeupParts] = useState([]);
//     const [productCategories, setProductCategories] = useState([]);
//     const [userData, setUserData] = useState(null);
//     const [recommendedProducts, setRecommendedProducts] = useState([]);
//     const [selectedApi, setSelectedApi] = useState({ api: '', weightConfig: null });


//     useEffect(() => {
//         const fetchUserData = async () => {
//             if (userId) {
//                 try {
//                     const response = await fetch(`http://127.0.0.1:5000/user/${userId}`);
//                     const data = await response.json();
//                     setUserData(data);
//                 } catch (error) {
//                     console.error('Error fetching user data:', error);
//                 }
//             }
//         };
//         fetchUserData();
//     }, [userId]);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await fetch('http://127.0.0.1:5000/products');
//                 const data = await response.json();
//                 setProducts(data);

//                 const makeupPartsSet = new Set(data.map((product) => product.makeup_part));
//                 setMakeupParts([...makeupPartsSet]);
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             }
//         };
//         fetchProducts();
//     }, []);

//     const handleMakeupPartChange = (makeupPartInput) => {
//         const filteredCategories = new Set(
//             products
//                 .filter((product) => product.makeup_part === makeupPartInput)
//                 .map((product) => product.sub_category)
//         );
//         setProductCategories([...filteredCategories]);
//     };

//     const fetchRecommendations = async (params) => {
//     try {
//         const weightConfigs = [
//             { cbfWeight: 0, cfWeight: 1 },
//             { cbfWeight: 1 / 5, cfWeight: 4 / 5 },
//             { cbfWeight: 1 / 3, cfWeight: 2 / 3 },
//             { cbfWeight: 1, cfWeight: 1 },
//             { cbfWeight: 2 / 3, cfWeight: 1 / 3 },
//             { cbfWeight: 4 / 5, cfWeight: 1 / 5 },
//             { cbfWeight: 1, cfWeight: 0 },
//         ];

//         const apiName = 'hybrid_kombinasi_75'; // Nama API yang sedang digunakan

//         const recommendations = await Promise.all(
//             weightConfigs.map(async (config) => {
//                 const apiEndpoint = `http://127.0.0.1:5000/recommend/${apiName}`;
//                 const response = await axios.get(apiEndpoint, {
//                     params: {
//                         makeup_part_input: params.makeupPartInput,
//                         product_category: params.productCategory,
//                         target_product_id: 10,
//                         user_id: userId,
//                         skin_type: userData?.skintype,
//                         skin_tone: userData?.skintone,
//                         under_tone: userData?.undertone,
//                         user_description: params.userDescription,
//                         top_n: params.topN,
//                         cbf_weight: config.cbfWeight,
//                         cf_weight: config.cfWeight,
//                     },
//                 });

//                 const mergedRecommendations = response.data.recommendations.map((recommendation) => {
//                     const productDetails = products.find((product) => product.product_id === recommendation.product_id);
//                     return {
//                         ...recommendation,
//                         ...productDetails,
//                         api: apiName,
//                         cbfWeight: config.cbfWeight,
//                         cfWeight: config.cfWeight,
//                     };
//                 });

//                 // Log untuk setiap konfigurasi bobot
//                 console.log(`Recommendations for cbfWeight: ${config.cbfWeight}, cfWeight: ${config.cfWeight}`);
//                 console.table(mergedRecommendations);

//                 return mergedRecommendations;
//             })
//         );

//         const allRecommendations = recommendations.flat();

//         // Set semua rekomendasi dan update API/bobot yang digunakan
//         setRecommendedProducts(allRecommendations);

//         // Pilih konfigurasi terakhir sebagai yang digunakan
//         const lastConfig = weightConfigs[weightConfigs.length - 1];
//         setSelectedApi({
//             api: apiName,
//             weightConfig: lastConfig,
//         });

//         // Simpan di localStorage
//         localStorage.setItem('recommendedProducts', JSON.stringify(allRecommendations));
//     } catch (error) {
//         console.error('Error fetching recommendations:', error);
//     }
// };

// const handleReset = () => {
//         setRecommendedProducts([]);
//         localStorage.removeItem('recommendedProducts');
//     };

//     return (
//         <div>
//             <Header userId={userId} setUserId={setUserId} />
//             <h1>Product Recommendations</h1>

//             {userData ? (
//                 <>
//                     <ProductInputForm
//                         onSubmit={fetchRecommendations}
//                         makeupParts={makeupParts}
//                         productCategories={productCategories}
//                         onMakeupPartChange={handleMakeupPartChange}
//                         onProductCategoryChange={() => {}}
//                     />
//                     {/* <RecommendationSource
//                         api={selectedApi.api}
//                         weightConfig={selectedApi.weightConfig}
//                     /> */}

//                     <ProductRecommendationsDisplay
//                         recommendedProducts={recommendedProducts}
//                         onReset={handleReset}
//                     />
//                 </>
//             ) : (
//                 <p>Loading user data...</p>
//             )}
//         </div>
//     );
// };

// export default ProductRecommendations;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductInputForm from './ProductInputForm';
import ProductRecommendationsDisplay from './ProductRecommendationsDisplay';
import RecommendationSource from './RecommendationSource';
import Header from './Header';

const ProductRecommendations = ({ userId, setUserId }) => {
    const [products, setProducts] = useState([]);
    const [makeupParts, setMakeupParts] = useState([]);
    const [productCategories, setProductCategories] = useState([]);
    const [userData, setUserData] = useState(null);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [selectedApi, setSelectedApi] = useState({ api: '', weightConfig: null });
    const [loading, setLoading] = useState(false);  // Added loading state

    useEffect(() => {
        const fetchUserData = async () => {
            if (userId) {
                try {
                    const response = await fetch(`http://127.0.0.1:5000/user/${userId}`);
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
                const response = await fetch('http://127.0.0.1:5000/products');
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
                .map((product) => product.sub_category)
        );
        setProductCategories([...filteredCategories]);
    };

    const fetchRecommendations = async (params) => {
        setLoading(true);  // Start loading

        try {
            const weightConfigs = [
                { cbfWeight: 0, cfWeight: 1 },
                { cbfWeight: 1 / 5, cfWeight: 4 / 5 },
                { cbfWeight: 1 / 3, cfWeight: 2 / 3 },
                { cbfWeight: 1/2, cfWeight: 1/2 },
                { cbfWeight: 2 / 3, cfWeight: 1 / 3 },
                { cbfWeight: 4 / 5, cfWeight: 1 / 5 },
                // { cbfWeight: 0.2, cfWeight: 0.9 },
                // { cbfWeight: 0.3, cfWeight: 0.7 },
                // { cbfWeight: 0.5, cfWeight: 0.5 },
                // { cbfWeight: 0.7, cfWeight: 0.3 },
                // { cbfWeight: 0.9, cfWeight: 0.1 },

                { cbfWeight: 1, cfWeight: 0 },
            ];

            //const apiName = 'hybrid_kombinasi_75'; // Nama API yang sedang digunakan
             const apiName = 'hybrid_tfidf'; // Nama API yang sedang digunakan

            const recommendations = await Promise.all(
                weightConfigs.map(async (config) => {
                    const apiEndpoint = `http://127.0.0.1:5000/recommend/${apiName}`;
                    const response = await axios.get(apiEndpoint, {
                        params: {
                            makeup_part_input: params.makeupPartInput,
                            product_category: params.productCategory,
                            target_product_id: 10,
                            user_id: userId,
                            skin_type: userData?.skintype,
                            skin_tone: userData?.skintone,
                            under_tone: userData?.undertone,
                            user_description: params.userDescription,
                            top_n: params.topN,
                            cbf_weight: config.cbfWeight,
                            cf_weight: config.cfWeight,
                        },
                    });

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

                    // Log untuk setiap konfigurasi bobot
                    console.log(`Recommendations for cbfWeight: ${config.cbfWeight}, cfWeight: ${config.cfWeight}`);
                    console.table(mergedRecommendations);

                    return mergedRecommendations;
                })
            );

            const allRecommendations = recommendations.flat();

            // Set semua rekomendasi dan update API/bobot yang digunakan
            setRecommendedProducts(allRecommendations);

            // Pilih konfigurasi terakhir sebagai yang digunakan
            const lastConfig = weightConfigs[weightConfigs.length - 1];
            setSelectedApi({
                api: apiName,
                weightConfig: lastConfig,
            });

            // Simpan di localStorage
            localStorage.setItem('recommendedProducts', JSON.stringify(allRecommendations));
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        } finally {
            setLoading(false);  // End loading
        }
    };

    const handleReset = () => {
        setRecommendedProducts([]);
        localStorage.removeItem('recommendedProducts');
    };

    return (
        <div>
            <Header userId={userId} setUserId={setUserId} />
            <h1>Product Recommendations</h1>

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
                        <p>Loading recommendations...</p>  // Display loading message
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
        </div>
    );
};

export default ProductRecommendations;
