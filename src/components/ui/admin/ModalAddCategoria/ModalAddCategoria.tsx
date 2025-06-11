import styles from './ModalAddCategoria.module.css';

interface ModalAddCategoriaProps {
  onClose: () => void;
}

export const ModalAddCategoria = ({ onClose }: ModalAddCategoriaProps) => {
  return (
    <div className={styles.overlay}>
        <div className={styles.container}>
            <h2>Agregar Categoria</h2>
                <form>
                    <div>
                    <label htmlFor="nombre">Nombre producto</label>
                    <input type="text" id="nombre" name="nombre" required />
                    </div>
                    <div className={styles.buttons}>
                        <button type="submit">Agregar</button>
                        <button  onClick={onClose}>Cancelar</button>
                    </div>
                </form>
        </div>
    </div>

  );
};
