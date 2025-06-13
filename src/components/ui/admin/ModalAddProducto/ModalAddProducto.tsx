import { useState, useEffect } from "react";
import styles from './ModalAddProducto.module.css';
import { productStore } from "../../../../store/productStore";
import { postNuevoProducto } from "../../../../http/product";
import { categoryStore } from "../../../../store/categoryStore";
import { INuevoProducto } from "../../../../types/INuevoProducto";
import { IProduct } from "../../../../types/IProduct";
import { editarProducto } from "../../../../http/product";

interface ModalAddProductoProps {
  onClose: () => void;
  productoEditar?: IProduct;
}

export const ModalAddProducto = ({ onClose, productoEditar }: ModalAddProductoProps) => {
  const [nombre, setNombre] = useState(productoEditar?.nombre || "");
  const [categoria, setCategoria] = useState(productoEditar?.categoria?.id?.toString() || "");
  const [precio, setPrecio] = useState(productoEditar?.precio?.toString() || "");
  const [marca, setMarca] = useState(productoEditar?.marca || "");
  const [descripcion, setDescripcion] = useState(productoEditar?.descripcion || "");
  const [color, setColor] = useState(productoEditar?.color || "");
  const [imagenes] = useState(productoEditar?.imagenes || []);
  const [talles] = useState(productoEditar?.talles || [])

  const categorias = categoryStore((state) => state.categorias);

  const agregarNuevoProducto = productStore((state) => state.agregarNuevoProducto);

  useEffect(() => {
    categoryStore.getState().fetchCategorias();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Buscar la categoría seleccionada por id
    const categoriaSeleccionada = categorias.find(cat => cat.id === Number(categoria));
    if (!categoriaSeleccionada) {
      alert("Debe seleccionar una categoría válida");
      return;
    }

    const nuevoProducto: INuevoProducto  = {
      nombre,
      categoria: categoriaSeleccionada,
      precio: Number(precio),
      marca,
      descripcion,
      color,
      imagenes,
      talles
    };

    try {
      if (productoEditar) {
        // Construye el objeto IProduct para editar
        const productoActualizado: IProduct = {
          ...productoEditar, // incluye id y campos que no cambian
          nombre,
          categoria: categoriaSeleccionada,
          precio: Number(precio),
          marca,
          descripcion,
          color,
          imagenes,
          talles
        };
        await editarProducto(productoActualizado);
      } else {
        // Lógica de creación
        const productoCreado = await postNuevoProducto(nuevoProducto);
        if (productoCreado) {
          agregarNuevoProducto(productoCreado);
        }
      }
      onClose();
    } catch (error) {
      alert("Error al guardar el producto");
    }
  };

  return (
    <div className={styles.overlay}>
        <div className={styles.container}>
            <h2>{productoEditar ? "Editar Producto" : "Agregar Producto"}</h2>
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