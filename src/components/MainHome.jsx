import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Header from './Header';

const MainHome = ({ userId, setUserId }) => {
    const [products, setProducts] = useState([]); 
    const [allProducts, setAllProducts] = useState([]); 
    const [searchQuery, setSearchQuery] = useState(""); 
    const [loading, setLoading] = useState(false); 
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(30); 
    const [totalPages, setTotalPages] = useState(1);
    const [filteredProducts, setFilteredProducts] = useState([]); 
    const serverIP = 'http://127.0.0.1:5000/'
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
            if (userId) {
                try {
                  
                    const response = await fetch(`${serverIP}/user/${userId}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
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
    
    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await fetch(`${serverIP}/products`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAllProducts(data); 
                setProducts(data.slice(0, productsPerPage));
            } catch (error) {
                console.error('Error fetching all products:', error);
            }
        };

        fetchAllProducts();
    }, []); 
    
    const handleSearch = () => {
        setLoading(true);
        setCurrentPage(1); 
        const isQueryMatch = (productName, brandName, query) => {
            const queryWords = query.toLowerCase().split(' ').filter(word => word.trim() !== "");
            const productString = productName.toLowerCase();
            const brandString = brandName.toLowerCase();
            return queryWords.every(word => productString.includes(word) || brandString.includes(word));
        };

        // Filter products based on the search query
        const filtered = allProducts.filter(product => {
            return isQueryMatch(product.product_name, product.brand_name, searchQuery);
        });

        setFilteredProducts(filtered);

        // Paginate the filtered products
        const indexOfLastProduct = 1 * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        const currentProducts = filtered.slice(indexOfFirstProduct, indexOfLastProduct);

        setProducts(currentProducts);

        // Update totalPages based on the filtered products
        const filteredTotalPages = Math.ceil(filtered.length / productsPerPage);
        setTotalPages(filteredTotalPages); // Store the total pages based on filtered products

        setLoading(false);
    };

    useEffect(() => {
        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

        setProducts(currentProducts);

        // Update totalPages based on the total products
        const totalPages = Math.ceil(allProducts.length / productsPerPage);
        setTotalPages(totalPages); // Store the total pages based on all products
    }, [currentPage, allProducts]); // Tambahkan allProducts ke dalam dependency array

    useEffect(() => {
        if (filteredProducts.length > 0) {
            const indexOfLastProduct = currentPage * productsPerPage;
            const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
            const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

            setProducts(currentProducts);
            const filteredTotalPages = Math.ceil(filteredProducts.length / productsPerPage);
            setTotalPages(filteredTotalPages);
        }
    }, [currentPage, filteredProducts]); 

    return (
        <div>
                 {/* {userData && (
                    <div>
                        <h3>User Details</h3>
                        <p>Username: {userData.username}</p>
                        <p>Skintone: {userData.skintone}</p>
                        <p>Skintype: {userData.skintype}</p>
                        <p>Undertone: {userData.undertone}</p>
                    </div>
                )} */}
               
            <Header userId={userId} setUserId={setUserId} />
        <div className="main-page">
            <div className="container-2">
                {/* <h1>{userId ? `Hello, User ${userId}` : "Welcome to the Home Page"}</h1>
             */}
                <h2>Produk Populer</h2>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Cari berdasarkan produk/brand"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={handleSearch} disabled={loading}>
                        {loading ? "Cari..." : "Cari"}
                    </button>
                </div>
            </div>

            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard
                        key={product.product_id}
                        product_id={product.product_id}
                        image={product.image_url}
                        name={product.product_name}
                        brand={product.brand_name}
                        shade={product.shade_name}
                        price={product.price}
                    />
                ))}
            </div>
            <div className="pagination">
                <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                    disabled={currentPage === 1}
                >
                    Sebelumnya
                </button>
                <span>Halaman {currentPage} dari {totalPages}</span>
                <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                    disabled={currentPage === totalPages}
                >
                    Setelahnya
                </button>
            </div>
        </div>
        </div>
    );
};

export default MainHome;
