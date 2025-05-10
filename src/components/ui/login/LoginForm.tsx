import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./LoginForm.module.css";
import { loginSchema } from "../../../schemas/loginSchema";
import { ILoginFormData } from "../../../types/ILoginFormData";
import Swal from "sweetalert2";
import { FiEye } from "react-icons/fi";

const initialState: ILoginFormData = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const [formValues, setFormValues] = useState<ILoginFormData>(initialState);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValues = { ...formValues, [name]: value };
    setFormValues(updatedValues);

    try {
      await loginSchema.validateAt(name, updatedValues);
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (err: any) {
      setFormErrors((prev) => ({ ...prev, [name]: err.message }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await loginSchema.validate(formValues, { abortEarly: false });
      console.log("Datos del login:", formValues);

      Swal.fire("Login exitoso", "Sesión iniciada correctamente", "success");
      // Aquí podrías redirigir o limpiar el formulario
    } catch (err: any) {
      const validationErrors: Record<string, string> = {};
      err.inner.forEach((error: any) => {
        validationErrors[error.path] = error.message;
      });
      setFormErrors(validationErrors);

      Swal.fire({
        icon: "error",
        title: "Error de validación",
        html: Object.values(validationErrors).map(msg => `<p>${msg}</p>`).join(""),
      });
    }
  };

  return (
    <div className={styles.formBox}>
      <h2 className={styles.title}>Conoce tu mejor versión</h2>
      <p className={styles.subtitle}>Conectamos estilo con profesionalismo.</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Ingrese email"
          className={styles.input}
          value={formValues.email}
          onChange={handleChange}
        />
        {formErrors.email && <p className={styles.error}>{formErrors.email}</p>}

        <label>Contraseña</label>
        <div className={styles.passwordWrapper}>
          <input
            type="password"
            name="password"
            placeholder="********"
            className={styles.input}
            value={formValues.password}
            onChange={handleChange}
          />
          <FiEye className={styles.eyeIcon} />
        </div>
        {formErrors.password && <p className={styles.error}>{formErrors.password}</p>}

        <button type="submit" className={styles.button}>Ingresar</button>
      </form>

      <p className={styles.registerText}>
        ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
      </p>
    </div>
  );
};
