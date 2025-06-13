import { useState, useEffect } from "react";
import styles from './ModalAddProducto.module.css';
import { productStore } from "../../../../store/productStore";
import { postNuevoProducto } from "../../../../http/product";
import { categoryStore } from "../../../../store/categoryStore";
import { INuevoProducto } from "../../../../types/INuevoProducto";
import { IProduct } from "../../../../types/IProduct";
import { editarProducto } from "../../../../http/product";
import Swal from "sweetalert2";
import * as yup from "yup"; // Importa yup

interface ModalAddProductoProps {
  onClose: () => void;
  productoEditar?: IProduct;
}

// Esquema de validación con yup
const schema = yup.object().shape({
  nombre: yup.string().required("El nombre es obligatorio"),
  categoria: yup.string().required("La categoría es obligatoria"),
  precio: yup
    .number()
    .typeError("El precio debe ser un número")
    .positive("El precio debe ser mayor a 0")
    .required("El precio es obligatorio"),
  marca: yup.string().required("La marca es obligatoria"),
  descripcion: yup.string().required("La descripción es obligatoria"),
  color: yup.string().required("El color es obligatorio"),
});

export const ModalAddProducto = ({ onClose, productoEditar }: ModalAddProductoProps) => {
  const [nombre, setNombre] = useState(productoEditar?.nombre || "");
  const [categoria, setCategoria] = useState(productoEditar?.categoria?.id?.toString() || "");
  const [precio, setPrecio] = useState(productoEditar?.precio?.toString() || "");
  const [marca, setMarca] = useState(productoEditar?.marca || "");
  const [descripcion, setDescripcion] = useState(productoEditar?.descripcion || "");
  const [color, setColor] = useState(productoEditar?.color || "");
  const [imagenes] = useState(productoEditar?.imagenes || []);
  const [talles] = useState(productoEditar?.talles || []);
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Estado para errores

  const categorias = categoryStore((state) => state.categorias);
  const agregarNuevoProducto = productStore((state) => state.agregarNuevoProducto);

  useEffect(() => {
    categoryStore.getState().fetchCategorias();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar con yup
    try {
      await schema.validate(
        { nombre, categoria, precio, marca, descripcion, color },
        { abortEarly: false }
      );
      setErrors({});
    } catch (validationError: any) {
      // Mapear errores de yup
      const newErrors: { [key: string]: string } = {};
      validationError.inner.forEach((err: any) => {
        if (err.path) newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    // Buscar la categoría seleccionada por id
    const categoriaSeleccionada = categorias.find(cat => cat.id === Number(categoria));
    if (!categoriaSeleccionada) {
      Swal.fire({
        title: "Categoría inválida",
        text: "Debe seleccionar una categoría válida",
        icon: "warning",
      });
      return;
    }

    const nuevoProducto: INuevoProducto = {
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
        const productoActualizado: IProduct = {
          ...productoEditar,
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
        await Swal.fire({
          title: "Producto actualizado",
          text: "El producto se actualizó correctamente.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        const productoCreado = await postNuevoProducto(nuevoProducto);
        if (productoCreado) {
          agregarNuevoProducto(productoCreado);
          await Swal.fire({
            title: "Producto agregado",
            text: "El producto se agregó correctamente.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      }
      onClose();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Error al guardar el producto",
        icon: "error",
      });
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
            {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}
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
            {errors.categoria && <span className={styles.error}>{errors.categoria}</span>}
          </div>
          <div>
            <label htmlFor="color">Color</label>
            <input
              type="text"
              id="color"
              name="color"
              onChange={(e) => setColor(e.target.value)}
              placeholder="Color del producto"
              value={color}
              required
            />
            {errors.color && <span className={styles.error}>{errors.color}</span>}
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
            {errors.precio && <span className={styles.error}>{errors.precio}</span>}
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
            {errors.marca && <span className={styles.error}>{errors.marca}</span>}
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
            {errors.descripcion && <span className={styles.error}>{errors.descripcion}</span>}
          </div>

          <div className={styles.buttons}>
            <button type="submit" className={styles.addBtn}>
              {productoEditar ? "Actualizar" : "Agregar"}
            </button>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};