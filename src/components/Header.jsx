// // import React from 'react';
// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link, useNavigate } from 'react-router-dom';

// const Header = ({ userId, setUserId }) => {
//     const navigate = useNavigate();
//     const [userData, setUserData] = useState(null);

//     const serverIP = 'http://127.0.0.1:5000/'
    

//     // Fetch user data based on userId
//     useEffect(() => {
//         const fetchUserData = async () => {
//             if (userId) {
//                 try {
//                     const response = await fetch(`${serverIP}/user/${userId}`);
//                     if (!response.ok) {
//                         throw new Error('Failed to fetch user data');
//                     }
//                     const data = await response.json();
//                     setUserData(data); // Store the user data
//                 } catch (error) {
//                     console.error('Error fetching user data:', error);
//                 }
//             }
//         };

//         fetchUserData();
//     }, [userId]);

       

//     const handleLogout = () => {
//         console.log("Logging out...");
//         setUserId(null);
//         localStorage.removeItem('userId');
//         navigate('/');
//     };

//     return (
//         <nav className="navbar navbar-expand-lg navbar-light">
//             <div className="container">
//                 <Link className="navbar-brand" to="/">Get Your Makeup</Link>
//                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarNav">
//                     <ul className="navbar-nav">
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/">Home</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/review">Buy & Review</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/get-recommendation">Recommendation</Link>
//                         </li>
//                     </ul>
//                     <ul className="navbar-nav ms-auto">
                   
//                         {!userId ? (
//                             <>
//                                 <li className="nav-item">
//                                     <Link className="nav-link" to="/login">Login</Link>
//                                 </li>
//                                 <li className="nav-item">
//                                     <Link className="nav-link" to="/register">Register</Link>
//                                 </li>
//                             </>
//                         ) : (

//                              <>
//                                 {userData ? (
//                                     <li className="nav-item">
//                                         <span className="nav-link">
//                                             {userData.username} | {userData.skintone} |  {userData.skintype} |  {userData.undertone}
//                                         </span>
//                                     </li>
//                                 ) : (
//                                     <li className="nav-item">
//                                         <span className="nav-link text-muted">Loading...</span>
//                                     </li>
//                                 )}

//                             <li className="nav-item">
//                                 <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
//                             </li>
//                              </>
//                         )}
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Header;

// // import React, { useEffect, useState } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import { Link, useNavigate } from 'react-router-dom';

// // const Header = ({ userId, setUserId }) => {
// //     const navigate = useNavigate();
// //     const [userData, setUserData] = useState(null);



// //     const handleLogout = () => {
// //         console.log("Logging out...");
// //         setUserId(null);
// //         localStorage.removeItem('userId'); // Remove userId from localStorage
// //         navigate('/'); // Redirect to home
// //     };

// //     return (
// //         <nav className="navbar navbar-expand-lg navbar-light bg-light">
// //             <div className="container">
// //                 <Link className="navbar-brand" to="/">Get Your Makeup</Link>
// //                 <button
// //                     className="navbar-toggler"
// //                     type="button"
// //                     data-bs-toggle="collapse"
// //                     data-bs-target="#navbarNav"
// //                     aria-controls="navbarNav"
// //                     aria-expanded="false"
// //                     aria-label="Toggle navigation"
// //                 >
// //                     <span className="navbar-toggler-icon"></span>
// //                 </button>
// //                 <div className="collapse navbar-collapse" id="navbarNav">
// //                     <ul className="navbar-nav">
// //                         <li className="nav-item">
// //                             <Link className="nav-link" to="/">Home</Link>
// //                         </li>
// //                         <li className="nav-item">
// //                             <Link className="nav-link" to="/review">Buy & Review</Link>
// //                         </li>
// //                         <li className="nav-item">
// //                             <Link className="nav-link" to="/get-recommendation">Get Recommendation</Link>
// //                         </li>
// //                     </ul>
// //                     <ul className="navbar-nav ms-auto">
// //                         {!userId ? (
// //                             <>
// //                                 <li className="nav-item">
// //                                     <Link className="nav-link" to="/login">Login</Link>
// //                                 </li>
// //                                 <li className="nav-item">
// //                                     <Link className="nav-link" to="/register">Register</Link>
// //                                 </li>
// //                             </>
// //                         ) : (
// //                             <>
// //                                 {userData ? (
// //                                     <li className="nav-item d-flex align-items-center">
// //                                         <span className="nav-link text-primary">
// //                                             Hello, {userData.username}!
// //                                         </span>
// //                                     </li>
// //                                 ) : (
// //                                     <li className="nav-item d-flex align-items-center">
// //                                         <span className="nav-link text-muted">Loading...</span>
// //                                     </li>
// //                                 )}
// //                                 <li className="nav-item">
// //                                     <button
// //                                         className="btn btn-outline-danger"
// //                                         onClick={handleLogout}
// //                                     >
// //                                         Logout
// //                                     </button>
// //                                 </li>
// //                             </>
// //                         )}
// //                     </ul>
// //                 </div>
// //             </div>
// //         </nav>
// //     );
// // };

// // export default Header;

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2

const Header = ({ userId, setUserId }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    // const serverIP = 'http://127.0.0.1:5000/';

    const serverIP = 'https://octopus-app-mavy6.ondigitalocean.app/';

    // Fetch user data based on userId
    useEffect(() => {
        const fetchUserData = async () => {
            if (userId) {
                try {
                    const response = await fetch(`${serverIP}/user/${userId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch user data');
                    }
                    const data = await response.json();
                    setUserData(data); // Store the user data
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUserData();
    }, [userId]);

    const handleLogout = () => {
        console.log("Logging out...");
        setUserId(null);
        localStorage.removeItem('userId');

        // Show logout success alert using SweetAlert2
        Swal.fire({
            title: 'Logged Out!',
            text: 'You have successfully logged out.',
            icon: 'success',
            confirmButtonText: 'OK',
                        customClass: {
        popup: 'custom-swal',
    },
        });

        navigate('/'); // Redirect to home after logout
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
                <Link className="navbar-brand" to="/">Get Your Makeup</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/review">Buy & Review</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/get-recommendation">Recommendation</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        {!userId ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                {userData ? (
                                    <li className="nav-item">
                                        <span className="nav-link">
                                            {userData.username} | {userData.skintone} |  {userData.skintype} |  {userData.undertone}
                                        </span>
                                    </li>
                                ) : (
                                    <li className="nav-item">
                                        <span className="nav-link text-muted">Loading...</span>
                                    </li>
                                )}

                                <li className="nav-item">
                                    <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;


