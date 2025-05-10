import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  nombre: yup.string().required("El nombre es obligatorio"),
  apellido: yup.string().required("El apellido es obligatorio"),
  telefono: yup.string().required("El teléfono es obligatorio"),
  email: yup.string().email("Email inválido").required("El email es obligatorio"),
  password: yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("La contraseña es obligatoria"),
  fechaNacimiento: yup.string().required("La fecha de nacimiento es obligatoria"),
  direccion: yup.string().required("La dirección es obligatoria"),
  provincia: yup.string().required("La provincia es obligatoria"),
});
