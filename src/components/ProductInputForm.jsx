import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';
const ProductInputForm = ({ onSubmit, makeupParts, productCategories, onMakeupPartChange, onProductCategoryChange }) => {
    const [makeupPartInput, setMakeupPartInput] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [productIdRefs, setProductIdRefs] = useState('');
    const [topN, setTopN] = useState(5);
    const [selectedApi, setSelectedApi] = useState('tfidf');
    const [productList, setProductList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // const serverIP = 'http://127.0.0.1:5000/'

const serverIP = 'https://squid-app-owu38.ondigitalocean.app/';

    // `${serverIP}/products`
    useEffect(() => {
        // Fetch product list from the API
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${serverIP}/products`);
                const data = await response.json();
                setProductList(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

// const handleSubmit = () => {
//     onSubmit({
//         makeupPartInput,
//         productCategory,
//         userDescription,
//         productIdRefs: selectedProduct ? selectedProduct.value : '',  // Pass product_id
//         topN,
//         selectedApi,
//     });
// };

const handleSubmit = async () => {
    // Validasi inputan
    if (!makeupPartInput || !productCategory || !selectedProduct) {
        Swal.fire({
            title: 'Missing Fields!',
            text: 'Please select Category, Sub Category, and Reference Product before proceeding.',
            icon: 'warning',
            confirmButtonText: 'OK',
        });
        return; // Stop execution if validation fails
    }

    
        // Kirim data untuk rekomendasi
        const response = await onSubmit({
            makeupPartInput,
            productCategory,
            userDescription,
            productIdRefs: selectedProduct.value,  // Pass product_id
            topN,
            selectedApi,
        });

        // Cek apakah response berhasil
        if (response.error) {
            throw new Error(response.error); // Tangani error jika response ada masalah
        }

        // Jika berhasil, lakukan sesuatu (misalnya, navigasi ke halaman lain atau tampilkan pesan sukses)
        Swal.fire({
            title: 'Success!',
            text: 'Recommendations fetched successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
                        customClass: {
        popup: 'custom-swal',
    },
        });

};



    useEffect(() => {
        onMakeupPartChange(makeupPartInput);
        setProductCategory('');  // Reset category when makeup part changes
    }, [makeupPartInput]);

    // Membuat opsi untuk dropdown yang mencakup product_name, brand_name, dan shade_name
    const productOptions = productList.map((product) => ({
        value: product.product_id,
        label: `${product.product_name} |${product.makeup_type} | ${product.brand_name} | ${product.shade_name}`,  // Format label
    }));

    const uniqueMakeupParts = [...new Set(productList.map((product) => product.makeup_part))];

    return (
        <div className="input-form">
         {/* <label>
            Product Category:
            <select
                value={makeupPartInput}
                onChange={(e) => setMakeupPartInput(e.target.value)}
            >
                <option value="">Select Product Category</option>
                {makeupParts.map((part) => (
                    <option key={part} value={part}>
                        {part}
                    </option>
                ))}
            </select>
        </label>

        <label>
            Product Sub Category:
            <select
                value={productCategory}
                onChange={(e) => {
                    setProductCategory(e.target.value);
                    onProductCategoryChange(e.target.value);
                }}
                disabled={!makeupPartInput}
            >
                <option value="">Select Product Sub Category</option>
                {productCategories.length === 0 ? (
                    <option disabled>No categories available</option>
                ) : (
                    productCategories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))
                )}
            </select>
        </label> */}

    <label>
                Product Category:
                <Select
                    options={makeupParts.map((part) => ({
                        value: part,
                        label: part,
                    }))}
                    value={makeupPartInput ? { value: makeupPartInput, label: makeupPartInput } : null}
                    onChange={(selectedOption) => setMakeupPartInput(selectedOption ? selectedOption.value : '')}
                    placeholder="Select Product Category"
                    isSearchable={true}
                    classNamePrefix="custom-select"
                />
            </label>

            <label>
                Product Sub Category:
                <Select
                    options={productCategories.length === 0 ? [{ value: '', label: 'No categories available' }] : productCategories.map((category) => ({
                        value: category,
                        label: category,
                    }))}
                    value={productCategory ? { value: productCategory, label: productCategory } : null}
                    onChange={(selectedOption) => {
                        setProductCategory(selectedOption ? selectedOption.value : '');
                        onProductCategoryChange(selectedOption ? selectedOption.value : '');
                    }}
                    isDisabled={!makeupPartInput}
                    placeholder="Select Product Sub Category"
                    isSearchable={true}
                    classNamePrefix="custom-select"
                />
            </label>
      
      
            <label>
                Reference Product That You Like:
                <Select
                    options={productList
                        .filter(
                            (product) =>
                                (!makeupPartInput || product.makeup_part === makeupPartInput) &&
                                (!productCategory || product.makeup_type === productCategory)
                        )
                        .map((product) => ({
                            value: product.product_id,
                            label: `${product.product_name} | ${product.makeup_type} | ${product.brand_name} | ${product.shade_name}`,
                        }))}
                    onChange={(selectedOption) => setSelectedProduct(selectedOption)}
                    getOptionLabel={(e) => e.label}
                    getOptionValue={(e) => e.value}
                    placeholder="Search Reference Product That You Like"
                    isSearchable={true}
                    classNamePrefix="custom-select"
                />
            </label>


            {/* Display the selected product's product_id */}
            {/* {selectedProduct && (
                <div>
                    <p>Selected Product ID: {selectedProduct.value}</p>
                </div>
            )} */}

            <label>
               Additional Description:
                <input
                    type="text"
                    value={userDescription}
                    placeholder="Ex: Matte Long Lasting Red Color"
                    onChange={(e) => setUserDescription(e.target.value)}
                />
            </label>

            <label>
                Top N Recommendations:
                <input
                    type="number"
                    value={topN}
                    onChange={(e) => setTopN(parseInt(e.target.value, 10))}
                />
            </label>

            <button onClick={handleSubmit}>Get Recommendation (1)</button>
        </div>
    );
};

export default ProductInputForm;