import { useEffect, useState } from "react";
import { categoryStore } from '../../../../store/categoryStore';
import styles from './ModalAddCategoria.module.css';
import { typeStore } from "../../../../store/typeStore";
import Swal from "sweetalert2";
import * as yup from "yup"; // Importa yup

interface ModalAddCategoriaProps {
  onClose: () => void;
}

// Esquema de validación con yup
const schema = yup.object().shape({
  nombre: yup.string().required("El nombre de la categoría es obligatorio"),
  tipoSeleccionado: yup.string().required("El tipo es obligatorio"),
});

export const ModalAddCategoria = ({ onClose }: ModalAddCategoriaProps) => {
  const crearCategoria = categoryStore((state) => state.crearCategoria);
  const tipos = typeStore((state) => state.tipos);
  const fetchTipos = typeStore((state) => state.fetchTipos);

  const [nombre, setNombre] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchTipos();
  }, [fetchTipos]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validar con yup
    try {
      await schema.validate(
        { nombre, tipoSeleccionado },
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
      await crearCategoria({ nombre, tipo: { id: Number(tipoSeleccionado), nombre: tipoSeleccionado } });
      Swal.fire({
        title: "Categoría agregada",
        text: "La categoría se agregó correctamente.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      onClose();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al crear la categoría.",
        icon: "error",
      });
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h2>Agregar Categoria</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre">Nombre Categoria</label>
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
            <label htmlFor="tipo">Tipo</label>
            <select
              id="tipo"
              name="tipo"
              value={tipoSeleccionado}
              onChange={(e) => setTipoSeleccionado(e.target.value)}
              required
            >
              <option value="">Seleccione un Tipo</option>
              {tipos.map((tip) => (
                <option key={tip.id} value={tip.id}>
                  {tip.nombre}
                </option>
              ))}
            </select>
            {errors.tipoSeleccionado && <span className={styles.error}>{errors.tipoSeleccionado}</span>}
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
