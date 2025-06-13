import { useEffect, useState } from "react";
import { productStore } from "../../../store/productStore";
import FilterPanel from "../FilterPanel/FilterPanel";
import styles from "./ProductPage.module.css";

export const ProductPage = () => {
  const { productos, aplicarFiltros, filtros } = productStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("🎬 ProductPage montado, aplicando filtros...");
    setLoading(true);
    aplicarFiltros().finally(() => setLoading(false));
  }, [filtros]);

  return (
    <div className={styles.productPage}>
      <h1>Productos</h1>
      <FilterPanel />
      <main className={styles.mainContent}>
        {loading && <p>Cargando productos...</p>}
        <div className={styles.productList}>
          {!loading && productos.length > 0 ? (
            productos.map((producto) => (
              <div key={producto.id} className={styles.productCard}>
                <h2>{producto.nombre}</h2>
                <p>{producto.descripcion}</p>
                <p>Precio: ${producto.precio}</p>
              </div>
            ))
          ) : !loading ? (
            <p>No hay productos disponibles.</p>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
