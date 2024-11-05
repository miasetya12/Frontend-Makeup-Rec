import React from 'react';
import '../css/Header.css';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ userId, setUserId }) => {
    const navigate = useNavigate(); // Add useNavigate

    const handleLogout = () => {
        console.log("Logging out..."); // Log the logout action
        setUserId(null); // Clear the user ID from state
        localStorage.removeItem('userId'); // Clear user ID from local storage
        navigate('/'); // Navigate to the home page
    };

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/review">Buy & Review</Link>
                </li>
                <li>
                    <Link to="/get-recommendation">Get Recommendation</Link>
                </li>
                {!userId && (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                )}
                {userId && ( // Show logout button only if user is logged in
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Header;
