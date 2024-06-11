import axiosInstance from '../api/axios';
import { Product } from '../types/product';
import CreateProduct from '@/pages/create';

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await axiosInstance.get<Product[]>('/products');
        console.log('Products fetched:', response.data); // Debugging line
        return response.data;
    } catch (error) {
        console.error('Failed to fetch products:', error); 
        throw error;
    }
};
