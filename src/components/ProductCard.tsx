import React from 'react';
import styles from './modules/ProductCard.module.css';
import { Product } from '../types/product';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className={styles.productCard}>
            <img src={product.image} alt={product.title} className={styles.productImage} />
            <div className={styles.productInfo}>
                <h2 className={styles.productTitle}>{product.title}</h2>
                <p className={styles.productDescription}>{product.description}</p>
                <p className={styles.productPrice}>${product.price}</p>
            </div>
        </div>
    );
}

export default ProductCard;
