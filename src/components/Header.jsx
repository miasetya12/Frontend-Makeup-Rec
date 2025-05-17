import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const Header = ({ userId, setUserId }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    const serverIP = 'http://127.0.0.1:5000/';

    useEffect(() => {
        const fetchUserData = async () => {
            if (userId) {
                try {
                    const response = await fetch(`${serverIP}/user/${userId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch user data');
                    }
                    const data = await response.json();
                    setUserData(data);
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
        Swal.fire({
            title: 'Keluar Berhasil!',
            text: 'Anda telah berhasil keluar dari akun',
            icon: 'success',
            confirmButtonText: 'OK',
                        customClass: {
        popup: 'custom-swal',
    },

    
        });

        navigate('/');
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
                            <Link className="nav-link" to="/">Beranda</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/review">Riwayat Penilaian</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/get-recommendation">Dapatkan Rekomendasi</Link>
                        </li> */}
                         {/* <li className="nav-item">
                            <Link className="nav-link" to="/get-recommendation-2">Rec 2</Link>
                        </li> */}
                         <li className="nav-item">
                            <Link className="nav-link" to="/get-recommendation-3">Dapatkan Rekomendasi</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto align-items-center">
                        {!userId ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Masuk</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Daftar</Link>
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
                                    <button className="btn btn-outline-danger" onClick={handleLogout}>Keluar</button>
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


