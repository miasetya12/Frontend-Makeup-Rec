// import React, { useState, useEffect } from 'react';
// import Select from 'react-select';
// import Swal from 'sweetalert2';
// const ProductInputForm = ({ onSubmit, makeupParts, productCategories, onMakeupPartChange, onProductCategoryChange }) => {
//     const [makeupPartInput, setMakeupPartInput] = useState('');
//     const [productCategory, setProductCategory] = useState('');
//     const [userDescription, setUserDescription] = useState('');
//     const [productIdRefs, setProductIdRefs] = useState('');
//     const [topN, setTopN] = useState(5);
//     const [selectedApi, setSelectedApi] = useState('tfidf');
//     const [productList, setProductList] = useState([]);
//     const [selectedProduct, setSelectedProduct] = useState(null);

//     const serverIP = 'http://127.0.0.1:5000/'

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await fetch(`${serverIP}/products`);
//                 const data = await response.json();
//                 setProductList(data);
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             }
//         };

//         fetchProducts();
//     }, []);


//     const handleSubmit = async () => {
        
//         if (!makeupPartInput || !productCategory || !selectedProduct) {
//             Swal.fire({
//                 title: 'Missing Fields!',
//                 text: 'Please select Category, Sub Category, and Reference Product before proceeding.',
//                 icon: 'warning',
//                 confirmButtonText: 'OK',
//             });
//             return;
//         }

    
//             const response = await onSubmit({
//                 makeupPartInput,
//                 productCategory,
//                 userDescription,
//                 productIdRefs: selectedProduct.value,
//                 topN,
//                 selectedApi,
//             });

          
//             if (response.error) {
//                 throw new Error(response.error); 
//             }

//             Swal.fire({
//                 title: 'Success!',
//                 text: 'Recommendations fetched successfully!',
//                 icon: 'success',
//                 confirmButtonText: 'OK',
//                             customClass: {
//             popup: 'custom-swal',
//         },
//             });

//     };



//     useEffect(() => {
//         onMakeupPartChange(makeupPartInput);
//         setProductCategory(''); 
//     }, [makeupPartInput]);

//     const productOptions = productList.map((product) => ({
//         value: product.product_id,
//         label: `${product.product_name} |${product.makeup_type} | ${product.brand_name} | ${product.shade_name}`,  // Format label
//     }));

//     const uniqueMakeupParts = [...new Set(productList.map((product) => product.makeup_part))];

//     return (
//         <div className="input-form">
//             <label>
//                 Product Category:
//                 <Select
//                     options={makeupParts.map((part) => ({
//                         value: part,
//                         label: part,
//                     }))}
//                     value={makeupPartInput ? { value: makeupPartInput, label: makeupPartInput } : null}
//                     onChange={(selectedOption) => setMakeupPartInput(selectedOption ? selectedOption.value : '')}
//                     placeholder="Select Product Category"
//                     isSearchable={true}
//                     classNamePrefix="custom-select"
//                 />
//             </label>

//             <label>
//                 Product Sub Category:
//                 <Select
//                     options={productCategories.length === 0 ? [{ value: '', label: 'No categories available' }] : productCategories.map((category) => ({
//                         value: category,
//                         label: category,
//                     }))}
//                     value={productCategory ? { value: productCategory, label: productCategory } : null}
//                     onChange={(selectedOption) => {
//                         setProductCategory(selectedOption ? selectedOption.value : '');
//                         onProductCategoryChange(selectedOption ? selectedOption.value : '');
//                     }}
//                     isDisabled={!makeupPartInput}
//                     placeholder="Select Product Sub Category"
//                     isSearchable={true}
//                     classNamePrefix="custom-select"
//                 />
//             </label>
      
      
//             <label>
//                 Reference Product That You Like:
//                 <Select
//                     options={productList
//                         .filter(
//                             (product) =>
//                                 (!makeupPartInput || product.makeup_part === makeupPartInput) &&
//                                 (!productCategory || product.makeup_type === productCategory)
//                         )
//                         .map((product) => ({
//                             value: product.product_id,
//                             label: `${product.product_name} | ${product.makeup_type} | ${product.brand_name} | ${product.shade_name}`,
//                         }))}
//                     onChange={(selectedOption) => setSelectedProduct(selectedOption)}
//                     getOptionLabel={(e) => e.label}
//                     getOptionValue={(e) => e.value}
//                     placeholder="Search Reference Product That You Like"
//                     isSearchable={true}
//                     classNamePrefix="custom-select"
//                 />
//             </label>

//             <label>
//                Additional Description:
//                 <input
//                     type="text"
//                     value={userDescription}
//                     placeholder="Ex: Matte Long Lasting Red Color"
//                     onChange={(e) => setUserDescription(e.target.value)}
//                 />
//             </label>

//             <label>
//                 Top N Recommendations:
//                 <input
//                     type="number"
//                     value={topN}
//                     onChange={(e) => setTopN(parseInt(e.target.value, 10))}
//                 />
//             </label>

//             <button onClick={handleSubmit}>Get Recommendation</button>
//         </div>
//     );
// };

// export default ProductInputForm;

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

    const serverIP = 'http://127.0.0.1:5000/';

    useEffect(() => {
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

    const handleSubmit = async () => {
        if (!makeupPartInput || !productCategory || !selectedProduct) {
            Swal.fire({
                title: 'Missing Fields!',
                text: 'Please select Category, Sub Category, and Reference Product before proceeding.',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
            return;
        }

        try {
            const response = await onSubmit({
                makeupPartInput,
                productCategory,
                userDescription,
                productIdRefs: selectedProduct.value,
                topN,
                selectedApi,
            });

            if (response && response.error) {
                throw new Error(response.error);
            }

            Swal.fire({
                title: 'Success!',
                text: 'Recommendations fetched successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'custom-swal',
                },
            });
        } catch (error) {
            console.error('Error in submission:', error);
            Swal.fire({
                title: 'Error!',
                text: error.message || 'Something went wrong while fetching recommendations.',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'custom-swal',
                },
            });
        }
    };

    useEffect(() => {
        onMakeupPartChange(makeupPartInput);
        setProductCategory('');
    }, [makeupPartInput]);

    const productOptions = productList.map((product) => ({
        value: product.product_id,
        label: `${product.product_name} | ${product.makeup_type} | ${product.brand_name} | ${product.shade_name}`,
    }));

    return (
        <div className="input-form">
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
                    options={
                        productCategories.length === 0
                            ? [{ value: '', label: 'No categories available' }]
                            : productCategories.map((category) => ({
                                  value: category,
                                  label: category,
                              }))
                    }
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
