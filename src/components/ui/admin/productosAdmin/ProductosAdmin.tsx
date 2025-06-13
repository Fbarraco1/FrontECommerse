import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import styles from './ProductosAdmin.module.css';
import { productStore } from "../../../../store/productStore";
import { categoryStore } from "../../../../store/categoryStore";
import { getAllProductosAdmin } from "../../../../http/product";
import { IProduct } from "../../../../types/IProduct"; 
import { ModalAddProducto } from "../ModalAddProducto/ModalAddProducto";
import { ModalAddTalle } from "../ModalAddTalle/ModalAddTalle";


export const ProductosAdmin = () => {
  const productos = productStore((state) => state.productos); 
  const setArrayProductos = productStore((state) => state.setArrayProductos);
  
  // Obtener categorías del store
  const categorias = categoryStore((state) => state.categorias);
  const fetchCategorias = categoryStore((state) => state.fetchCategorias);



  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productoEditar, setProductoEditar] = useState<IProduct | null>(null);

  const abrirModal = () => {
    setProductoEditar(null); // Para agregar
    setIsModalOpen(true);
  };

  const abrirModalEditar = (producto: IProduct) => {
    setProductoEditar(producto); // Para editar
    setIsModalOpen(true);
  };

  const cerrarModal = async () => {
    setIsModalOpen(false);
    setProductoEditar(null);
    await fetchCategorias();
    // Recarga productos si es necesario
    const productosData = await getAllProductosAdmin();
    if (productosData) {
      setArrayProductos(productosData);
    }
  }

  // Estado para el talle seleccionado por producto
  const [talleSeleccionado, setTalleSeleccionado] = useState<{ [key: number]: number }>({});

  // Estado para el modal de talle y el producto seleccionado
  const [isModalTalleOpen, setIsModalTalleOpen] = useState(false);
  const [productoIdParaTalle, setProductoIdParaTalle] = useState<number | null>(null);

  const abrirModalTalle = (productoId: number) => {
    setProductoIdParaTalle(productoId);
    setIsModalTalleOpen(true);
  };
  const cerrarModalTalle = async () => {
    setIsModalTalleOpen(false);
    setProductoIdParaTalle(null);
    // Recargar productos para actualizar talles
    const productosData = await getAllProductosAdmin();
    if (productosData) {
      setArrayProductos(productosData);
    }
  };


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

      {isModalOpen && (
        <ModalAddProducto onClose={cerrarModal} productoEditar={productoEditar ?? undefined} />
      )}
      {isModalTalleOpen && productoIdParaTalle !== null && (
        <ModalAddTalle onClose={cerrarModalTalle} productoId={productoIdParaTalle} />
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
              <td className={styles.talleCell}>
                <select
                  className={styles.selectTalle}
                  value={talleSeleccionado[prod.id] || ""}
                  onChange={e =>
                    setTalleSeleccionado(prev => ({
                      ...prev,
                      [prod.id]: Number(e.target.value)
                    }))
                  }
                >
                  <option value="">Seleccionar talle</option>
                  {prod.talles?.map(talle => (
                    <option key={talle.id} value={talle.id}>
                      {talle.nombre}
                    </option>
                  ))}
                </select>
                <button
                  className={styles.addTalleButton}
                  type="button"
                  onClick={() => abrirModalTalle(prod.id)}
                >
                  + Agregar Talle
                </button>
              </td>
              <td>
                {/* Aquí puedes mostrar la imagen principal si quieres */}
              </td>
              <td>
                {(() => {
                  const idTalle = talleSeleccionado[prod.id];
                  const talle = prod.talles?.find(t => t.id === idTalle);
                  return talle ? talle.stock : "-";
                })()}
              </td>
              <td className={styles.actions}>
                <FiEdit2 className={styles.icon} onClick={() => abrirModalEditar(prod)} />
                <FiTrash2 className={styles.icon} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};