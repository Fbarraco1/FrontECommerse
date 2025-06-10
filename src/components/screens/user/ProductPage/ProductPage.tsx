import { useEffect, useState } from "react";
import { productStore } from "../../../../store/productStore";
import FilterPanel from "../../../ui/FilterPanel/FilterPanel";
import styles from "./ProductPage.module.css";

const ProductPage = () => {
  const { productos, aplicarFiltros, filtros } = productStore();
  const [loading, setLoading] = useState(false);
  // Debug: observar cambios en productos
  useEffect(() => {
    console.log("🔄 Productos actualizados:", productos);
    console.log("🔄 Cantidad:", productos?.length || 0);
    console.log("🔄 Tipo:", typeof productos);
    console.log("🔄 Es array?:", Array.isArray(productos));
  }, [productos]);

  // Debug: observar cambios en filtros
  useEffect(() => {
    console.log("🔧 Filtros actualizados:", filtros);
  }, [filtros]);

  // Función wrapper para manejar el loading
  const handleAplicarFiltros = async () => {
    console.log("🚀 Iniciando aplicarFiltros...");
    setLoading(true);
    try {
      await aplicarFiltros();
      console.log("✅ aplicarFiltros completado");
    } catch (error) {
      console.error("💥 Error en handleAplicarFiltros:", error);
    } finally {
      setLoading(false);
      console.log("🏁 Loading terminado");
    }
  };

  // Ejecutar `aplicarFiltros` cuando el componente se monta
  useEffect(() => {
    console.log("🎬 Componente montado, ejecutando filtros iniciales");
    handleAplicarFiltros();
  }, []);

  // Volver a aplicar filtros cada vez que cambien
  useEffect(() => {
    // Evitar el primer render para no hacer doble llamada
    if (Object.keys(filtros).length > 0) {
      console.log("🔄 Filtros cambiaron, reaplicando...");
      handleAplicarFiltros();
    }
  }, [filtros]);

  return (
    <div className={styles.productPage}>
      <h1>Productos</h1>
      <FilterPanel />

      {loading && <p>Cargando productos...</p>}

      <div className={styles.productList}>
        {!loading && productos && productos.length > 0 ? (
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
    </div>
  );
};

export default ProductPage;
