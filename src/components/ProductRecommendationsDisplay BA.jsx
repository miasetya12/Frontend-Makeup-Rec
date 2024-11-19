

// const ProductRecommendationsDisplay = ({ recommendedProducts, onReset }) => {
//     const [storedRecommendations, setStoredRecommendations] = useState([]);
//     const [userRecommendations, setUserRecommendations] = useState([]);

//     // Load stored recommendations from localStorage
//     useEffect(() => {
//         const recommendations = JSON.parse(localStorage.getItem('recommendations')) || [];
//         setStoredRecommendations(recommendations);
//     }, []);

//     useEffect(() => {
//         if (recommendedProducts.length > 0) {
//             localStorage.setItem('recommendations', JSON.stringify(recommendedProducts));
//             setStoredRecommendations(recommendedProducts);
//         }
//     }, [recommendedProducts]);

//     const handleReset = () => {
//         localStorage.removeItem('recommendations');
//         setStoredRecommendations([]);
//         setUserRecommendations([]); // Reset user recommendations when reset
//         onReset();
//     };

//     const handleSaveAll = () => {
//         const userId = localStorage.getItem('userId');
        
//         const recommendationData = {
//             user_id: userId,
//             recommendation: userRecommendations
//         };

//         fetch('http://localhost:5000/save_recommendation', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(recommendationData),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log('All recommendations saved:', data);
//                 handleReset(); // Reset recommendations setelah berhasil menyimpan
//             })
//             .catch((error) => {
//                 console.error('Error saving all recommendations:', error);
//             });
//     };

//     const handleThumbsChange = (productId, thumbsUpStatus, thumbsDownStatus) => {
//         // Update userRecommendations with thumbs up or down status for a product
//         setUserRecommendations((prevRecommendations) => {
//             const updatedRecommendations = prevRecommendations.filter(
//                 (item) => item.product_id !== productId // Remove previous entry for this product
//             );
//             updatedRecommendations.push({
//                 product_id: productId,
//                 revOrNot: thumbsUpStatus ? true : thumbsDownStatus ? false : null
//             });
//             return updatedRecommendations;
//         });
//     };

//     return (
//         <div>
//             <h2>Recommendations</h2>
//             <div className="product-grid">
//                 {storedRecommendations.length > 0 ? (
//                     storedRecommendations.map((product) => (
//                         <ProductCardRec
//                             key={product.product_id}
//                             product_id={product.product_id}
//                             image={product.image_url}
//                             name={product.product_name}
//                             brand={product.brand_name}
//                             shade={product.shade_name}
//                             price={product.price}
//                             stars={product.stars}
//                             onThumbsChange={handleThumbsChange} // Pass callback function to child
//                         />
//                     ))
//                 ) : (
//                     <p>No recommendations available. Please try again.</p>
//                 )}
//             </div>
//             <button onClick={handleSaveAll}>Save All Recommendations</button>
//             <button onClick={handleReset}>Reset Recommendations</button>
//         </div>
//     );
// };
// import React, { useState, useEffect } from 'react';
// import ProductCardRec from './ProductCardRec';
// const ProductRecommendationsDisplay = ({ recommendedProducts, onReset }) => {
//     const [storedRecommendations, setStoredRecommendations] = useState([]);

//     useEffect(() => {
//         const recommendations = JSON.parse(localStorage.getItem('recommendedProducts')) || [];
//         setStoredRecommendations(recommendations);
//     }, []);

//     useEffect(() => {
//         if (recommendedProducts.length > 0) {
//             localStorage.setItem('recommendedProducts', JSON.stringify(recommendedProducts));
//             setStoredRecommendations(recommendedProducts);
//         }
//     }, [recommendedProducts]);

//     const handleReset = () => {
//         localStorage.removeItem('recommendedProducts');
//         setStoredRecommendations([]);
//         onReset();
//     };

