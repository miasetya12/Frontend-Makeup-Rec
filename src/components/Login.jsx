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
                title: 'Berhasil!',
                // text: response.data.message,
                text: 'Anda berhasil masuk',
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
                text: error.response?.data?.error || 'Gagal Masuk',
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
                    <h2>Masuk</h2>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                        className="login-input"
                    />
                    <div className="login-regis">
                        <button type="submit" className="login-button">Masuk</button>
                        <button type="button" onClick={() => navigate('/')} className="back-button">Kembali</button>
                    </div>
                </form>
                <p className="register-link">
                    Tidak mempunyai akun? <span onClick={() => navigate('/register')} className="register-text" style={{ color: 'blue' }}>Daftar</span>
                </p>
            </div>
        </div>
    );
};

export default Login;
