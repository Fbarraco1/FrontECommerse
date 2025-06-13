import { useEffect, useState } from "react";
import styles from './TiposAdmin.module.css';
import { ModalAddTipos } from "../ModalAddTipos/ModalAddTipos";
import { ModalAddCategoria } from "../ModalAddCategoria/ModalAddCategoria"; // Importa el modal
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { typeStore } from "../../../../store/typeStore";
import { categoryStore } from "../../../../store/categoryStore";

export const TiposAdmin = () => {
    const tipos = typeStore((state) => state.tipos); 
    const fetchTipos = typeStore((state) => state.fetchTipos);

    const categorias = categoryStore((state) => state.categorias);
    const fetchCategorias = categoryStore((state) => state.fetchCategorias);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const abrirModal = () => setIsModalOpen(true);
    const cerrarModal = () => setIsModalOpen(false);

    // Estado para el modal de categoría
    const [isModalCategoriaOpen, setIsModalCategoriaOpen] = useState(false);
    const abrirModalCategoria = () => setIsModalCategoriaOpen(true);
    const cerrarModalCategoria = async () => {
    setIsModalCategoriaOpen(false);
    await fetchCategorias(); // Recarga las categorías después de cerrar el modal
    };
    useEffect(() => {
        fetchTipos();
        fetchCategorias();  
    }, [fetchTipos, fetchCategorias]);

    const getCategoriasPorTipo = (tipoId: number) => {
        const cats = categorias.filter(cat => cat.tipo?.id === tipoId);
        if (cats.length === 0) {
            return [{ id: 0, nombre: "Sin categorías" }];
        }
        return cats;
    };

    return (
        <div className={styles.container}>
            <button className={styles.addButton} onClick={abrirModal}>
                Agregar Tipos
            </button>
            {isModalOpen && <ModalAddTipos onClose={cerrarModal} />}
            {isModalCategoriaOpen && <ModalAddCategoria onClose={cerrarModalCategoria} />}

            <h2 className={styles.title}>Tipos</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Tipos</th>
                        <th>
                            Categorias 
                            <button 
                                className={styles.addButtonCategory} 
                                type="button"
                                onClick={abrirModalCategoria}
                            >
                                Agregar
                            </button>
                        </th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tipos.map((tip) => (
                        <tr key={tip.id}>
                            <td>{tip.nombre}</td>
                            <td>
                                <select>
                                    {getCategoriasPorTipo(tip.id).map(cat => (
                                        <option key={cat.id} value={cat.id} disabled={cat.id === 0}>
                                            {cat.nombre}
                                        </option>
                                    ))}
                                </select>
                            </td>
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
