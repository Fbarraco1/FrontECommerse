import { useEffect } from "react";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import styles from './ProductosAdmin.module.css';
import { productStore } from "../../../../store/productStore";
import { categoryStore } from "../../../../store/categoryStore";
import { getAllProductosAdmin } from "../../../../http/product";
import { IProduct } from "../../../../types/IProduct"; // Agregar esta importación

export const ProductosAdmin = () => {
  const productos = productStore((state) => state.productos); 
  const setArrayProductos = productStore((state) => state.setArrayProductos);
  
  // Obtener categorías del store
  const categorias = categoryStore((state) => state.categorias);
  const fetchCategorias = categoryStore((state) => state.fetchCategorias);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // 1. Cargar categorías primero
        await fetchCategorias();
        
        // 2. Luego cargar productos
        const productosData = await getAllProductosAdmin();
        if (productosData) {
          setArrayProductos(productosData);
          console.log("Productos cargados:", productosData);
        // Opcional: Debug para verificar datos
        // debugCategorias();
        }
      } catch (err) {
        console.error("Error al cargar datos:", err);
      }
    };

    cargarDatos();
  }, [fetchCategorias, setArrayProductos]);

  // Función helper para obtener nombre de categoría
  const getNombreCategoria = (producto: IProduct): string => {
    // Buscar en las categorías cuál contiene este producto
    const categoria = categorias.find(cat => 
      cat.productos?.some(p => p.id === producto.id)
    );
    
    return categoria?.nombre || 'Sin categoría';
  };

  // Opcional: Función para debug - puedes eliminarla después
  const debugCategorias = () => {
    console.log("Categorías cargadas:", categorias.length);
    console.log("Productos cargados:", productos.length);
    categorias.forEach(cat => {
      console.log(`Categoría: ${cat.nombre}, Productos: ${cat.productos?.length || 0}`);
    });
  };

  return (
    <div className={styles.container}>
      <button className={styles.addButton}>Agregar producto</button>
      <h2 className={styles.title}>Productos</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Precio Venta</th>
            <th>Talles</th>
            <th>Imagen</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.nombre}</td>
              <td>{getNombreCategoria(prod)}</td>
              <td>$ {prod.precio}</td>
              <td>{/*prod.talle*/}</td>
              <td><FiEye /></td>
              <td>{prod.cantidad}</td>
              <td className={styles.actions}>
                <FiEdit2 className={styles.icon} />
                <FiTrash2 className={styles.icon} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};