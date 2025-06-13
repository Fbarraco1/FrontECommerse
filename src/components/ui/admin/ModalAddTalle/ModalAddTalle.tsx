import { useState } from "react";
import styles from './ModalAddTalle.module.css';
import { tallestore } from "../../../../store/talleStore";


interface ModalAddTalleProps {
  onClose: () => void;
  productoId: number;
}

export const ModalAddTalle = ({ onClose, productoId }: ModalAddTalleProps) => {
  const crearTalle = tallestore((state) => state.crearTalle);

  const [nombre, setNombre] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!nombre.trim() || !stock.trim()) return;
    await crearTalle({
      nombre,
      stock: Number(stock),
      producto: { id: productoId }
    });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h2>Agregar Talle</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre">Nombre Talle</label>
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
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              min={0}
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