//     return (
//         <div>
//             <h2>Recommendations</h2>
//             <div className="product-grid">
//                 {storedRecommendations.length > 0 ? (
//                     storedRecommendations.map((product) => (
//                         <div key={product.product_id} className="product-card">
//                             <ProductCardRec
//                                 product_id={product.product_id}
//                                 image={product.image_url}
//                                 name={product.product_name}
//                                 brand={product.brand_name}
//                                 shade={product.shade_name}
//                                 price={product.price}
//                                 stars={product.stars}
//                                 api={product.api}  // Display the API source
//                             />
//                             <p>Recommended by: {product.api}</p>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No recommendations available. Please try again.</p>
//                 )}
//             </div>
//             <button onClick={handleReset}>Reset Recommendations</button>
//         </div>
//     );
// };

// export default ProductRecommendationsDisplay;

// okee
// import React, { useState, useEffect } from 'react';
// import ProductCardRec from './ProductCardRec';

// const ProductRecommendationsDisplay = ({ recommendedProducts, onReset }) => {
//     const [storedRecommendations, setStoredRecommendations] = useState([]);
//     const [userRecommendations, setUserRecommendations] = useState([]);

//     useEffect(() => {
//     const recommendations = JSON.parse(localStorage.getItem('recommendedProducts')) || [];
//     setStoredRecommendations(recommendations);

//     // Log all product_ids from stored recommendations
//     console.log("Stored product IDs:", recommendations.map((product) => product.product_id));
//     }, []);

//     // useEffect(() => {
//     //     if (recommendedProducts.length > 0) {
//     //         localStorage.setItem('recommendedProducts', JSON.stringify(recommendedProducts));
//     //         setStoredRecommendations(recommendedProducts);

//     //         // Log all product_ids from new recommendations
//     //         console.log("Newly added product IDs:", recommendedProducts.map((product) => product.product_id));
//     //     }
//     // }, [recommendedProducts]);
//     useEffect(() => {
//     const storedRecommendations = JSON.parse(localStorage.getItem('recommendedProducts')) || [];
//     setStoredRecommendations(storedRecommendations);

//     // Jika ada rekomendasi baru, gabungkan dengan yang lama
//     if (recommendedProducts.length > 0) {
//         const allRecommendations = [...storedRecommendations, ...recommendedProducts];
//         localStorage.setItem('recommendedProducts', JSON.stringify(allRecommendations));
//         setStoredRecommendations(allRecommendations);
//     }
// }, [recommendedProducts]);



//     const handleReset = () => {
//         localStorage.removeItem('recommendedProducts');
//         localStorage.removeItem('userRecommendations');
//         setStoredRecommendations([]);
//         onReset();
//     };

//         const handleSaveAll = () => {
//         const userId = localStorage.getItem('userId');
        

//         // Convert userRecommendations into the desired format
//         const recommendationsArray = Object.keys(userRecommendations).map(scenario => ({
//             scenario: parseInt(scenario),
//             products: userRecommendations[scenario]
//         }));

//         const recommendationData = {
//             user_id: userId,
//             recommendations: recommendationsArray
//         };

//         fetch('http://localhost:5000/save_recommendation', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(recommendationData),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log('All recommendations saved:', data);
//                 handleReset(); // Reset recommendations after successfully saving
//             })
//             .catch((error) => {
//                 console.error('Error saving all recommendations:', error);
//             });
        
//         localStorage.removeItem('recommendedProducts');
//         localStorage.removeItem('userRecommendations');
//         setStoredRecommendations([]);
//         onReset();
//     };
    

// //     const handleThumbsChange = (productId, thumbsUpStatus, thumbsDownStatus, scenarioNumber) => {
// //         // Update userRecommendations with thumbs up or down status for a product
// //         setUserRecommendations((prevRecommendations) => {
// //             const updatedScenario = prevRecommendations[scenarioNumber] || [];
// //             const updatedRecommendations = updatedScenario.filter(
// //                 (item) => item.product_id !== productId // Remove previous entry for this product
// //             );

// //             updatedRecommendations.push({
// //                 product_id: productId,
// //                 revOrNot: thumbsUpStatus ? true : thumbsDownStatus ? false : null
// //             });

// //             return {
// //                 ...prevRecommendations,
// //                 [scenarioNumber]: updatedRecommendations
// //             };
// //         });
// //   };

