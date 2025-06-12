import { useState } from "react";
import { categoryStore } from '../../../../store/categoryStore';
import styles from './ModalAddCategoria.module.css';

interface ModalAddCategoriaProps {
  onClose: () => void;
}

export const ModalAddCategoria = ({ onClose }: ModalAddCategoriaProps) => {
  const crearCategoria = categoryStore((state) => state.crearCategoria);
  const [nombre, setNombre] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!nombre.trim()) return;
    await crearCategoria({ nombre }); 
    onClose(); 
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h2>Agregar Categoria</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre">Nombre categoria</label>
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
