import { Link, useNavigate } from "react-router-dom"; // Cambia a react-router-dom
import { productStore } from "../../../../store/productStore";
import { ProductCard } from "../../cards/ProductCard/ProductCard";
import styles from "./ProductSection.module.css";

interface ProductSectionProps {
  title: string;
  productsCount?: number; // cantidad de tarjetas que querés mostrar, por defecto 4
  onViewAll?: () => void;  // función que se ejecuta al hacer click en "Ver Todo"
}

export const ProductSection = ({ title, productsCount = 4 }: ProductSectionProps) => {
  const productos = productStore((state) => state.productos); // <-- leés los productos del store
  const navigate = useNavigate(); // Nuevo

  const handleViewAll = () => {
navigate("/productos");
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>{title}</h2>

   <div className={styles.productsContainer}>
  {productos.slice(0, productsCount).map((producto) => (
    <Link key={producto.id} to={`/producto/${producto.id}`} className={styles.linkCard}>
      <ProductCard producto={producto} />
    </Link>
  ))}
</div>


      <button className={styles.verTodo} onClick={handleViewAll}>
        Ver Todo
      </button>
    </div>
  );
};
