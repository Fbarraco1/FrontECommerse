import React from "react";
import { ImagenProducto } from "../../../../types/IProduct";
import styles from "./ModalVerImagenes.module.css";

interface ModalVerImagenesProps {
  imagenes: ImagenProducto[];
  onClose: () => void;
}

export const ModalVerImagenes: React.FC<ModalVerImagenesProps> = ({ imagenes, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <h3>Imágenes del producto</h3>
        <div className={styles.galeria}>
          {imagenes.length === 0 ? (
            <p>No hay imágenes para este producto.</p>
          ) : (
            imagenes.map(img => (
              <div key={img.id} className={styles.imagenContainer}>
                <img src={img.url} alt={img.nombre} className={styles.imagen} />
                {img.esPrincipal && <span className={styles.principal}>Principal</span>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};