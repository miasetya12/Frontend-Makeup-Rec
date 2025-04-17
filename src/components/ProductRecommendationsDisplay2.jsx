
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';  // Import SweetAlert2
import ProductCardRec2 from './ProductCardRec2';
import ScenarioOrder from './ScenarioOrder';

const ProductRecommendationsDisplay2 = ({ recommendedProducts_2, onReset }) => {
    const [storedRecommendations, setStoredRecommendations] = useState([]);
    const [userRecommendations, setUserRecommendations] = useState([]);
    const [evaluationResults, setEvaluationResults] = useState(null);
    const [showScenarioOrder, setShowScenarioOrder] = useState(false);
    const [orderValues, setOrderValues] = useState({});

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
        const storedRecommendations = JSON.parse(localStorage.getItem('recommendedProducts_2')) || [];
        console.log("Stored recommendations from localStorage:", storedRecommendations);
        setStoredRecommendations(storedRecommendations);
    }, []);

   const serverIP = 'http://127.0.0.1:5000/'
        // const serverIP = 'https://clownfish-app-73v5y.ondigitalocean.app/';

    useEffect(() => {
        if (recommendedProducts_2.length > 0) {
            console.log("New recommendations added:", recommendedProducts_2);
            localStorage.setItem('recommendedProducts_2', JSON.stringify(recommendedProducts_2));
            setStoredRecommendations(recommendedProducts_2);
        }
    }, [recommendedProducts_2]);

    const handleReset = () => {
    console.log("Resetting recommendations...");

    // Hapus data rekomendasi dari localStorage
    localStorage.removeItem('recommendedProducts_2');
    localStorage.removeItem('userRecommendations');
    localStorage.removeItem('orderData');
    localStorage.removeItem('evaluationResults');
    
    
    // Verifikasi bahwa data sudah dihapus dari localStorage
    console.log("recommendedProducts_2 in localStorage after reset:", localStorage.getItem('recommendedProducts_2'));
    console.log("userRecommendations in localStorage after reset:", localStorage.getItem('userRecommendations'));
    console.log("orderData in localStorage after reset:", localStorage.getItem('orderData'));

    // Reset state untuk rekomendasi yang disimpan dan rekomendasi pengguna
    setStoredRecommendations([]);
    setUserRecommendations([]);
    setOrderData({});
    setEvaluationResults({})
    
    // Verifikasi bahwa state sudah direset
    console.log("storedRecommendations state after reset:", storedRecommendations);
    console.log("userRecommendations state after reset:", userRecommendations);
    console.log("orderData state after reset:", orderData);

    // Panggil onReset jika perlu
    onReset();

    // Show success alert after reset
    Swal.fire({
        title: 'Success!',
        text: 'Recommendations have been successfully reset.',
        icon: 'success',
        confirmButtonText: 'OK',
                    customClass: {
        popup: 'custom-swal',
    },
    });
};

const resetOrderCallback = (productId) => {
    setUserRecommendations((prevRecommendations) => {
        let updatedRecommendations = { ...prevRecommendations };
        updatedRecommendations[scenarioNumber] = updatedRecommendations[scenarioNumber].map((item) => 
            item.product_id === productId ? { ...item, order: 0 } : item
        );
        return updatedRecommendations;
    });

    setSelectedOrders((prevOrders) => ({
        ...prevOrders,
        [productId]: 0, // Reset dropdown ke "Order"
    }));
};


