import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Debe ser un email válido").required("El email es obligatorio"),
  password: yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("La contraseña es obligatoria"),
});
