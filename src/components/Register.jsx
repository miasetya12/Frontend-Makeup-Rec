import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2

const Register = ({ onRegister }) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [skintone, setSkintone] = useState('');
    const [skintype, setSkintype] = useState('');
    const [undertone, setUndertone] = useState('');
    const navigate = useNavigate(); // Using useNavigate for navigation

        const serverIP = 'http://127.0.0.1:5000'; 
//    const serverIP = 'https://clownfish-app-73v5y.ondigitalocean.app/';
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (!name || !username || !skintone || !skintype || !undertone) {
            Swal.fire({
                title: 'Form Incomplete',
                text: 'Please fill in all fields.',
                icon: 'warning',
                confirmButtonText: 'OK',            customClass: {
        popup: 'custom-swal',
    },
            });
            return; // Stop further execution if any field is empty
        }

        try {
            const response = await axios.post(`${serverIP}/register`, { 
                name, 
                username, 
                skintone, 
                skintype, 
                undertone 
            });
            onRegister(response.data.user_id); // Update user_id after successful registration
            
            // Show SweetAlert success message
            Swal.fire({
                title: 'Registration Successful!',
                text: `Welcome, ${name}!`,
                icon: 'success',
                confirmButtonText: 'OK',            customClass: {
        popup: 'custom-swal',
    },
            }).then(() => {
                // Redirect to home page after registration
                navigate('/'); // Assuming '/home' is the home page route
            });
        } catch (error) {
            // Show SweetAlert error message
            if (error.response) {
                Swal.fire({
                    title: 'Registration Failed',
                    text: error.response.data.error,
                    icon: 'error',
                    confirmButtonText: 'OK',            customClass: {
        popup: 'custom-swal',
    },
                });
            } else {
                Swal.fire({
                    title: 'Registration Failed',
                    text: 'Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK',            customClass: {
        popup: 'custom-swal',
    },
                });
            }
        }
    };

    const handleBack = () => {
        navigate('/'); // Navigate back to home
    };

    return (
        <div className="modal-background">
            <div className="login-container">
                <form onSubmit={handleSubmit} className="login-form">
                    <h2>Register</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="login-input"
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="login-input"
                    />
                    <div className="login-input-2">
                        <select
                            value={skintone}
                            onChange={(e) => setSkintone(e.target.value)}
                            required
                            className="login-input"
                        >
                            <option value="">Select Skintone</option>
                            <option value="Light">Light</option>
                            <option value="Medium Light">Medium Light</option>
                            <option value="Medium">Medium</option>
                            <option value="Medium Dark">Medium Dark</option>
                            <option value="Dark">Dark</option>
                        </select>

                        <select
                            value={skintype}
                            onChange={(e) => setSkintype(e.target.value)}
                            required
                            className="login-input"
                        >
                            <option value="">Select Skintype</option>
                            <option value="Dry">Dry</option>
                            <option value="Oily">Oily</option>
                            <option value="Normal">Normal</option>
                            <option value="Combination">Combination</option>
                        </select>

                        <select
                            value={undertone}
                            onChange={(e) => setUndertone(e.target.value)}
                            required
                            className="login-input"
                        >
                            <option value="">Select Undertone</option>
                            <option value="Warm">Warm</option>
                            <option value="Neutral">Neutral</option>
                            <option value="Cool">Cool</option>
                        </select>
                    </div>

                    <div className="login-regis">
                        <button type="submit" className="login-button">Register</button>
                        <button type='button' onClick={handleBack} className="back-button">Back</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
