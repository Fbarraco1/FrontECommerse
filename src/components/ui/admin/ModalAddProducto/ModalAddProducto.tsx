import styles from './ModalAddProducto.module.css';

interface ModalAddProductoProps {
  onClose: () => void;
}

export const ModalAddProducto = ({ onClose }: ModalAddProductoProps) => {
  return (
    <div className={styles.overlay}>
        <div className={styles.container}>
            <h2>Agregar Producto</h2>
            <form>
                <div>
                    <label htmlFor="nombre">Nombre producto</label>
                    <input 
                        type="text" 
                        id="nombre" 
                        name="nombre" 
                        placeholder="Nombre del producto"
                        required 
                    />
                </div>
                
                <div>
                    <label htmlFor="talle">Talle</label>
                    <select id="talle" name="talle" required>

                    </select>
                </div>
                
                <div>
                    <label htmlFor="categoria">Categoría</label>
                    <select id="categoria" name="categoria" required>

                    </select>
                </div>
                
                <div>
                    <label htmlFor="imagen">Imágenes</label>
                    <div className={styles.fileInput}>
                        <input type="file" id="imagen" name="imagen" accept="image/*" multiple />

                    </div>
                </div>
                
                <div>
                    <label htmlFor="precio">Precio</label>
                    <input 
                        type="number" 
                        id="precio" 
                        name="precio" 
                        placeholder="Valor del producto"
                        required 
                    />
                </div>
                
                <div>
                    <label htmlFor="stock">Cantidad de Stock</label>
                    <div className={styles.stockContainer}>
                        <input 
                            type="number" 
                            id="stock" 
                            name="stock" 
                            className={styles.stockInput}
                            required 
                        />
                    </div>
                </div>
                
                <div>
                    <label htmlFor="marca">Marca</label>
                    <input 
                        type="text" 
                        id="marca" 
                        name="marca" 
                        placeholder="Marca del producto"
                        required 
                    />
                </div>
                
                <div>
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea 
                        id="descripcion" 
                        name="descripcion" 
                        placeholder="Descripción del producto"
                        required
                    ></textarea>
                </div>
                
                <div className={styles.buttons}>
                    <button type="submit" className={styles.addBtn}>Agregar</button>
                    <button type="button" className={styles.cancelBtn} onClick={onClose}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};