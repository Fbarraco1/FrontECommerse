import { useEffect, useState } from "react";
import { productStore } from "../../../store/productStore";
import FilterPanel from "../FilterPanel/FilterPanel";
import styles from "./ProductPage.module.css";

export const ProductPage = () => {
  const { productos, aplicarFiltros, filtros } = productStore();
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      {/* Botón hamburguesa solo en mobile */}
      <button
        className={`${styles.hamburger} ${sidebarOpen ? styles.hamburgerActive : ""}`}
        onClick={() => setSidebarOpen((open) => !open)}
        aria-label={sidebarOpen ? "Cerrar filtros" : "Abrir filtros"}
      >
        <span />
        <span />
        <span />
      </button>
      <div className={styles.layout}>
        {/* Sidebar: drawer en mobile */}
        <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
          {/* Botón cerrar solo visible en mobile */}
          <button
            className={styles.closeSidebar}
            onClick={() => setSidebarOpen(false)}
            aria-label="Cerrar filtros"
          >
            &times;
          </button>
          <FilterPanel />
        </aside>
        {/* Fondo oscuro al abrir sidebar en mobile */}
        {sidebarOpen && (
          <div
            className={styles.sidebarBackdrop}
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <main className={styles.mainContent}>
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
        </main>
      </div>
    </div>
  );
};

export default ProductPage;
