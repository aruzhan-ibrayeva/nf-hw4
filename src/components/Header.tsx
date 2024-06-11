import Link from 'next/link';
import styles from './modules/Header.module.css'; 

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <nav>
                <ul className={styles.nav}>
                    <li className={styles.navItem}>
                        <Link href="/" className={styles.navLink}>Home</Link>
                    </li>
                    <li className={styles.navButton}>
                        <Link href="/create" className={styles.navLink}>
                            <span className={styles.buttonContent}>+</span>
                            <span className={styles.buttonText}>Post a new product</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
