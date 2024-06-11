import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Product } from '../src/types/product'
import Button from '../src/components/ui/Button';
import Input from '../src/components/ui/Input';
import styles from './CreateProduct.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';


const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('https://fakeapi.platzi.com/api/v1/files/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data.url;
};

function CreateProduct() {
    const [productData, setProductData] = useState({ title: '', description: '', price: '', imageUrl: '' });
    const [file, setFile] = useState<File | null>(null);
    const queryClient = useQueryClient();
    const router = useRouter();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
        }
    };

    const createProduct = async () => {
        if (file) {
            const imageUrl = await uploadImage(file);
            const response = await axios.post<Product>('https://fakestoreapi.com/products', {
                ...productData,
                price: parseFloat(productData.price),
                imageUrl
            });
            return response.data;
        } else {
            throw new Error("File not provided");
        }
    };


    const { mutate } = useMutation(createProduct, {
        onSuccess: (newProduct) => {
            queryClient.setQueryData<Product[]>('products', old => {
                const updatedProducts = [...(old || []), newProduct];
                return updatedProducts;
            });
            queryClient.invalidateQueries({queryKey: ['products']});
            alert('Product created successfully!');
            router.push('/');
        },
        onError: (error) => {
            alert('Failed to create product. Error: ' + (error as Error).message);
        }
    });
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutate();
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input
                    type="text"
                    name="title"
                    value={productData.title}
                    onChange={handleChange}
                    placeholder="Enter product title"
                />
                <Input
                    type="text"
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                    placeholder="Enter product description"
                />
                <Input
                    type="text"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    placeholder="Enter product price"
                />
                <input
                    type="file"
                    onChange={handleFileChange}
                />
                <Button onClick={() => {}}>Create Product</Button>
            </form>
        </div>
    );
}

export default CreateProduct;
