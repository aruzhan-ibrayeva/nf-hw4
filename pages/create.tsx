import React, { useState } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { Product } from '../src/types/product'
import styles from './CreateProduct.module.css';

function CreateProduct() {
    const [productData, setProductData] = useState({ title: '', description: '', price: '' });
    const queryClient = useQueryClient();
    const router = useRouter();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const createProduct = async (): Promise<Product> => {
        const response = await axios.post<Product>('https://fakestoreapi.com/products', {
            ...productData,
            price: parseFloat(productData.price) 
        });
        return response.data;
    };

    const { mutate } = useMutation(createProduct, {
        onSuccess: (newProduct) => {
            queryClient.setQueryData<Product[]>('products', old => old ? [...old, newProduct] : [newProduct]);
            alert('Product created successfully!');
        },
        onError: () => {
            alert('Failed to create product.');
        }
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutate();
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formControl}>
                    <label className={styles.label} htmlFor="title">Product Title</label>
                    <input
                        className={styles.input}
                        type="text"
                        id="title"
                        name="title"
                        value={productData.title}
                        onChange={handleChange}
                        placeholder="Enter product title"
                    />
                </div>
                <div className={styles.formControl}>
                    <label className={styles.label} htmlFor="description">Description</label>
                    <textarea
                        className={styles.input}
                        id="description"
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        placeholder="Enter product description"
                    />
                </div>
                <div className={styles.formControl}>
                    <label className={styles.label} htmlFor="price">Price</label>
                    <input
                        className={styles.input}
                        type="text"
                        id="price"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        placeholder="Enter product price"
                    />
                </div>
                <button type="submit" className={styles.button}>Create Product</button>
            </form>
        </div>
    );
}

export default CreateProduct;