// const handleThumbsChange = (productId, thumbsUpStatus, thumbsDownStatus, scenarioNumber) => {
//     setUserRecommendations((prevRecommendations) => {
//         const updatedScenario = prevRecommendations[scenarioNumber] || [];
        
//         // Pastikan tidak menimpa produk yang sudah ada, cukup update status thumbs nya
//         const updatedRecommendations = updatedScenario.filter(item => item.product_id !== productId);
        
//         // Menambahkan produk dengan status thumbs up atau thumbs down
//         updatedRecommendations.push({
//             product_id: productId,
//             revOrNot: thumbsUpStatus ? true : thumbsDownStatus ? false : null
//         });
        
//         return {
//             ...prevRecommendations,
//             [scenarioNumber]: updatedRecommendations
//         };
//     });
// };

// return (
//         <div>
//             <h2>Recommendations</h2>
//             <div className="product-grid">
//                 {storedRecommendations.length > 0 ? (
//                     storedRecommendations.map((product, index) => {
//                         // Hitung nomor skenario (dimulai dari 1)
//                         const scenarioNumber = Math.floor(index / 5) + 1;

//                         return (
//                             <React.Fragment key={`${product.product_id}-${index}`}>
//                                 {/* Tampilkan judul skenario setiap 5 produk */}
//                                 {index % 5 === 0 && (
//                                     <h3>Recommendation Scenario {scenarioNumber}</h3>
//                                 )}

//                                 <div className="product-card">
//                                     <ProductCardRec
//                                         product_id={product.product_id}
//                                         image={product.image_url}
//                                         name={product.product_name}
//                                         brand={product.brand_name}
//                                         shade={product.shade_name}
//                                         price={product.price}
//                                         stars={product.stars}
//                                         api={product.api}
//                                         onThumbsChange={(thumbsUpStatus, thumbsDownStatus) => handleThumbsChange(product.product_id, thumbsUpStatus, thumbsDownStatus, scenarioNumber)} // Pass the callback
//                                         scenarioNumber={scenarioNumber} // Pass the scenario number
//                                     />

//                                     <p>
//                                         Recommended by: {product.api} (cbfWeight: {product.cbfWeight}, cfWeight: {product.cfWeight})
//                                     </p>
//                                 </div>
//                             </React.Fragment>
//                         );
//                     })
//                 ) : <p>No recommendations available. Please try again.</p>
// }
//             </div>
//             <button onClick={handleSaveAll}>Save All Recommendations</button>
//             <button onClick={handleReset}>Reset Recommendations</button>
//         </div>
//     );

// };

// export default ProductRecommendationsDisplay;

import React, { useState, useEffect } from 'react';
import ProductCardRec from './ProductCardRec';

