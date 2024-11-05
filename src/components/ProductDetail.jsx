// src/components/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { product_id } = useParams(); // Mengambil id dari URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // const response = await fetch(`http://127.0.0.1:5000/products/${product_id}`);
                const response = await fetch(`https://flask-backend-ta-e62ef4a96bf0.herokuapp.com/products/${product_id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProduct(data); // Menyimpan detail produk di state
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [product_id]);

    if (!product) return <div>Loading...</div>; // Tampilkan loading jika produk belum diambil

    return (
        <div>
            <h2>{product.product_name}</h2>
            <img src={product.image_url} alt={product.product_name} />
            <p>{product.product_description}</p>
            <p>Price: {product.price !== undefined ? `Rp ${product.price}` : 'N/A'}</p>
        </div>
    );
};

export default ProductDetail;
