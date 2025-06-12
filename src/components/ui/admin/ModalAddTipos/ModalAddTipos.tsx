import { useState } from "react";
import styles from './ModalAddTipos.module.css';
import { typeStore } from "../../../../store/typeStore";

interface ModalAddTiposProps {
  onClose: () => void;
}

export const ModalAddTipos = ({ onClose }: ModalAddTiposProps) => {
  const crearTipo = typeStore((state) => state.crearTipo);
  const [nombre, setNombre] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!nombre.trim()) return;
    await crearTipo({ nombre, categorias: [] }); 
    onClose(); 
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h2>Agregar Tipos</h2>
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
            <button type="submit">Agregar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
