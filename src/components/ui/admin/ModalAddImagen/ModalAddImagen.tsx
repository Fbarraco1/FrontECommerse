import React, { useState } from "react";
import { subirImagenProducto } from "../../../../http/image";
import styles from "./ModalAddImagen.module.css"; // Crea este archivo para estilos o usa uno existente

interface ModalAddImagenProps {
  onClose: () => void;
  productoId: number;
}

export const ModalAddImagen: React.FC<ModalAddImagenProps> = ({ onClose, productoId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [esPrincipal, setEsPrincipal] = useState(false);
  const [orden, setOrden] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Selecciona una imagen.");
      return;
    }
    setLoading(true);
    try {
      await subirImagenProducto(file, productoId, esPrincipal, orden);
      alert("Imagen subida correctamente");
      onClose();
    } catch (error) {
      alert("Error al subir la imagen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h2>Agregar Imagen</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Imagen:</label>
            <input type="file" accept="image/*" onChange={handleFileChange} required />
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={esPrincipal}
                onChange={(e) => setEsPrincipal(e.target.checked)}
              />
              Imagen principal
            </label>
          </div>
          <div>
            <label>Orden:</label>
            <input
              type="number"
              min={1}
              value={orden}
              onChange={(e) => setOrden(Number(e.target.value))}
              required
            />
          </div>
          <div className={styles.buttons}>
            <button type="submit" disabled={loading}>
              {loading ? "Subiendo..." : "Subir Imagen"}
            </button>
            <button type="button" onClick={onClose} disabled={loading}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}