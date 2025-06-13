import { useState } from "react";
import styles from './ModalAddTipos.module.css';
import { typeStore } from "../../../../store/typeStore";
import { IType } from "../../../../types/IType";
import Swal from "sweetalert2";
import * as yup from "yup"; // Importa yup

interface ModalAddTiposProps {
  onClose: () => void;
  tipoEditar?: IType | null;
}

// Esquema de validación con yup
const schema = yup.object().shape({
  nombre: yup.string().required("El nombre del tipo es obligatorio"),
});

export const ModalAddTipos = ({ onClose, tipoEditar }: ModalAddTiposProps) => {
  const crearTipo = typeStore((state) => state.crearTipo);
  const editarTipo = typeStore((state) => state.editarTipo);
  const [nombre, setNombre] = useState(tipoEditar?.nombre || "");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validar con yup
    try {
      await schema.validate(
        { nombre },
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
      if (tipoEditar) {
        await editarTipo({ ...tipoEditar, nombre });
        Swal.fire({
          title: "Tipo editado",
          text: "El tipo se editó correctamente.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await crearTipo({ nombre, categorias: [] });
        Swal.fire({
          title: "Tipo agregado",
          text: "El tipo se agregó correctamente.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
      onClose();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al guardar el tipo.",
        icon: "error",
      });
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h2>{tipoEditar ? "Editar Tipo" : "Agregar Tipos"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre">Nombre Tipo</label>
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
          <div className={styles.buttons}>
            <button type="submit">{tipoEditar ? "Actualizar" : "Agregar"}</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
