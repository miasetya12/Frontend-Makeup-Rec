// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Register from './components/Register';
// import Login from './components/Login';
// import Review from './components/Review';
// import Header from './components/Header';
// import UserReviews from './components/UserReviews';
// import MainHome from './components/MainHome';
// import ProductDetail from './components/ProductDetail';
// import ProductRecommendations from './components/ProductRecommendations';

// const App = () => {
//     const [userId, setUserId] = useState(localStorage.getItem('userId') || null);

//     useEffect(() => {
//         if (userId) {
//             localStorage.setItem('userId', userId);
//         } else {
//             localStorage.removeItem('userId'); // Remove from local storage when logged out
//         }
//     }, [userId]);

//     return (
//         <Router>
//             <Routes>
//                 <Route path="/login" element={<Login setUserId={setUserId} />} />
//                 <Route 
//                     path="/" 
//                     element={<MainHome userId={userId} setUserId={setUserId} />} 
//                 />
//                 <Route path="/register" element={<Register />} />
//                 <Route 
//                     path="/review" 
//                     element={userId ? <Review userId={userId} setUserId={setUserId}/> : <Navigate to="/login" />}
//                 />
//                 <Route path="/reviews/:userId" element={<UserReviews userId={userId} />} />
//                 <Route path="/product/:product_id" element={<ProductDetail userId={userId}/>} />
//                 {/* <Route path="/product/:product_id" element={userId ? <ProductDetail userId={userId} setUserId={setUserId}} /> */}
//                 <Route 
//                     path="/get-recommendation" 
//                     element={userId ? <ProductRecommendations userId={userId} setUserId={setUserId} /> : <Navigate to="/login" />} 
//                 />
//             </Routes>
//         </Router>
//     );
// };

// export default App;


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
                    element={<MainHome userId={userId} setUserId={setUserId} />} 
                />
                <Route 
                    path="/register" 
                    element={<Register onRegister={setUserId} />} // Menambahkan onRegister untuk mengupdate userId
                />
                <Route 
                    path="/review" 
                    element={userId ? <Review userId={userId} setUserId={setUserId}/> : <Navigate to="/login" />}
                />
                <Route path="/reviews/:userId" element={<UserReviews userId={userId} />} />
                <Route path="/product/:product_id" element={<ProductDetail userId={userId} setUserId={setUserId} />} /> {/* Menambahkan setUserId */}
                <Route 
                    path="/get-recommendation" 
                    element={userId ? <ProductRecommendations userId={userId} setUserId={setUserId} /> : <Navigate to="/login" />} 
                />
            </Routes>
        </Router>
    );
};

export default App;
