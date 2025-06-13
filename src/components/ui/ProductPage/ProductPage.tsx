import { useEffect, useState } from "react";
import { productStore } from "../../../store/productStore";
import { Link } from "react-router-dom";
import FilterPanel from "../FilterPanel/FilterPanel";
import styles from "./ProductPage.module.css";

export const ProductPage = () => {
  const { productos, aplicarFiltros, filtros } = productStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    aplicarFiltros().finally(() => setLoading(false));
  }, [filtros]);

  return (
    <div className={styles.productPage}>
      <h1>Productos</h1>
      <div className={styles.layout}>
        <FilterPanel />
        <main className={styles.mainContent}>
          {loading && <p className={styles.loading}>Cargando productos...</p>}
          <div className={styles.productList}>
            {!loading && productos.length > 0 ? (
              productos.map((producto) => {
                const imagenPrincipal = producto.imagenes?.find((img) => img.esPrincipal);
                const imagenSrc = imagenPrincipal?.url || producto.imagenes?.[0]?.url || "rutaDefaultImagen.png";

                return (
                  <Link key={producto.id} to={`/producto/${producto.id}`} className={styles.linkCard}>
                    <div className={styles.productCard}>
                      <div className={styles.imageContainer}>
                        <img src={imagenSrc} alt={producto.nombre} className={styles.image} />
                      </div>
                      <div className={styles.info}>
                        <h2>{producto.nombre}</h2>
                        <p>{producto.descripcion}</p>
                        <p className={styles.price}>Precio: ${producto.precio}</p>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : !loading ? (
              <p className={styles.noProducts}>No hay productos disponibles.</p>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductPage;
