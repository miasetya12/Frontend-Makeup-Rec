
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';  // Import SweetAlert2
import ProductCardFinal from './ProductCardFinal';
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



return (
    <div className="recommendation-sec">
        <div>
            {/* <h2 >Here The Recommendations</h2> */}
            <h2 style={{ marginTop: '50px' }}>Rekomendasi untuk Anda</h2>
            

            {storedRecommendations.length > 0 ? (
                Array.from({ length: Math.ceil(storedRecommendations.length / 5) }).map((_, index) => {
                    const start = index * 5;
                    const end = start + 5;
                    const productsInScenario = storedRecommendations.slice(start, end);

                    return (
                        <div key={`scenario-${index}`}>
                          
                             

                            <div className="product-grid-container-2">
                                {productsInScenario.map((product, idx) => (
                                    <div key={`${product.product_id}-${start + idx}`} className="product-card-wrapper">
                                        <div className="product-card">
                                           
                                            <ProductCardFinal
                                                product_id={product.product_id}
                                                image={product.image_url}
                                                name={product.product_name}
                                                brand={product.brand_name}
                                                shade={product.shade_name}
                                                price={product.price}
                                                stars={product.stars}
                                               
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })
            ) : (
                <p>Tidak ada rekomendasi yang tersedia. Mohon dicoba kembali.</p>
            )}

        
        </div>
        {/* <div className="recommendation-sec-button">
                        <button onClick={handleReset}>Reset Recommendations</button>
                        
                    </div> */}
    </div>
);

};

export default ProductRecommendationsDisplay2;
