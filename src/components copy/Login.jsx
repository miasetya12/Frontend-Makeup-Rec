// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import { toast } from 'react-toastify';
// // import '../css/Login.css';

// // const Login = ({ setUserId }) => {
// //     const [username, setUsername] = useState('');
// //     const navigate = useNavigate();
// //     const serverIP = 'http://127.0.0.1:5000/'

// //     const handleLogin = async (e) => {
// //         e.preventDefault();
// //         try {
            
// //             const response = await axios.post(`${serverIP}/login`, { username });
// //             // const response = await axios.post('http://localhost:5000/login', { username });
// //             setUserId(response.data.user_id); // Set userId in state
// //             localStorage.setItem('userId', response.data.user_id); // Save userId to localStorage
// //             toast.success(response.data.message);
// //             navigate('/'); // Navigate to home after successful login
// //         } catch (error) {
// //             toast.error(error.response.data.error);
// //         }
// //     };

// //     // Function to handle back navigation
// //     const handleBack = () => {
// //         navigate('/'); // Navigate back to home
// //     };

// //     return (
// //         <div className="modal-background">
// //             <div className="login-container">
// //                 <form onSubmit={handleLogin} className="login-form">
// //                     <input
// //                         type="text"
// //                         value={username}
// //                         onChange={(e) => setUsername(e.target.value)}
// //                         placeholder="Username"
// //                         required
// //                         className="login-input"
// //                     />
// //                     <div className="login-regis">
// //                     <button type="submit" className="login-button">Login</button>
// //                     <button type='button' onClick={handleBack} className="back-button">Back</button>
// //                     </div>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // };

// // export default Login;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2'; // Import SweetAlert2
// import '../css/Login.css';

// const Login = ({ setUserId }) => {
//     const [username, setUsername] = useState('');
//     const navigate = useNavigate();
//     // const serverIP = 'http://127.0.0.1:5000/';
//      const serverIP = 'https://goldfish-app-qex69.ondigitalocean.app/';


//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post(`${serverIP}/login`, { username });
//             setUserId(response.data.user_id); // Set userId in state
//             localStorage.setItem('userId', response.data.user_id); // Save userId to localStorage

//             // Show success alert using SweetAlert2
//             Swal.fire({
//                 title: 'Success!',
//                 text: response.data.message,
//                 icon: 'success',
//                 confirmButtonText: 'OK',
//             });

//             navigate('/'); // Navigate to home after successful login
//         } catch (error) {
//             // Show error alert using SweetAlert2
//             Swal.fire({
//                 title: 'Error!',
//                 text: error.response.data.error,
//                 icon: 'error',
//                 confirmButtonText: 'OK',
//             });
//         }
//     };

//     // Function to handle back navigation
//     const handleBack = () => {
//         navigate('/'); // Navigate back to home
//     };

//     return (
//         <div className="modal-background">
//             <div className="login-container">
//                 <form onSubmit={handleLogin} className="login-form">
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         placeholder="Username"
//                         required
//                         className="login-input"
//                     />
//                     <div className="login-regis">
//                         <button type="submit" className="login-button">Login</button>
//                         <button type='button' onClick={handleBack} className="back-button">Back</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import '../css/Login.css';

const Login = ({ setUserId }) => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    // const serverIP = 'http://127.0.0.1:5000/';
    const serverIP = 'https://octopus-app-mavy6.ondigitalocean.app/';

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