const ProductRecommendationsDisplay = ({ recommendedProducts, onReset }) => {
    const [storedRecommendations, setStoredRecommendations] = useState([]);
    const [userRecommendations, setUserRecommendations] = useState([]);
    useEffect(() => {
    const storedRecommendations = JSON.parse(localStorage.getItem('recommendedProducts')) || [];
    console.log("Stored recommendations from localStorage:", storedRecommendations);
    setStoredRecommendations(storedRecommendations);
}, []);

useEffect(() => {
    if (recommendedProducts.length > 0) {
        // Simpan hanya recommendedProducts baru ke localStorage
        console.log("New recommendations added:", recommendedProducts);

        // Update localStorage dengan data baru, bukan menggabungkan
        localStorage.setItem('recommendedProducts', JSON.stringify(recommendedProducts));
        
        // Update state dengan data baru
        setStoredRecommendations(recommendedProducts);
    }
}, [recommendedProducts]);


const handleReset = () => {
    console.log("Resetting recommendations...");

    // Hapus data rekomendasi dari localStorage
    localStorage.removeItem('recommendedProducts');
    localStorage.removeItem('userRecommendations');
    
    // Verifikasi bahwa data sudah dihapus dari localStorage
    console.log("userRecommendations in localStorage after reset:", localStorage.getItem('userRecommendations'));

    // Reset state untuk rekomendasi yang disimpan dan rekomendasi pengguna
    setStoredRecommendations([]);
    setUserRecommendations({});
    
    console.log("All recommendations after reset:", storedRecommendations);
    onReset();
};

    const handleSaveAll = () => {
    const userId = localStorage.getItem('userId');
    console.log("Saving all recommendations for user:", userId);
    console.log("User recommendations:", userRecommendations);

    const recommendationsArray = Object.keys(userRecommendations).map(scenario => ({
        scenario: parseInt(scenario),
        products: userRecommendations[scenario]
    }));

    const recommendationData = {
        user_id: userId,
        recommendations: recommendationsArray
    };

    fetch('http://localhost:5000/save_recommendation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recommendationData),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('All recommendations saved:', data);
            handleReset();  // Reset after saving recommendations
        })
        .catch((error) => {
            console.error('Error saving all recommendations:', error);
        });

    // Hapus `userRecommendations` dari localStorage
    localStorage.removeItem('userRecommendations');

    // Reset state recommendations dan rekomendasi pengguna
    setStoredRecommendations([]);
    setUserRecommendations({});
    onReset();
};

    // const handleThumbsChange = (productId, thumbsUpStatus, thumbsDownStatus, scenarioNumber) => {
    //     setUserRecommendations((prevRecommendations) => {
    //         const updatedScenario = prevRecommendations[scenarioNumber] || [];

    //         const updatedRecommendations = updatedScenario.filter(item => item.product_id !== productId);

    //         updatedRecommendations.push({
    //             product_id: productId,
    //             revOrNot: thumbsUpStatus ? true : thumbsDownStatus ? false : null
    //         });

    //         console.log(`Updated recommendations for scenario ${scenarioNumber}:`, updatedRecommendations);

    //         return {
    //             ...prevRecommendations,
    //             [scenarioNumber]: updatedRecommendations
    //         };
    //     });
    // };

//     const handleThumbsChange = (productId, thumbsUpStatus, thumbsDownStatus, scenarioNumber) => {
//     console.log(`thumbsUpStatus: ${thumbsUpStatus}, thumbsDownStatus: ${thumbsDownStatus}`);
    
//     setUserRecommendations((prevRecommendations) => {
//         const updatedScenario = prevRecommendations[scenarioNumber] || [];

//         // Filter out the productId from the updated scenario
//         const updatedRecommendations = updatedScenario.filter(item => item.product_id !== productId);

//         let revOrNot = null;

//         // Set revOrNot based on the status
//         if (thumbsUpStatus) {
//             revOrNot = true;
//         } else if (thumbsDownStatus) {
//             revOrNot = false;
//         }

//         console.log(`revOrNot after logic: ${revOrNot}`);

//         updatedRecommendations.push({
//             product_id: productId,
//             revOrNot: revOrNot
//         });

//         console.log(`Updated recommendations for scenario ${scenarioNumber}:`, updatedRecommendations);

//         return {
//             ...prevRecommendations,
//             [scenarioNumber]: updatedRecommendations
//         };
//     });
// };



// const handleThumbsChange = (productId, thumbsUpStatus, thumbsDownStatus, scenarioNumber) => {
//     setUserRecommendations((prevRecommendations) => {
//         let updatedRecommendations = { ...prevRecommendations };
//         let productFound = false;

//         // Loop through all scenarios to find the product
//         for (let scenario in updatedRecommendations) {
//             const updatedScenario = updatedRecommendations[scenario];

//             // Check if the product already exists in this scenario
//             const existingProductIndex = updatedScenario.findIndex(item => item.product_id === productId);

//             if (existingProductIndex !== -1) {
//                 // If found, update the thumbs status
//                 updatedScenario[existingProductIndex].revOrNot = thumbsUpStatus ? true : thumbsDownStatus ? false : null;
//                 productFound = true;

//                 // Log the update
//                 console.log(`Updated product ID ${productId} in scenario ${scenario}:`, updatedScenario[existingProductIndex]);
//                 break; // Exit the loop as we found the product
//             }
//         }

