import { useEffect } from "react";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import styles from './ProductosAdmin.module.css';
import { productStore } from "../../../../store/productStore";
import { getAllProductos } from "../../../../http/product";

export const ProductosAdmin = () => {
  const productos = productStore((state) => state.productos); 
  const setArrayProductos = productStore((state) => state.setArrayProductos);

  useEffect(() => {
    getAllProductos()
      .then((productos) => {
        if (productos) setArrayProductos(productos);
      })
      .catch((err) => {
        console.error("Error al cargar productos:", err);
      });
  }, []);

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
              <td>{prod.categoria.nombre}</td>
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
