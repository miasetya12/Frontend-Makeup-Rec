import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../css/Login.css';

const Login = ({ setUserId }) => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/login', { username });
            // const response = await axios.post('http://localhost:5000/login', { username });
            setUserId(response.data.user_id); // Set userId in state
            localStorage.setItem('userId', response.data.user_id); // Save userId to localStorage
            toast.success(response.data.message);
            navigate('/'); // Navigate to home after successful login
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    // Function to handle back navigation
    const handleBack = () => {
        navigate('/'); // Navigate back to home
    };

    return (
        <div className="modal-background">
            <div className="login-container">
                <form onSubmit={handleLogin} className="login-form">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                        className="login-input"
                    />
                    <button type="submit" className="login-button">Login</button>
                    <button type='button' onClick={handleBack} className="back-button">Back</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
