import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Header from './Header';

const MainHome = ({ userId, setUserId }) => {
    const [products, setProducts] = useState([]); // State to store products on the current page
    const [allProducts, setAllProducts] = useState([]); // State to store all products
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [userData, setUserData] = useState(null); // State for user data
    const [loading, setLoading] = useState(false); // State for loading indicator
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const [productsPerPage] = useState(30); // Number of products per page
    const [totalPages, setTotalPages] = useState(1); // State for total pages based on filtered results
    const [filteredProducts, setFilteredProducts] = useState([]); // State to store filtered products

    useEffect(() => {
        // Fetch the user data based on the userId
        const fetchUserData = async () => {
            if (userId) {
                try {
                    const response = await fetch(`http://127.0.0.1:5000/user/${userId}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setUserData(data); // Store the user data
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUserData();
    }, [userId]);

    useEffect(() => {
        // Fetch all products initially
        const fetchAllProducts = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAllProducts(data); // Set all products in state
                setProducts(data.slice(0, productsPerPage)); // Set the products for the first page
            } catch (error) {
                console.error('Error fetching all products:', error);
            }
        };

        fetchAllProducts();
    }, []); 

    const handleSearch = () => {
        setLoading(true);
        setCurrentPage(1); // Set halaman ke 1 ketika pencarian dilakukan

        // Function to check if all query words are present in product name or brand name, regardless of order
        const isQueryMatch = (productName, brandName, query) => {
            const queryWords = query.toLowerCase().split(' ').filter(word => word.trim() !== "");

            // Check if each word from the query is present in product name or brand name
            const productString = productName.toLowerCase();
            const brandString = brandName.toLowerCase();

            // Check if each query word exists in the product or brand name
            return queryWords.every(word => productString.includes(word) || brandString.includes(word));
        };

        // Filter products based on the search query
        const filtered = allProducts.filter(product => {
            return isQueryMatch(product.product_name, product.brand_name, searchQuery);
        });

        setFilteredProducts(filtered);

        // Paginate the filtered products
        const indexOfLastProduct = 1 * productsPerPage; // since we are on page 1 after search
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        const currentProducts = filtered.slice(indexOfFirstProduct, indexOfLastProduct);

        setProducts(currentProducts);

        // Update totalPages based on the filtered products
        const filteredTotalPages = Math.ceil(filtered.length / productsPerPage);
        setTotalPages(filteredTotalPages); // Store the total pages based on filtered products

        setLoading(false);
    };


    // Menambahkan useEffect untuk handle pagination pada allProducts saat pertama kali dimuat
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

            // Update totalPages based on the filtered products
            const filteredTotalPages = Math.ceil(filteredProducts.length / productsPerPage);
            setTotalPages(filteredTotalPages); // Store the total pages based on filtered products
        }
    }, [currentPage, filteredProducts]); // Update pagination if filtered products change

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
                <h2>Popular Products</h2>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by Product or Brand"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={handleSearch} disabled={loading}>
                        {loading ? "Searching..." : "Search"}
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
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
        </div>
    );
};

export default MainHome;
