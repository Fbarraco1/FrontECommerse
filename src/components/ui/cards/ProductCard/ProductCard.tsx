import { IProduct } from '../../../../types/IProduct';
import styles from './ProductCard.module.css';
import Camisa from '../../../../assets/Camisa.png';

interface ProductCardProps {
  producto: IProduct;
}

export const ProductCard = ({ producto }: ProductCardProps) => {
  const imagenPrincipal = producto.imagenes?.find(img => img.esPrincipal);
  const imagenSrc = imagenPrincipal?.url || producto.imagenes?.[0]?.url || Camisa;

  return (
    <div className={styles.card}>
      <img
        src={imagenSrc}
        alt={producto.nombre}
        className={styles.image}
      />

      <h3 className={styles.name}>{producto.nombre}</h3>
      <p className={styles.price}>${producto.precio}</p>
    </div>
  );
};
