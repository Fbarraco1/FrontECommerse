import { ProductCard } from "../../cards/ProductCard/ProductCard";
import styles from "./ProductSection.module.css";

interface ProductSectionProps {
  title: string;
  productsCount?: number; // cantidad de tarjetas que querés mostrar, por defecto 4
  onViewAll?: () => void;  // función que se ejecuta al hacer click en "Ver Todo"
}

export const ProductSection = ({ title, productsCount = 4, onViewAll }: ProductSectionProps) => {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.productsContainer}>
        {[...Array(productsCount)].map((_, i) => (
          <ProductCard key={i} />
        ))}
      </div>

      {onViewAll && (
        <button className={styles.verTodo} onClick={onViewAll}>
          Ver Todo
        </button>
      )}
    </div>
  );
};