//         // If the product was not found in any scenario, add it to the current scenario
//         if (!productFound) {
//             const updatedScenario = updatedRecommendations[scenarioNumber] || [];
//             updatedScenario.push({
//                 product_id: productId,
//                 revOrNot: thumbsUpStatus ? true : thumbsDownStatus ? false : null
//             });
//             updatedRecommendations[scenarioNumber] = updatedScenario;

//             // Log the addition of a new product
//             console.log(`Added product ID ${productId} to scenario ${scenarioNumber}:`, updatedRecommendations[scenarioNumber]);
//         }

//         console.log(`Current recommendations after change:`, updatedRecommendations);

//         return updatedRecommendations;
//     });
// };

// const handleThumbsChange = (productId, thumbsUpStatus, thumbsDownStatus, scenarioNumber) => {
//     console.log(`handleThumbsChange called with productId: ${productId}, thumbsUpStatus: ${thumbsUpStatus}, thumbsDownStatus: ${thumbsDownStatus}, scenarioNumber: ${scenarioNumber}`); // Debug log
//     setUserRecommendations((prevRecommendations) => {
//         let updatedRecommendations = { ...prevRecommendations };
//         let productFound = false;

//         for (let scenario in updatedRecommendations) {
//             const updatedScenario = updatedRecommendations[scenario];
//             const existingProductIndex = updatedScenario.findIndex(item => item.product_id === productId);

//             if (existingProductIndex !== -1) {
//                 // Update the thumbs status
//                 if (thumbsUpStatus) {
//                     updatedScenario[existingProductIndex].revOrNot = true; // Set to true for thumbs up
//                     console.log(`Product ID ${productId} in scenario ${scenario} set to thumbs up`); // Debug log
//                 } else if (thumbsDownStatus) {
//                     updatedScenario[existingProductIndex].revOrNot = false; // Set to false for thumbs down
//                     console.log(`Product ID ${productId} in scenario ${scenario} set to thumbs down`); // Debug log
//                 }
//                 productFound = true;
//                 break; // Exit the loop as we found the product
//             }
//         }

//         if (!productFound) {
//             const updatedScenario = updatedRecommendations[scenarioNumber] || [];
//             updatedScenario.push({
//                 product_id: productId,
//                 revOrNot: thumbsUpStatus ? true : thumbsDownStatus ? false : null
//             });
//             updatedRecommendations[scenarioNumber] = updatedScenario;
//             console.log(`Added product ID ${productId} to scenario ${scenarioNumber}:`, updatedRecommendations[scenarioNumber]); // Debug log
//         }

//         console.log(`Current recommendations after change:`, updatedRecommendations); // Debug log
//         return updatedRecommendations;
//     });
// };

const handleThumbsChange = (productId, thumbsUpStatus, thumbsDownStatus, scenarioNumber) => {
    console.log(`handleThumbsChange called with productId: ${productId}, thumbsUpStatus: ${thumbsUpStatus}, thumbsDownStatus: ${thumbsDownStatus}, scenarioNumber: ${scenarioNumber}`);
    
    setUserRecommendations((prevRecommendations) => {
        let updatedRecommendations = { ...prevRecommendations };
        let productFound = false;

        // Loop through all scenarios to find the product
        for (let scenario in updatedRecommendations) {
            const updatedScenario = updatedRecommendations[scenario];
            const existingProductIndex = updatedScenario.findIndex(item => item.product_id === productId);

            if (existingProductIndex !== -1) {
                // Update the thumbs status for all scenarios
                updatedScenario.forEach(item => {
                    if (item.product_id === productId) {
                        item.revOrNot = thumbsUpStatus ? true : thumbsDownStatus ? false : item.revOrNot;
                        console.log(`Updated Product ID ${productId} in scenario ${scenario}:`, item); // Debug log
                    }
                });
                productFound = true;
            }
        }

        // If the product was not found in any scenario, add it to the current scenario
        if (!productFound) {
            const updatedScenario = updatedRecommendations[scenarioNumber] || [];
            updatedScenario.push({
                product_id: productId,
                revOrNot: thumbsUpStatus ? true : thumbsDownStatus ? false : null
            });
            updatedRecommendations[scenarioNumber] = updatedScenario;
            console.log(`Added product ID ${productId} to scenario ${scenarioNumber}:`, updatedRecommendations[scenarioNumber]);
        }

        console.log(`Current recommendations after change:`, updatedRecommendations);
        return updatedRecommendations;
    });
};