const handleSaveAll = () => {
    const userId = localStorage.getItem('userId');
    console.log("Saving all recommendations for user:", userId);
    console.log("User recommendations:", userRecommendations);
    console.log("User scenario order:", orderData);

    const requiredFields = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh"];

    // Filter hanya yang sudah terisi (bukan default)
    const filledValues = Object.values(orderData).filter(val => val !== "Select Scenario 1-7" && val !== null);
    const uniqueValues = new Set(filledValues);

    const duplicateFields = [];
    if (uniqueValues.size < filledValues.length) {
        // Ada duplikat, cari field yang bermasalah dan reset
        requiredFields.forEach(field => {
            if (filledValues.includes(orderData[field]) && filledValues.filter(val => val === orderData[field]).length > 1) {
                orderData[field] = "Select Scenario 1-7";
                duplicateFields.push(field);
            }
        });
    }

    // Cek apakah ada field yang masih di default
    const missingFields = requiredFields.filter(field => orderData[field] === "Select Scenario 1-7");

    if (missingFields.length > 0) {
    Swal.fire({
        title: "Peringatan!",
        text: `Pastikan semua urutan sudah terisi dengan unik! Masih ada yang perlu diperbaiki: ${missingFields.join(", ")}`,
        icon: "warning",
        confirmButtonText: "OK",
        popup: 'custom-swal',
    });
    return;
}

    const recommendationsArray = Object.keys(userRecommendations).map(scenario => ({
        scenario: parseInt(scenario),
        products: userRecommendations[scenario]
    }));

    const recommendationData = {
        user_id: userId,
        recommendations: recommendationsArray,
        timestamp: Date.now()
    };

    fetch(`${serverIP}/save_recommendation_2`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
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

        fetch(`${serverIP}/save_order_2`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDataToSave),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Order saved:', data);

            Swal.fire({
                title: 'Success!',
                text: 'All recommendations and order have been successfully saved.',
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: { popup: 'custom-swal' },
            });

            handleReset();
        })
        .catch((error) => {
            console.error('Error saving order:', error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an error saving the order.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });

    })
    .catch((error) => {
        console.error('Error saving all recommendations:', error);
        Swal.fire({
            title: 'Error!',
            text: 'There was an error saving the recommendations.',
            icon: 'error',
            confirmButtonText: 'OK',
            customClass: { popup: 'custom-swal' },
        });
    });
};




    const handleOrderChange = (order) => {
        console.log("Order received from child:", order);

        // const filledScenarios = Object.values(order).filter(scenario => scenario);
        // const uniqueScenarios = new Set(filledScenarios);


        const filledScenarios = Object.values(order).filter(scenario => scenario && scenario !== "Select Scenario 1-7");
        const uniqueScenarios = new Set(filledScenarios);

        if (uniqueScenarios.size !== filledScenarios.length) {
            Swal.fire({
                title: 'Duplicate Scenario Detected!',
                text: 'Please ensure each scenario has a unique value.',
                icon: 'warning',
                confirmButtonText: 'OK',
                            customClass: {
        popup: 'custom-swal',
    },
            });
            return;
        }

        setOrderData(order);  
    };

    const handleThumbsChange = (productId, thumbsUpStatus, thumbsDownStatus, scenarioNumber, order, resetOrderCallback) => {
        console.log(`handleThumbsChange called with productId: ${productId}, thumbsUpStatus: ${thumbsUpStatus}, thumbsDownStatus: ${thumbsDownStatus}, scenarioNumber: ${scenarioNumber}, order: ${order}`);

        setUserRecommendations((prevRecommendations) => {
            let updatedRecommendations = { ...prevRecommendations };
            const currentScenario = updatedRecommendations[scenarioNumber] || [];

            const isOrderDuplicate = order && currentScenario.some(item => item.order === order && item.product_id !== productId);
            if (isOrderDuplicate) {
                Swal.fire({
                    title: 'Duplicate Order Detected!',
                    text: `Order ${order} is already used in scenario ${scenarioNumber}. Please choose a different order.`,
                    icon: 'error',
                    confirmButtonText: 'OK',
                                customClass: {
        popup: 'custom-swal',
    },
                });

                if (resetOrderCallback) {
                    resetOrderCallback(productId);
                }
                return prevRecommendations;
            }

            let productFound = false;

            const existingProductIndex = currentScenario.findIndex(item => item.product_id === productId);
            if (existingProductIndex !== -1) {
                currentScenario[existingProductIndex].revOrNot = thumbsUpStatus ? true : thumbsDownStatus ? false : currentScenario[existingProductIndex].revOrNot;
                currentScenario[existingProductIndex].order = order;
                console.log(`Updated Product ID ${productId} in scenario ${scenarioNumber}:`, currentScenario[existingProductIndex]);
                productFound = true;
            }

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


const handleEvaluate = () => {
    setEvaluationResults([]); // Reset hasil evaluasi sebelum mengambil data baru
    setShowScenarioOrder(false);
    const userId = localStorage.getItem('userId');

    const recommendationsArray = Object.keys(userRecommendations).map(scenario => ({
        scenario: parseInt(scenario),
        products: userRecommendations[scenario]
    }));

    const recommendationData = {
        user_id: userId,
        recommendations: recommendationsArray,
        timestamp: Date.now()
    };

    // Pastikan ada 7 skenario
    if (Object.keys(userRecommendations).length !== 7) {
        Swal.fire({
            title: "Warning!",
            text: "Pastikan seluruh skenario sudah dievaluasi.",
            icon: "warning",
            confirmButtonText: "OK",
            popup: 'custom-swal',
        });
        return;
    }

    // Validasi isi tiap skenario
    for (const key in userRecommendations) {
        const items = userRecommendations[key];

        // Pastikan setiap baris memiliki 5 item
        if (items.length !== 5) {
            Swal.fire({
                title: "Warning!",
                text: `Skenario ${key} belum mengevaluasi 5 item atau ada Order yang duplikat!`,
                icon: "warning",
                confirmButtonText: "OK",
                popup: 'custom-swal',
            });
            return;
        }

        // Pastikan tidak ada yang null dan order tidak 0
        for (const item of items) {
            if (item.revOrNot === null || item.order === 0) {
                Swal.fire({
                    title: "Warning!",
                    text: `Pastikan semua item di skenario ${key} sudah dievaluasi atau ada Order yang duplikat!`,
                    icon: "warning",
                    confirmButtonText: "OK",
                    popup: 'custom-swal',
                });
                return;
            }
        }
    }

    // Panggil API untuk evaluasi
    console.log("Sending data for evaluation:", recommendationData);
    setShowScenarioOrder(true);
    fetch(`${serverIP}/evaluate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recommendationData),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Evaluation result:', data);

        if (data && Array.isArray(data.results) && data.results.length > 0) {
            setEvaluationResults(data.results);
        } else {
            setEvaluationResults([]); // Jika tidak ada hasil, atur ke array kosong
        }
    })
};

return (
    <div className="recommendation-sec">
        <div>
            <h2>Here The Recommendations</h2>
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
                                <p><b>Beri evaluasi dari kiri ke kanan </b>sesuai urutan <b>Order 1 hingga Order 5</b> (lihat tulisan di atas gambar produk).</p>
                                <p>1. <b>Thumb up/down</b> → Cek apakah produk ini <b>relevan</b> atau tidak.</p>
                                <p>2. <b>Order</b> → Atur ulang posisi jika urutan rekomendasinya kurang sesuai.</p>
                                <ul>
                                    <li>Jika produk di <b>Order 1</b> tidak seharusnya ada di posisi pertama, pindahkan ke posisi yang lebih sesuai (misalnya <b>Order 5</b> yang artinya pindah ke posisi kelima).</li>
                                    <li>Gunakan tombol dropdown <b>Give Order</b>  untuk mengubah urutan Order.</li>
                                    <li>Jika mengalami kendala saat klik Evaluation Summary (padahal sudah mengisi dengan benar), atur ulang Order ke <b>"Give Order"</b>  terlebih dahulu (pada skenario yang bermasalah), lalu masukkan kembali Order-nya.</li>
                                </ul>
                                <p><b>Catatan:</b> </p>
                            <ul>
                                <li>Apabila terdapat rekomendasi yang mirip di beberapa skenario, silakan abaikan dan tetap fokus menilai setiap skenario secara terpisah.</li>
                                <li>Hindari mengklik produk saat mengisi evaluasi, karena hal tersebut dapat menghapus hasil evaluasi yang sudah dilakukan, sehingga Anda perlu mengulang pengisian dari awal.</li>
                                <li>Jika mengevaluasinya tidak berurutan, mohon untuk di refresh kembali dan diisikan ulang</li>
                            </ul>

                            <div className="product-grid-container">
                                {productsInScenario.map((product, idx) => (
                                    <div key={`${product.product_id}-${start + idx}`} className="product-card-wrapper">
                                        <div className="product-card">
                                            <p className="product-order">Order {idx + 1}</p>
                                            <ProductCardRec2
                                                product_id={product.product_id}
                                                image={product.image_url}
                                                name={product.product_name}
                                                brand={product.brand_name}
                                                shade={product.shade_name}
                                                info={product.product_description}
                                                price={product.price}
                                                stars={product.stars}
                                                api={product.api}
                                                onThumbsChange={handleThumbsChange}
                                                scenarioNumber={index + 1}
                                            />
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

            {storedRecommendations.length > 0 && (
                <>
                {/* <p>Setelah semua terisi, klik Get Evaluation Summary</p> */}

                <div style={{ textAlign: "center" }}>
                    <p><b>Setelah semua terisi, klik Get Evaluation Summary 2</b></p>
                </div>

                    <div className="recommendation-sec-button">
                        {/* <button onClick={handleReset}>Reset Recommendations</button> */}
                        <button className="evaluate-btn" onClick={handleEvaluate}>
                            Get Evaluation Summary (2)
                        </button>
                         
                    </div>

                    {evaluationResults && evaluationResults.length > 0 ? (
                        <div className="evaluation-results">
                            <h3>Evaluation Summary</h3>
                            {/* <p>Product Relevant Percentage = Percentage of product that you give thumb up</p>
                            <p>Product Order Percentage = Percentage relevance of the order of products in the system to the order according to you</p>
                            {evaluationResults.map((result, index) => (
                                <p key={index}>
                                    <strong>Skenario {result.scenario}:</strong> 
                                    Product Relevant Percentage = {result.precision.toFixed(2)}, 
                                    Product Order Percentage = {result.ndcg.toFixed(2)}
                                </p>
                             */}
                                <p><b>Persentase Produk Relevan</b> = Persentase produk yang dianggap <b>relevan berdasarkan penilaian Anda</b></p>
                                <p> <b>Persentase Kesesuaian Urutan</b> = Persentase <b>kesesuaian urutan produk dalam sistem</b> dengan <b>urutan yang Anda tentukan</b> </p>
                                {evaluationResults.map((result, index) => (
                                    <ul>
                                        <li> <p key={index}>
                                        <strong>Skenario {result.scenario}: </strong>  
                                        Persentase Produk Relevan = <b>{result.precision.toFixed(1)}% Relevan </b>,  
                                        Persentase Kesesuaian Urutan = <b>{result.ndcg.toFixed(1)}% Sesuai </b>
                                    </p></li>
                                    </ul>
                                    // <p key={index}>
                                    //     <strong>Skenario {result.scenario}: </strong>  
                                    //     Persentase Produk Relevan = <b>{result.precision.toFixed(1)}% </b>,  
                                    //     Persentase Kesesuaian Urutan = <b>{result.ndcg.toFixed(1)}%</b>
                                    // </p>


                            
                            ))}

                             <h3>Order All Scenarios</h3>
                             <ul>
                                <li><p>Silakan tentukan <b>urutan skenario terbaik hingga terburuk</b> berdasarkan <b>ringkasan evaluasi</b>, apakah lebih menekankan pada <b>relevansi produk</b> dan/atau mempertimbangkan <b>urutan rekomendasi</b>.</p> </li>
                                <li><p>Posisi <b>"First"</b> digunakan untuk <b>skenario terbaik</b> (berdasarkan <b>relevansi</b> dan/atau <b>urutan rekomendasi</b>), sedangkan posisi <b>"Seventh"</b> untuk <b>skenario dengan hasil paling kurang optimal</b>.</p></li>
                                <li><p>Pastikan setiap <b>posisi</b> memiliki <b>skenario yang berbeda</b> satu sama lain.</p></li>
                             </ul>
                        
                        </div>

                        
                    ) : (
                         <div style={{ textAlign: "center" }}>
                    <p><b>Belum tersedia evaluation summary, Klik tombol Get Evaluation Summary untuk melihatnya</b></p>
                </div>
                    )}
                   
                    {showScenarioOrder && <ScenarioOrder onOrderChange={handleOrderChange} />}
                  
                    {/* Tampilkan tombol hanya setelah evaluasi muncul */}
                    {evaluationResults && evaluationResults.length > 0 && (


                        <div className="recommendation-sec-button">
                            <button onClick={handleSaveAll}>Save All Evaluation</button>
                            {/* <button onClick={handleReset}>Reset Recommendations</button> */}
                        </div>
                    )}
                </>
            )}
        </div>
    </div>
);

};

export default ProductRecommendationsDisplay2;
