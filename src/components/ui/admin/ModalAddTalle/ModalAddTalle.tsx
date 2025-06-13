import { useState } from "react";
import styles from './ModalAddTalle.module.css';
import { tallestore } from "../../../../store/talleStore";
import Swal from "sweetalert2";
import * as yup from "yup"; // Importa yup


interface ModalAddTalleProps {
  onClose: () => void;
  productoId: number;
}

// Esquema de validación con yup
const schema = yup.object().shape({
  nombre: yup.string().required("El nombre del talle es obligatorio"),
  stock: yup
    .number()
    .typeError("El stock debe ser un número")
    .integer("El stock debe ser un número entero")
    .min(0, "El stock no puede ser negativo")
    .required("El stock es obligatorio"),
});

export const ModalAddTalle = ({ onClose, productoId }: ModalAddTalleProps) => {
  const crearTalle = tallestore((state) => state.crearTalle);

  const [nombre, setNombre] = useState("");
  const [stock, setStock] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validar con yup
    try {
      await schema.validate(
        { nombre, stock },
        { abortEarly: false }
      );
      setErrors({});
    } catch (validationError: any) {
      const newErrors: { [key: string]: string } = {};
      validationError.inner.forEach((err: any) => {
        if (err.path) newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    try {
      await crearTalle({
        nombre,
        stock: Number(stock),
        producto: { id: productoId }
      });
      Swal.fire({
        title: "Talle agregado",
        text: "El talle se agregó correctamente.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      onClose();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al agregar el talle.",
        icon: "error",
      });
    }
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
            {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}
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
            {errors.stock && <span className={styles.error}>{errors.stock}</span>}
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