// const handleThumbsChange = (productId, thumbsUpStatus, thumbsDownStatus, scenarioNumber) => {
//     setUserRecommendations((prevRecommendations) => {
//         let updatedRecommendations = { ...prevRecommendations };
//         let productFound = false;

//         // Loop through all scenarios to find the product
//         for (let scenario in updatedRecommendations) {
//             const updatedScenario = updatedRecommendations[scenario];

//             // Check if the product already exists in this scenario
//             const existingProductIndex = updatedScenario.findIndex(item => item.product_id === productId);

//             if (existingProductIndex !== -1) {
//                 // If found, update the thumbs status for this product across all scenarios
//                 updatedScenario[existingProductIndex].revOrNot = thumbsUpStatus ? true : thumbsDownStatus ? false : null;
//                 productFound = true;

//                 // Log the update for this scenario
//                 console.log(`Updated product ID ${productId} in scenario ${scenario}:`, updatedScenario[existingProductIndex]);
//             }
//         }

//         // If the product was not found in any scenario, add it to the current scenario
//         if (!productFound) {
//             const updatedScenario = updatedRecommendations[scenarioNumber] || [];
//             updatedScenario.push({
//                 product_id: productId,
//                 revOrNot: thumbsUpStatus ? true : thumbsDownStatus ? false : null
//             });
//             updatedRecommendations[scenarioNumber] = updatedScenario;

//             // Log the addition of a new product
//             console.log(`Added product ID ${productId} to scenario ${scenarioNumber}:`, updatedRecommendations[scenarioNumber]);
//         }

//         // Update thumbs status for the product in all scenarios
//         for (let scenario in updatedRecommendations) {
//             const updatedScenario = updatedRecommendations[scenario];
//             const existingProductIndex = updatedScenario.findIndex(item => item.product_id === productId);

//             if (existingProductIndex !== -1) {
//                 updatedScenario[existingProductIndex].revOrNot = thumbsUpStatus ? true : thumbsDownStatus ? false : null;
//                 console.log(`Updated product ID ${productId} in all scenarios to:`, updatedScenario[existingProductIndex]);
//             }
//         }

//         console.log(`Current recommendations after change:`, updatedRecommendations);

//         return updatedRecommendations;
//     });
// };

