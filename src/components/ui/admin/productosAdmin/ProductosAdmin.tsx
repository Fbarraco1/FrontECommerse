import { useEffect, useState } from "react";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import styles from './ProductosAdmin.module.css';
import { productStore } from "../../../../store/productStore";
import { categoryStore } from "../../../../store/categoryStore";
import { getAllProductosAdmin } from "../../../../http/product";
import { IProduct } from "../../../../types/IProduct"; 
import { ModalAddProducto } from "../ModalAddProducto/ModalAddProducto";
import { ModalTallesProducto } from "../ModalTalleProduto.tsx/ModalTalleProduto";
import { ITalle } from "../../../../types/ITalle";
import { getAllTalles } from "../../../../http/talle";

export const ProductosAdmin = () => {
  const productos = productStore((state) => state.productos); 
  const setArrayProductos = productStore((state) => state.setArrayProductos);
  
  // Obtener categorías del store
  const categorias = categoryStore((state) => state.categorias);
  const fetchCategorias = categoryStore((state) => state.fetchCategorias);

//Talle-Producto
const [productoTalleSeleccionado, setProductoTalleSeleccionado] = useState<number | null>(null);
const [tallesDisponibles, setTallesDisponibles] = useState<ITalle[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const abrirModal = () => setIsModalOpen(true);
  const cerrarModal = async  () => {
    setIsModalOpen(false);
    await fetchCategorias(); 
  }


  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // 1. Cargar categorías primero
        await fetchCategorias();
        const talles = await getAllTalles();
        setTallesDisponibles(talles);
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


  return (
    <div className={styles.container}>
       <button className={styles.addButton} onClick={abrirModal}>
        Agregar producto
      </button>

      {isModalOpen && <ModalAddProducto onClose={cerrarModal} />}
      {productoTalleSeleccionado && tallesDisponibles.length > 0 && (
  <ModalTallesProducto
    productoId={productoTalleSeleccionado}
    tallesDisponibles={tallesDisponibles}
    onClose={() => setProductoTalleSeleccionado(null)}
  />
)}
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
              <td onClick={() => setProductoTalleSeleccionado(prod.id)} className={styles.clickable}>
  Ver / Editar
</td>
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