import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Review from './components/Review';
import Header from './components/Header';
import UserReviews from './components/UserReviews';
import MainHome from './components/MainHome';
import ProductDetail from './components/ProductDetail';
import ProductRecommendations from './components/ProductRecommendations';



const App = () => {
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);

    useEffect(() => {
        if (userId) {
            localStorage.setItem('userId', userId);
        } else {
            localStorage.removeItem('userId'); // Remove from local storage when logged out
        }
    }, [userId]);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login setUserId={setUserId} />} />
                <Route 
                    path="/" 
                    element={<MainHome userId={userId} setUserId={setUserId} />} // Pass setUserId
                />
                <Route path="/register" element={<Register />} />
                <Route path="/review" element={<Review userId={userId} />} />
                <Route path="/header" element={<Header />} />
                <Route path="/reviews/:userId" element={<UserReviews userId={userId} />} />
                <Route path="/product/:product_id" element={<ProductDetail />} />
                <Route 
                    path="/buy-review" 
                    element={<h2>Buy & Review Page</h2>} 
                />
                <Route 
                    path="/get-recommendation" 
                    element={userId ? <ProductRecommendations /> : <Navigate to="/login" />} // Redirect to login if not logged in
                />
            </Routes>
        </Router>
    );
};

export default App;
