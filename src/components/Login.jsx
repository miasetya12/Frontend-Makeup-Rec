import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../css/Login.css';

const Login = ({ setUserId }) => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const serverIP = 'http://127.0.0.1:5000/';
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${serverIP}/login`, { username });
            setUserId(response.data.user_id);
            localStorage.setItem('userId', response.data.user_id);

            Swal.fire({
                title: 'Success!',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'OK',
                 customClass: {
        popup: 'custom-swal',
    },
            });

            navigate('/');
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.error || 'Login failed.',
                icon: 'error',
                confirmButtonText: 'OK',
                 customClass: {
        popup: 'custom-swal',
    },
            });
        }
    };

    return (
        <div className="modal-background">
            <div className="login-container">
                <form onSubmit={handleLogin} className="login-form">
                    <h2>Login</h2>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                        className="login-input"
                    />
                    <div className="login-regis">
                        <button type="submit" className="login-button">Login</button>
                        <button type="button" onClick={() => navigate('/')} className="back-button">Back</button>
                    </div>
                </form>
                <p className="register-link">
                    Don't have an account? <span onClick={() => navigate('/register')} className="register-text" style={{ color: 'blue' }}>Register</span>
                </p>
            </div>
        </div>
    );
};

export default Login;