return (

// <div>
//     <h2>Recommendations</h2>
//     {/* Loop untuk menampilkan rekomendasi */}
//     {storedRecommendations.length > 0 ? (
//         // Loop melalui produk dan tampilkan per 5 produk
//         Array.from({ length: Math.ceil(storedRecommendations.length / 5) }).map((_, index) => {
//             const start = index * 5;
//             const end = start + 5;
//             const productsInScenario = storedRecommendations.slice(start, end);

//             return (
//                 <div key={`scenario-${index}`}>
//                     {/* Tampilkan judul skenario di atas setiap 5 produk */}
//                     <div className="scenario-title">
//                         <h3>Recommendation Scenario {index + 1}</h3>
//                     </div>

//                     {/* Grid untuk produk */}
//                     <div className="product-grid-container">
//                         {productsInScenario.map((product, idx) => (
//                             <div key={`${product.product_id}-${start + idx}`} className="product-card-wrapper">
//                                 <div className="product-card">
//                                     <ProductCardRec
//                                         product_id={product.product_id}
//                                         image={product.image_url}
//                                         name={product.product_name}
//                                         brand={product.brand_name}
//                                         shade={product.shade_name}
//                                         price={product.price}
//                                         stars={product.stars}
//                                         api={product.api}
//                                         onThumbsChange={(thumbsUpStatus, thumbsDownStatus) => handleThumbsChange(product.product_id, thumbsUpStatus, thumbsDownStatus, index + 1)}
//                                         scenarioNumber={index + 1}
//                                     />
//                                     <p>
//                                         Recommended by: {product.api} (cbfWeight: {product.cbfWeight}, cfWeight: {product.cfWeight})
//                                     </p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             );
//         })
//     ) : (
//         <p>No recommendations available. Please try again.</p>
//     )}
//     <button onClick={handleSaveAll}>Save All Recommendations</button>
//     <button onClick={handleReset}>Reset Recommendations</button>
// </div>

<div>
    <h2>Recommendations</h2>
    {/* Loop untuk menampilkan rekomendasi */}
    {storedRecommendations.length > 0 ? (
        // Loop melalui produk dan tampilkan per 5 produk
        Array.from({ length: Math.ceil(storedRecommendations.length / 5) }).map((_, index) => {
            const start = index * 5;
            const end = start + 5;
            const productsInScenario = storedRecommendations.slice(start, end);

            return (
                <div key={`scenario-${index}`}>
                    {/* Tampilkan judul skenario di atas setiap 5 produk */}
                    <div className="scenario-title">
                        <h3>Recommendation Scenario {index + 1}</h3>
                    </div>

                    {/* Grid untuk produk */}
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
                                        // onThumbsChange={(thumbsUpStatus, thumbsDownStatus) => handleThumbsChange(product.product_id, thumbsUpStatus, thumbsDownStatus, index + 1)}
                                        onThumbsChange={handleThumbsChange}
                                        scenarioNumber={index + 1}
                                    />
                                    <p>
                                        Recommended by: {product.api} (cbfWeight: {product.cbfWeight}, cfWeight: {product.cfWeight})
                                    </p>
                                    
                                    {/* Dropdown untuk memilih rating angka 1-5 */}
                                    <div>
                                        <label htmlFor={`rating-${product.product_id}`}>Order this product: </label>
                                        <select
                                            id={`rating-${product.product_id}`}
                                            onChange={(e) => handleRatingChange(e, product.product_id)}
                                        >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
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
    <button onClick={handleSaveAll}>Save All Recommendations</button>
    <button onClick={handleReset}>Reset Recommendations</button>
</div>


);

// return (
//     <div>
//         <h2>Recommendations</h2>
//         {/* Loop untuk menampilkan rekomendasi */}
//         {storedRecommendations.length > 0 ? (
//             storedRecommendations.map((product, index) => {
//                 const scenarioNumber = Math.floor(index / 5) + 1;

//                 return (
//                     <React.Fragment key={`${product.product_id}-${index}`}>
//                         {/* Tampilkan judul skenario di luar .product-grid */}
//                         {index % 5 === 0 && (
//                             <div className="scenario-title">
//                                 <h3>Recommendation Scenario {scenarioNumber}</h3>
//                             </div>
//                         )}

//                         {/* Letakkan produk dalam grid */}
//                         <div className="product-card">
//                             <ProductCardRec
//                                 product_id={product.product_id}
//                                 image={product.image_url}
//                                 name={product.product_name}
//                                 brand={product.brand_name}
//                                 shade={product.shade_name}
//                                 price={product.price}
//                                 stars={product.stars}
//                                 api={product.api}
//                                 onThumbsChange={(thumbsUpStatus, thumbsDownStatus) => handleThumbsChange(product.product_id, thumbsUpStatus, thumbsDownStatus, scenarioNumber)}
//                                 scenarioNumber={scenarioNumber}
//                             />
//                             <p>
//                                 Recommended by: {product.api} (cbfWeight: {product.cbfWeight}, cfWeight: {product.cfWeight})
//                             </p>
//                         </div>
//                     </React.Fragment>
//                 );
//             })
//         ) : (
//             <p>No recommendations available. Please try again.</p>
//         )}
//         <button onClick={handleSaveAll}>Save All Recommendations</button>
//         <button onClick={handleReset}>Reset Recommendations</button>
//     </div>
// );



};

export default ProductRecommendationsDisplay;
