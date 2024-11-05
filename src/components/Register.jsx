import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = ({ onRegister }) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', { name, username });
            onRegister(response.data.user_id); // Mengupdate user_id setelah registrasi sukses
            toast.success(response.data.message);
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.error);
            } else {
                toast.error('Registration failed. Please try again.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
