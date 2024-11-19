import React, { useState, useEffect } from 'react';

const ProductInputForm = ({ onSubmit, makeupParts, productCategories, onMakeupPartChange, onProductCategoryChange }) => {
    const [makeupPartInput, setMakeupPartInput] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [topN, setTopN] = useState(5);
    const [selectedApi, setSelectedApi] = useState('tfidf');

    const handleSubmit = () => {
        onSubmit({
            makeupPartInput,
            productCategory,
            userDescription,
            topN,
            selectedApi,
        });
    };

    useEffect(() => {
        onMakeupPartChange(makeupPartInput);
        setProductCategory('');  // Reset category when makeup part changes
    }, [makeupPartInput]);

    return (
        <div className="input-form">
            <label>
                Makeup Part:
                <select
                    value={makeupPartInput}
                    onChange={(e) => setMakeupPartInput(e.target.value)}
                >
                    <option value="">Select Makeup Part</option>
                    {makeupParts.map((part) => (
                        <option key={part} value={part}>
                            {part}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Product Category:
                <select
                    value={productCategory}
                    onChange={(e) => {
                        setProductCategory(e.target.value);
                        onProductCategoryChange(e.target.value);
                    }}
                    disabled={!makeupPartInput}
                >
                    <option value="">Select Product Category</option>
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
            </label>

            <label>
                User Description:
                <input
                    type="text"
                    value={userDescription}
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

            {/* <label>
                Select Recommendation Method:
                <select
                    value={selectedApi}
                    onChange={(e) => setSelectedApi(e.target.value)}
                >
                    <option value="tfidf">TF-IDF</option>
                    <option value="svd">SVD</option>
                    <option value="combined">combined</option>
                    <option value="word2vec">Word2Vec</option>
                    <option value="hybrid_cbf_combined">hybrid_cbf_combined</option>
                    <option value="hybrid_tfidf">hybrid_tfidf</option>
                    <option value="kombinasi">kombinasi</option>
                    <option value="kombinasi_75">kombinasi_75</option>
                    <option value="hybrid_kombinasi">hybrid_kombinasi</option>
                    <option value="hybrid_kombinasi_75">hybrid_kombinasi_75</option>



                    
                </select>
            </label> */}

            <button onClick={handleSubmit}>Get Recommendation</button>
        </div>
    );
};

export default ProductInputForm;
