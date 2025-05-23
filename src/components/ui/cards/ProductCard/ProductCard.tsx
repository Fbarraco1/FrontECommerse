import { IProduct } from '../../../../types/IProduct';
import styles from './ProductCard.module.css';
import Camisa from '../../../../assets/Camisa.png'; 

interface ProductCardProps {
  producto: IProduct;
}

export const ProductCard = ({ producto }: ProductCardProps) => {
  const imagenSrc = producto.imagenes?.[0] || Camisa;
  return (
    <div className={styles.card}>
      <img
        src={imagenSrc} // usar imagen del producto si existe, o imagen por defecto
        alt={producto.nombre}
        className={styles.image}
      />

      <h3 className={styles.name}>{producto.nombre}</h3>
      <p className={styles.price}>${producto.precio}</p>
    </div>
  );
};