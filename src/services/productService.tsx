import axios from 'axios';
import { Product } from '../types/product';

const axiosInstance = axios.create({
    baseURL: 'https://fakestoreapi.com',
});

export const fetchProducts = async () => {
    const response = await axiosInstance.get('/products');
    return response.data;
};
