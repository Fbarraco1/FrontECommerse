import { useEffect, useState } from "react";
import { FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";
import styles from "./ProductosAdmin.module.css";
import { productStore } from "../../../../store/productStore";
import { categoryStore } from "../../../../store/categoryStore";
import {
  getAllProductosAdmin,
  eliminarProductoPorID,
} from "../../../../http/product";
import { ImagenProducto, IProduct } from "../../../../types/IProduct";
import { ModalAddProducto } from "../ModalAddProducto/ModalAddProducto";
import { ModalAddTalle } from "../ModalAddTalle/ModalAddTalle";
import { ModalAddImagen } from "../ModalAddImagen/ModalAddImagen";
import { ModalVerImagenes } from "../ModalVerImagenes/ModalVerImagenes";

export const ProductosAdmin = () => {
  const productos = productStore((state) => state.productos);
  const setArrayProductos = productStore((state) => state.setArrayProductos);

  // Obtener categorías del store
  const categorias = categoryStore((state) => state.categorias);
  const fetchCategorias = categoryStore((state) => state.fetchCategorias);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productoEditar, setProductoEditar] = useState<IProduct | null>(null);

  const [isModalVerImagenesOpen, setIsModalVerImagenesOpen] = useState(false);
  const [imagenesProductoSeleccionado, setImagenesProductoSeleccionado] = useState<ImagenProducto[]>([]);

  const abrirModalVerImagenes = (imagenes: ImagenProducto[]) => {
    setImagenesProductoSeleccionado(imagenes);
    setIsModalVerImagenesOpen(true);
  };
  const cerrarModalVerImagenes = () => {
    setIsModalVerImagenesOpen(false);
    setImagenesProductoSeleccionado([]);
  };
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
  };

  // Estado para el talle seleccionado por producto
  const [talleSeleccionado, setTalleSeleccionado] = useState<{
    [key: number]: number;
  }>({});

  // Estado para el modal de talle y el producto seleccionado
  const [isModalTalleOpen, setIsModalTalleOpen] = useState(false);
  const [productoIdParaTalle, setProductoIdParaTalle] = useState<number | null>(
    null
  );

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

  // Estado para el modal de imagen y el producto seleccionado
  const [isModalImagenOpen, setIsModalImagenOpen] = useState(false);
  const [productoIdParaImagen, setProductoIdParaImagen] = useState<
    number | null
  >(null);

  const abrirModalImagen = (productoId: number) => {
    setProductoIdParaImagen(productoId);
    setIsModalImagenOpen(true);
  };
  const cerrarModalImagen = () => {
    setIsModalImagenOpen(false);
    setProductoIdParaImagen(null);
    // Si quieres recargar productos tras agregar imagen, puedes hacerlo aquí
    // const productosData = await getAllProductosAdmin();
    // if (productosData) setArrayProductos(productosData);
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
    const categoria = categorias.find((cat) =>
      cat.productos?.some((p) => p.id === producto.id)
    );

    return categoria?.nombre || "Sin categoría";
  };

  const handleEliminarProducto = async (id: number) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      await eliminarProductoPorID(id);
      // Recargar productos después de eliminar
      const productosData = await getAllProductosAdmin();
      if (productosData) {
        setArrayProductos(productosData);
      }
    }
  };

  // Estado para la búsqueda
  const [busqueda, setBusqueda] = useState("");

  // Filtrar productos según la búsqueda
  const productosFiltrados = productos.filter((prod) =>
    prod.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className={styles.container}>
      {/* Barra superior con botón y búsqueda */}
      <div className={styles.topBar}>
        <button className={styles.addButton} onClick={abrirModal}>
          Agregar producto
        </button>
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className={styles.searchBar}
        />
      </div>
      {isModalOpen && (
        <ModalAddProducto
          onClose={cerrarModal}
          productoEditar={productoEditar ?? undefined}
        />
      )}
      {isModalTalleOpen && productoIdParaTalle !== null && (
        <ModalAddTalle
          onClose={cerrarModalTalle}
          productoId={productoIdParaTalle}
        />
      )}
      {isModalImagenOpen && productoIdParaImagen !== null && (
        <ModalAddImagen
          onClose={cerrarModalImagen}
          productoId={productoIdParaImagen}
        />
      )}
      {isModalVerImagenesOpen && (
        <ModalVerImagenes
          imagenes={imagenesProductoSeleccionado}
          onClose={cerrarModalVerImagenes}
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
          {productosFiltrados.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.nombre}</td>
              <td>{getNombreCategoria(prod)}</td>
              <td>$ {prod.precio}</td>
              <td className={styles.talleCell}>
                <select
                  className={styles.selectTalle}
                  value={talleSeleccionado[prod.id] || ""}
                  onChange={(e) =>
                    setTalleSeleccionado((prev) => ({
                      ...prev,
                      [prod.id]: Number(e.target.value),
                    }))
                  }
                >
                  <option value="">Seleccionar talle</option>
                  {prod.talles?.map((talle) => (
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
              <td className={styles.imageCell}>
                <div className={styles.imageActions}>
                  <FiEye
                    className={styles.icon}
                    onClick={() => abrirModalVerImagenes(prod.imagenes)}
                  />
                  <button
                    onClick={() => abrirModalImagen(prod.id)}
                    className={styles.addTalleButton}
                  >
                    Agregar imagenes
                  </button>
                </div>
              </td>
              <td>
                {(() => {
                  const idTalle = talleSeleccionado[prod.id];
                  const talle = prod.talles?.find((t) => t.id === idTalle);
                  return talle ? talle.stock : "-";
                })()}
              </td>
              <td className={styles.actions}>
                <FiEdit2
                  className={styles.icon}
                  onClick={() => abrirModalEditar(prod)}
                />
                <FiTrash2
                  className={styles.icon}
                  onClick={() => handleEliminarProducto(prod.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};