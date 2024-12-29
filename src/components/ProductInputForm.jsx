import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const ProductInputForm = ({ onSubmit, makeupParts, productCategories, onMakeupPartChange, onProductCategoryChange }) => {
    const [makeupPartInput, setMakeupPartInput] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [productIdRefs, setProductIdRefs] = useState('');
    const [topN, setTopN] = useState(5);
    const [selectedApi, setSelectedApi] = useState('tfidf');
    const [productList, setProductList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const serverIP = 'https://test-mia-74b518a4afb7.herokuapp.com/'
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

const handleSubmit = () => {
    onSubmit({
        makeupPartInput,
        productCategory,
        userDescription,
        productIdRefs: selectedProduct ? selectedProduct.value : '',  // Pass product_id
        topN,
        selectedApi,
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

            <button onClick={handleSubmit}>Get Recommendation</button>
        </div>
    );
};

export default ProductInputForm;
