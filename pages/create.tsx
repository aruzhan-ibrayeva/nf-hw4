import React, { useState } from 'react';
import axios from 'axios';
import styles from './CreateProduct.module.css'

function CreateProduct() {
    const [title, setTitle] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const result = await axios.post('https://fakestoreapi.com/products', {
                title,
            });
            console.log(result.data);
            alert('Product created successfully!'); 
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Failed to create product.');  
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formControl}>
                    <label className={styles.label} htmlFor="title">Enter product title</label>
                    <input
                        className={styles.input}
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Product title"
                    />
                </div>
                <button type="submit" className={styles.button}>Post Product</button>
            </form>
        </div>
    );
}

export default CreateProduct;
