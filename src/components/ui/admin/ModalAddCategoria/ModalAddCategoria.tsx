import { useEffect, useState } from "react";
import { categoryStore } from '../../../../store/categoryStore';
import styles from './ModalAddCategoria.module.css';
import { typeStore } from "../../../../store/typeStore";
interface ModalAddCategoriaProps {
  onClose: () => void;
}

export const ModalAddCategoria = ({ onClose }: ModalAddCategoriaProps) => {
  const crearCategoria = categoryStore((state) => state.crearCategoria);
  const tipos = typeStore((state) => state.tipos); // <-- obtener tipos del store
  const fetchTipos = typeStore((state) => state.fetchTipos);

  const [nombre, setNombre] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState(""); // <-- estado para el tipo

  useEffect(() => {
    fetchTipos();
  }, [fetchTipos]);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (!nombre.trim() || !tipoSeleccionado) return;
      await crearCategoria({ nombre, tipo: {id: Number(tipoSeleccionado) ,nombre:(tipoSeleccionado)}}); // <-- enviar tipoId
      onClose();
    } catch (error) {
      console.error("Error al crear la categoría:", error);
      alert("Error al crear la categoría. Por favor, inténtelo de nuevo.");
    }

  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h2>Agregar Categoria</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre">Nombre Categoria</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="tipo">Tipo</label>
            <select
              id="tipo"
              name="tipo"
              value={tipoSeleccionado}
              onChange={(e) => setTipoSeleccionado(e.target.value)}
              required
            >
              <option value="">Seleccione un Tipo</option>
              {tipos.map((tip) => (
                <option key={tip.id} value={tip.id}>
                  {tip.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.buttons}>
            <button type="submit">Agregar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
