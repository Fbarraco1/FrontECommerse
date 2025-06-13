import { useState } from "react";
import styles from './ModalAddTipos.module.css';
import { typeStore } from "../../../../store/typeStore";
import { IType } from "../../../../types/IType"; // Asegúrate de importar el tipo

interface ModalAddTiposProps {
  onClose: () => void;
  tipoEditar?: IType | null;
}

export const ModalAddTipos = ({ onClose, tipoEditar }: ModalAddTiposProps) => {
  const crearTipo = typeStore((state) => state.crearTipo);
  const editarTipo = typeStore((state) => state.editarTipo); // Asegúrate de tener esta acción en tu store
  const [nombre, setNombre] = useState(tipoEditar?.nombre || "");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!nombre.trim()) return;
    if (tipoEditar) {
      await editarTipo({ ...tipoEditar, nombre });
    } else {
      await crearTipo({ nombre, categorias: [] });
    }
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h2>{tipoEditar ? "Editar Tipo" : "Agregar Tipos"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre">Nombre Tipo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className={styles.buttons}>
            <button type="submit">{tipoEditar ? "Actualizar" : "Agregar"}</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
