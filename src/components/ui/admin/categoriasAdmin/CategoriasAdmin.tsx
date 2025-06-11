import { useEffect, useState } from "react";
import styles from './CategoriasAdmin.module.css';
import { ModalAddCategoria } from "../ModalAddCategoria/ModalAddCategoria";
import { categoryStore } from "../../../../store/categoryStore";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export const CategoriasAdmin = () => {
    const categorias = categoryStore((state) => state.categorias); 
    const fetchCategorias = categoryStore((state) => state.fetchCategorias);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const abrirModal = () => setIsModalOpen(true);
    const cerrarModal = () => setIsModalOpen(false);

    useEffect(() => {
      fetchCategorias();
    }, [fetchCategorias]);

  return (
    <div className={styles.container}>
        <button className={styles.addButton} onClick={abrirModal}>
            Agregar Categoria
        </button>
        {isModalOpen && <ModalAddCategoria onClose={cerrarModal} />}

        <h2 className={styles.title}>Categorias</h2>
        <table className={styles.table}>
            <thead>
            <tr>
                <th>Categoría</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {categorias.map((cat) => (
                <tr key={cat.id}>
                <td>{cat.nombre}</td>
                <td className={styles.actions}>
                    <FiEdit2 className={styles.icon} />
                    <FiTrash2 className={styles.icon} />
                </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  )
}
