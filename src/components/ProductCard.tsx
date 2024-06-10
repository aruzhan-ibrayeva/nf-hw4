// src/components/ProductCard.tsx
import React from 'react';
import { Product } from '../types/product';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div>
            <h2>{product.title}</h2>
            <img src={product.image} alt={product.title} style={{ width: '100px', height: '100px' }} />
            <p>{product.description}</p>
            <p>${product.price}</p>
        </div>
    );
}

export default ProductCard;
