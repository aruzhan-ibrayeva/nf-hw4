import { useQuery } from 'react-query';
import { fetchProducts } from '@/src/services/productService';
import ProductCard from '../src/components/ProductCard';
import { Product } from '@/src/types/product';

export default function HomePage() {
    const { data: products, isLoading, error } = useQuery('products', fetchProducts);

    if (isLoading) return <div>Loading...</div>;
    if (error instanceof Error) return <div>An error occurred: {error.message}</div>;

    return (
        <div>
            <h1>Welcome to the Products App</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {products?.map((product: Product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
