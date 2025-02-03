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
    useEffect(() => {
    const storedRecommendations = JSON.parse(localStorage.getItem('recommendedProducts')) || [];
    console.log("Stored recommendations from localStorage:", storedRecommendations);
    setStoredRecommendations(storedRecommendations);
}, []);
   const serverIP = 'http://127.0.0.1:5000/'
    // `${serverIP}/products`

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
    localStorage.removeItem('orderData');
    
    // Verifikasi bahwa data sudah dihapus dari localStorage
    console.log("recommendedProducts in localStorage after reset:", localStorage.getItem('recommendedProducts'));
    console.log("userRecommendations in localStorage after reset:", localStorage.getItem('userRecommendations'));
    console.log("orderData in localStorage after reset:", localStorage.getItem('orderData'));

    // Reset state untuk rekomendasi yang disimpan dan rekomendasi pengguna
    setStoredRecommendations([]);
    setUserRecommendations([]);
    setOrderData({});
    
    // Verifikasi bahwa state sudah direset
    console.log("storedRecommendations state after reset:", storedRecommendations);
    console.log("userRecommendations state after reset:", userRecommendations);
    console.log("orderData state after reset:", orderData);

    // Panggil onReset jika perlu
    onReset();
};


const handleSaveAll = () => {
    const userId = localStorage.getItem('userId');
    console.log("Saving all recommendations for user:", userId);
    console.log("User recommendations:", userRecommendations);
    console.log("User scenario order:", orderData);  // Menampilkan data urutan skenario yang disimpan

    // Prepare the recommendations data for the first API
    const recommendationsArray = Object.keys(userRecommendations).map(scenario => ({
        scenario: parseInt(scenario),
        products: userRecommendations[scenario]
    }));

    const recommendationData = {
        user_id: userId,
        recommendations: recommendationsArray,
        timestamp: Date.now()  // Adding timestamp
    };

    // Save recommendations first
    fetch(`${serverIP}/save_recommendation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recommendationData),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('All recommendations saved:', data);

        // Now, prepare and save the scenario order to the second API (save_order)
        const orderDataToSave = {
            user_id: userId,
            order: orderData,  // Data urutan skenario yang sudah dipilih
            timestamp: Date.now()  // Adding timestamp for the order
        };

        // Save the scenario order data
        fetch(`${serverIP}/save_order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDataToSave),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Order saved:', data);
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

    // const handleOrderChange = (order) => {
    //     console.log("Order received from child:", order);  // Tampilkan di console
    //     setOrderData(order);  // Simpan ke state jika diperlukan
    // };

const handleOrderChange = (order) => {
    console.log("Order received from child:", order); 

    // Ambil hanya skenario yang sudah diisi (tidak kosong/null/undefined)
    const filledScenarios = Object.values(order).filter(scenario => scenario);

    // Cek duplikasi hanya untuk skenario yang sudah diisi
    const uniqueScenarios = new Set(filledScenarios);

    if (uniqueScenarios.size !== filledScenarios.length) {
        alert("Terdapat skenario yang duplikat. Pastikan setiap skenario memiliki isi yang berbeda.");
        return; // Hentikan proses jika ada duplikat
    }

    setOrderData(order);  // Simpan ke state hanya jika tidak ada duplikat
};


// const handleThumbsChange = (productId, thumbsUpStatus, thumbsDownStatus, scenarioNumber, order) => {
//     console.log(`handleThumbsChange called with productId: ${productId}, thumbsUpStatus: ${thumbsUpStatus}, thumbsDownStatus: ${thumbsDownStatus}, scenarioNumber: ${scenarioNumber}, order: ${order}`);
    
//     setUserRecommendations((prevRecommendations) => {
//         let updatedRecommendations = { ...prevRecommendations };
//         let productFound = false;

//         // Loop through all scenarios to find the product and update status
//         for (let scenario in updatedRecommendations) {
//             const updatedScenario = updatedRecommendations[scenario];
//             const existingProductIndex = updatedScenario.findIndex(item => item.product_id === productId);

//             if (existingProductIndex !== -1 && scenarioNumber === parseInt(scenario)) {
//                 // Update the thumbs status and order for the product in the current scenario only
//                 updatedScenario[existingProductIndex].revOrNot = thumbsUpStatus ? true : thumbsDownStatus ? false : updatedScenario[existingProductIndex].revOrNot;
//                 updatedScenario[existingProductIndex].order = order;
//                 console.log(`Updated Product ID ${productId} in scenario ${scenario}:`, updatedScenario[existingProductIndex]); // Debug log
//                 productFound = true;
//                 break; // Exit loop once product is found and updated
//             }
//         }

//         // If the product was not found in any scenario, add it to the current scenario
//         if (!productFound) {
//             const updatedScenario = updatedRecommendations[scenarioNumber] || [];
//             updatedScenario.push({
//                 product_id: productId,
//                 revOrNot: thumbsUpStatus ? true : thumbsDownStatus ? false : null,
//                 order: order,
//             });
//             updatedRecommendations[scenarioNumber] = updatedScenario;
//             console.log(`Added product ID ${productId} to scenario ${scenarioNumber}:`, updatedRecommendations[scenarioNumber]);
//         }

//         console.log(`Current recommendations after change:`, updatedRecommendations);
//         return updatedRecommendations;
//     });
// };

// const validateAllEvaluated = () => {
//     // Periksa apakah semua produk telah dievaluasi
//     for (let scenario in userRecommendations) {
//         const products = userRecommendations[scenario];

//         // Periksa apakah ada produk yang belum dievaluasi dalam skenario ini
//         for (let product of products) {
//             if (product.revOrNot === null || product.revOrNot === undefined) {
//                 console.log(`Product ID ${product.product_id} in scenario ${scenario} is not evaluated.`);
//                 return { valid: false, message: "Please evaluate all products before saving." };
//             }
//              // Validasi order (harus antara 1 dan 5)
//             if (product.order > 0) {
//                 return { valid: false, message: `Product in scenario ${scenario} has an invalid order. Order must be between 1 and 5.` };
//             }
//         }
//     }

//     // Periksa apakah orderData berisi 7 skenario yang valid
//     const requiredOrderDataKeys = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh'];
//     for (let key of requiredOrderDataKeys) {
//         if (!orderData[key]) {
//             console.log(`Order entry "${key}" is not filled.`);
//             return { valid: false, message: "Please fill in all scenario orders before saving." };
//         }
//     }

//     // Jika semua validasi lolos
//     return { valid: true };
// };


// const handleSaveAll = () => {
//     const validationResult = validateAllEvaluated();
//     if (!validationResult.valid) {
//         alert(validationResult.message);  // Menampilkan pesan kesalahan
//         return;
//     }

//     const userId = localStorage.getItem('userId');
//     console.log("Saving all recommendations for user:", userId);
//     console.log("User recommendations:", userRecommendations);
//     console.log("User scenario order:", orderData);

//     const recommendationsArray = Object.keys(userRecommendations).map(scenario => ({
//         scenario: parseInt(scenario),
//         products: userRecommendations[scenario],
//     }));

//     const recommendationData = {
//         user_id: userId,
//         recommendations: recommendationsArray,
//         timestamp: Date.now(),
//     };

//     fetch(`${serverIP}/save_recommendation`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(recommendationData),
//     })
//     .then((response) => response.json())
//     .then((data) => {
//         console.log('All recommendations saved:', data);

//         const orderDataToSave = {
//             user_id: userId,
//             order: orderData,
//             timestamp: Date.now(),
//         };

//         fetch(`${serverIP}/save_order`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(orderDataToSave),
//         })
//         .then((response) => response.json())
//         .then((data) => {
//             console.log('Order saved:', data);
//             handleReset();  // Reset data setelah disimpan
//         })
//         .catch((error) => {
//             console.error('Error saving order:', error);
//         });
//     })
//     .catch((error) => {
//         console.error('Error saving all recommendations:', error);
//     });
// };


// const handleThumbsChange = (productId, thumbsUpStatus, thumbsDownStatus, scenarioNumber, order) => {
//     console.log(`handleThumbsChange called with productId: ${productId}, thumbsUpStatus: ${thumbsUpStatus}, thumbsDownStatus: ${thumbsDownStatus}, scenarioNumber: ${scenarioNumber}, order: ${order}`);


//     setUserRecommendations((prevRecommendations) => {
//         let updatedRecommendations = { ...prevRecommendations };
//         const currentScenario = updatedRecommendations[scenarioNumber] || [];

//         // Cek apakah ada order yang sama di skenario ini
//         const isOrderDuplicate = currentScenario.some(item => item.order === order && item.product_id !== productId);
//         if (isOrderDuplicate) {
//             alert(`Order ${order} sudah digunakan di skenario ${scenarioNumber}. Silakan pilih order yang berbeda.`);
//             return prevRecommendations; // Batalkan perubahan jika duplikat
//         }

//         let productFound = false;

//         // Update data jika produk sudah ada
//         const existingProductIndex = currentScenario.findIndex(item => item.product_id === productId);
//         if (existingProductIndex !== -1) {
//             currentScenario[existingProductIndex].revOrNot = thumbsUpStatus ? true : thumbsDownStatus ? false : currentScenario[existingProductIndex].revOrNot;
//             currentScenario[existingProductIndex].order = order;
//             console.log(`Updated Product ID ${productId} in scenario ${scenarioNumber}:`, currentScenario[existingProductIndex]);
//             productFound = true;
//         }

//         // Tambahkan produk baru jika belum ada di skenario
//         if (!productFound) {
//             currentScenario.push({
//                 product_id: productId,
//                 revOrNot: thumbsUpStatus ? true : thumbsDownStatus ? false : null,
//                 order: order,
//             });
//         }

//         updatedRecommendations[scenarioNumber] = currentScenario;

//         console.log(`Current recommendations after change:`, updatedRecommendations);
//         return updatedRecommendations;
//     });
// };

// const handleThumbsChange = (productId, thumbsUpStatus, thumbsDownStatus, scenarioNumber, order, resetOrderCallback) => {
//     console.log(`handleThumbsChange called with productId: ${productId}, thumbsUpStatus: ${thumbsUpStatus}, thumbsDownStatus: ${thumbsDownStatus}, scenarioNumber: ${scenarioNumber}, order: ${order}`);

//     setUserRecommendations((prevRecommendations) => {
//         let updatedRecommendations = { ...prevRecommendations };
//         const currentScenario = updatedRecommendations[scenarioNumber] || [];

//         // Cek apakah ada order yang sama di skenario ini
//         const isOrderDuplicate = currentScenario.some(item => item.order === order && item.product_id !== productId);
//         if (isOrderDuplicate) {
//             alert(`Order ${order} sudah digunakan di skenario ${scenarioNumber}. Silakan pilih order yang berbeda.`);
            
//             // Reset order ke nilai awal
//             if (resetOrderCallback) {
//                 resetOrderCallback(productId);
//             }
//             return prevRecommendations; // Batalkan perubahan jika duplikat
//         }

//         let productFound = false;

//         // Update data jika produk sudah ada
//         const existingProductIndex = currentScenario.findIndex(item => item.product_id === productId);
//         if (existingProductIndex !== -1) {
//             currentScenario[existingProductIndex].revOrNot = thumbsUpStatus ? true : thumbsDownStatus ? false : currentScenario[existingProductIndex].revOrNot;
//             currentScenario[existingProductIndex].order = order;
//             console.log(`Updated Product ID ${productId} in scenario ${scenarioNumber}:`, currentScenario[existingProductIndex]);
//             productFound = true;
//         }

//         // Tambahkan produk baru jika belum ada di skenario
//         if (!productFound) {
//             currentScenario.push({
//                 product_id: productId,
//                 revOrNot: thumbsUpStatus ? true : thumbsDownStatus ? false : null,
//                 order: order,
//             });
//         }

//         updatedRecommendations[scenarioNumber] = currentScenario;

//         console.log(`Current recommendations after change:`, updatedRecommendations);
//         return updatedRecommendations;
//     });
// };

const handleThumbsChange = (productId, thumbsUpStatus, thumbsDownStatus, scenarioNumber, order, resetOrderCallback) => {
    console.log(`handleThumbsChange called with productId: ${productId}, thumbsUpStatus: ${thumbsUpStatus}, thumbsDownStatus: ${thumbsDownStatus}, scenarioNumber: ${scenarioNumber}, order: ${order}`);

    setUserRecommendations((prevRecommendations) => {
        let updatedRecommendations = { ...prevRecommendations };
        const currentScenario = updatedRecommendations[scenarioNumber] || [];

        // Cek apakah ada order yang sama di skenario ini (abaikan order kosong)
        const isOrderDuplicate = order && currentScenario.some(item => item.order === order && item.product_id !== productId);
        if (isOrderDuplicate) {
            alert(`Order ${order} sudah digunakan di skenario ${scenarioNumber}. Silakan pilih order yang berbeda.`);
            
            // Reset order ke nilai awal
            if (resetOrderCallback) {
                resetOrderCallback(productId);
            }
            return prevRecommendations; // Batalkan perubahan jika duplikat
        }

        let productFound = false;

        // Update data jika produk sudah ada
        const existingProductIndex = currentScenario.findIndex(item => item.product_id === productId);
        if (existingProductIndex !== -1) {
            currentScenario[existingProductIndex].revOrNot = thumbsUpStatus ? true : thumbsDownStatus ? false : currentScenario[existingProductIndex].revOrNot;
            currentScenario[existingProductIndex].order = order;
            console.log(`Updated Product ID ${productId} in scenario ${scenarioNumber}:`, currentScenario[existingProductIndex]);
            productFound = true;
        }

        // Tambahkan produk baru jika belum ada di skenario
        if (!productFound) {
            currentScenario.push({
                product_id: productId,
                revOrNot: thumbsUpStatus ? true : thumbsDownStatus ? false : null,
                order: order,
            });
        }

        updatedRecommendations[scenarioNumber] = currentScenario;

        console.log(`Current recommendations after change:`, updatedRecommendations);
        return updatedRecommendations;
    });
};



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
//                                         // onThumbsChange={(thumbsUpStatus, thumbsDownStatus) => handleThumbsChange(product.product_id, thumbsUpStatus, thumbsDownStatus, index + 1)}
//                                         onThumbsChange={handleThumbsChange}
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
//  <ScenarioOrder onOrderChange={handleOrderChange} />
//     <button onClick={handleSaveAll}>Save All Recommendations</button>
//     <button onClick={handleReset}>Reset Recommendations</button>
// </div>

<div className="recommendation-sec">
<div>
    <h2>Here The Recommendations</h2>
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
                                        info={product.product_description}
                                        price={product.price}
                                        stars={product.stars}
                                        api={product.api}
                                        // onThumbsChange={(thumbsUpStatus, thumbsDownStatus) => handleThumbsChange(product.product_id, thumbsUpStatus, thumbsDownStatus, index + 1)}
                                        onThumbsChange={handleThumbsChange}
                                        scenarioNumber={index + 1}
                                    />
                                    {/* <p>
                                        Recommended by: {product.api} (cbfWeight: {product.cbfWeight}, cfWeight: {product.cfWeight})
                                    </p> */}
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

    {/* Buttons for saving and resetting recommendations, shown only if recommendations exist */}
    {storedRecommendations.length > 0 && (
        <>
        {/* Show order data (ScenarioOrder) only after recommendations are available */}
             <ScenarioOrder onOrderChange={handleOrderChange} />
          <div className="recommendation-sec-button">
  <button onClick={handleSaveAll}>Save All Evaluation</button>
  <button onClick={handleReset}>Reset Recommendations</button>
</div>

        </>
    )}
</div>
</div>

);


};

export default ProductRecommendationsDisplay;
