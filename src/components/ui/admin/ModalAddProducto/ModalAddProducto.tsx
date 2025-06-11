import styles from './ModalAddProducto.module.css';


interface ModalAddProductoProps {
  onClose: () => void;
}

export const ModalAddProducto = ({ onClose }: ModalAddProductoProps) => {
  return (
    <div className={styles.container}>
      <h2>Agregar Producto</h2>
      <form>
        <div>
          <label htmlFor="nombre">Nombre producto</label>
          <input type="text" id="nombre" name="nombre" required />
        </div>
        <div>
          <label htmlFor="talle">Talle</label>
          <select id="talle" name="talle" required>
            <option value="">Seleccione un talle</option>
          </select>
        </div>
        <div>
          <label htmlFor="categoria">Categoría</label>
          <select id="categoria" name="categoria" required>
            <option value="">Seleccione una categoría</option>
          </select>
        </div>
        <div>
          <label htmlFor="imagen">Imágenes</label>
          <input type="file" id="imagen" name="imagen" accept="image/*" multiple />
        </div>
        <div>
          <label htmlFor="precio">Precio</label>
          <input type="number" id="precio" name="precio" required />
        </div>
        <div>
          <label htmlFor="stock">Cantidad de Stock</label>
          <input type="number" id="stock" name="stock" required />
        </div>
        <div className={styles.fullWidth}>
          <label htmlFor="descripcion">Descripción</label>
          <textarea id="descripcion" name="descripcion" required></textarea>
        </div>
        <button type="submit">➤ Agregar</button>
        <button className={styles.closeButton} onClick={onClose}>
          Cancelar
        </button>
      </form>
    </div>
  );
};
