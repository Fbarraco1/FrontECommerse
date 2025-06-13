import { useEffect, useState } from "react";
import styles from './TiposAdmin.module.css';
import { ModalAddTipos } from "../ModalAddTipos/ModalAddTipos";
import { ModalAddCategoria } from "../ModalAddCategoria/ModalAddCategoria"; // Importa el modal
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { typeStore } from "../../../../store/typeStore";
import { categoryStore } from "../../../../store/categoryStore";
import { eliminarTipoPorID } from "../../../../http/type";
import { IType } from "../../../../types/IType"; // Asegúrate de importar el tipo

export const TiposAdmin = () => {
    const tipos = typeStore((state) => state.tipos); 
    const fetchTipos = typeStore((state) => state.fetchTipos);

    const categorias = categoryStore((state) => state.categorias);
    const fetchCategorias = categoryStore((state) => state.fetchCategorias);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const abrirModal = () => {
        setTipoEditar(null); // Para agregar
        setIsModalOpen(true);
    };

    const cerrarModal = () => {
        setIsModalOpen(false);
        setTipoEditar(null);
    };

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

    const handleEliminarTipo = async (id: number) => {
        if (window.confirm("¿Seguro que deseas eliminar este tipo?")) {
            await eliminarTipoPorID(id);
            await fetchTipos(); // Recarga la lista de tipos
        }
    };

    const [tipoEditar, setTipoEditar] = useState<IType | null>(null);

    const abrirModalEditar = (tipo: IType) => {
        setTipoEditar(tipo); // Para editar
        setIsModalOpen(true);
    };

    // Estado para la búsqueda
    const [busqueda, setBusqueda] = useState("");

    // Filtrar tipos según la búsqueda
    const tiposFiltrados = tipos.filter((tip) =>
        tip.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className={styles.container}>
            {/* Contenedor flex para botón y búsqueda */}
            <div className={styles.topBar}>
                <button className={styles.addButton} onClick={abrirModal}>
                    Agregar Tipos
                </button>
                <input
                    type="text"
                    placeholder="Buscar tipo..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className={styles.searchBar}
                />
            </div>
            {isModalOpen && (
                <ModalAddTipos onClose={cerrarModal} tipoEditar={tipoEditar} />
            )}
            {isModalCategoriaOpen && <ModalAddCategoria onClose={cerrarModalCategoria} />}

            <h2 className={styles.title}>Tipos</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Tipos</th>
                        <th>
                            Categorias 
                            <button 
                                className={styles.addCategoriaButton} 
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
                    {tiposFiltrados.map((tip) => (
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
                                <FiEdit2
                                    className={styles.icon}
                                    onClick={() => abrirModalEditar(tip)}
                                />
                                <FiTrash2
                                    className={styles.icon}
                                    onClick={() => handleEliminarTipo(tip.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
