import { useState, useEffect } from "react";
import styles from './ModalAddProducto.module.css';
import { productStore } from "../../../../store/productStore";
import { postNuevoProducto } from "../../../../http/product";
import { categoryStore } from "../../../../store/categoryStore";
import { getAllTalles } from "../../../../http/talle"; // importa el servicio
import { ITalle } from "../../../../types/ITalle";

interface ModalAddProductoProps {
  onClose: () => void;
}

export const ModalAddProducto = ({ onClose }: ModalAddProductoProps) => {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [marca, setMarca] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [color, setColor] = useState("");
  const [imagenes] = useState("");
  const [talles, setTalles] = useState<ITalle[]>([]);
  const [talleSeleccionado, setTalleSeleccionado] = useState(""); // Para el valor seleccionado


  const categorias = categoryStore((state) => state.categorias);

  const agregarNuevoProducto = productStore((state) => state.agregarNuevoProducto);

  useEffect(() => {
    categoryStore.getState().fetchCategorias();
    // Cargar talles disponibles
    getAllTalles().then(setTalles);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nuevoProducto = {
      nombre,
      talle: talleSeleccionado,
      categoria: Number(categoria), 
      precio: Number(precio),
      cantidad: Number(cantidad),
      marca,
      descripcion,
      color,
      imagenes
    };

    try {
      const productoCreado = await postNuevoProducto(nuevoProducto);
      if (productoCreado) {
        agregarNuevoProducto(productoCreado);
        onClose();
      }
    } catch (error) {
      alert("Error al crear el producto");
    }
  };

  return (
    <div className={styles.overlay}>
        <div className={styles.container}>
            <h2>Agregar Producto</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombre">Nombre producto</label>
                    <input 
                        type="text" 
                        id="nombre" 
                        name="nombre" 
                        placeholder="Nombre del producto"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required 
                    />
                </div>
                
                <div>
                    <label htmlFor="talle">Talle</label>
                    <select
                      id="talle"
                      name="talle"
                      value={talleSeleccionado}
                      onChange={(e) => setTalleSeleccionado(e.target.value)}
                      required
                    >
                      <option value="">Seleccione un talle</option>
                      {talles.map((t) => (
                        <option key={t.id} value={t.tipoTalle}>
                          {t.tipoTalle}
                        </option>
                      ))}
                    </select>
                </div>
                
                <div>
                    <label htmlFor="categoria">Categoría</label>
                    <select
                      id="categoria"
                      name="categoria"
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                      required
                    >
                      <option value="">Seleccione una categoría</option>
                      {categorias.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.nombre}
                        </option>
                      ))}
                    </select>
                </div>
                 <div>
                    <label htmlFor="color">Color</label>
                    <input type="text" id="color" name="color" onChange={(e) => setColor(e.target.value)} placeholder="Color del producto" value={color} required></input>
                </div>
                              
                <div>
                    <label htmlFor="precio">Precio</label>
                    <input 
                        type="number" 
                        id="precio" 
                        name="precio" 
                        placeholder="Valor del producto"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
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
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
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
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                        required 
                    />
                </div>
                
                <div>
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea 
                        id="descripcion" 
                        name="descripcion" 
                        placeholder="Descripción del producto"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
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