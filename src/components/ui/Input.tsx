import React from 'react';
import styles from './Input.module.css';

interface InputProps {
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const Input: React.FC<InputProps> = ({ type, name, value, onChange, placeholder }) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={styles.input}
        />
    );
}

export default Input;
