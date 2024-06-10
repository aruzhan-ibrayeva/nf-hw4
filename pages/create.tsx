import React, { useState } from 'react';
import axios from 'axios';

function CreateProduct() {
    const [title, setTitle] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await axios.post('https://fakestoreapi.com/products', {
            title,
        });
        console.log(result.data); // Log the created product
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter product title"
            />
            <button type="submit">Create Product</button>
        </form>
    );
}

export default CreateProduct;
