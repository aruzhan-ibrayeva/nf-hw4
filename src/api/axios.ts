import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://fakestoreapi.com'
});

axiosInstance.interceptors.request.use((config) => {
    if (config.method === 'get') {
        config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
        config.headers['Pragma'] = 'no-cache';
        config.headers['Expires'] = '0';
    }
    return config;
});

export default axiosInstance;
