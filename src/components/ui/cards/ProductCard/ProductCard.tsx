import Camisa from '../../../../assets/Camisa.png';
import styles from './ProductCard.module.css';

export const ProductCard = () => {
  return (
    <div className={styles.card}>
      <img src={Camisa} alt="camisa de ejemplo" className={styles.image} />
      <h3 className={styles.name}>Camisa Hugo Boss Fit</h3>
      <p className={styles.price}>$345</p>
    </div>
  );
};
