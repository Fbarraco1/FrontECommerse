import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { loginSchema } from "../../../schemas/loginSchema";
import { ILoginFormData } from "../../../types/ILoginFormData";
import { useAuth } from "../../../context/AuthContext";
import Swal from "sweetalert2";
import { FiEye, FiEyeOff } from "react-icons/fi";

const initialState: ILoginFormData = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const [formValues, setFormValues] = useState<ILoginFormData>(initialState);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

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
    setIsLoading(true);

    try {
      // Validar el formulario
      await loginSchema.validate(formValues, { abortEarly: false });
      
      // Intentar hacer login
      await login(formValues.email, formValues.password);
      
      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: "Sesión iniciada correctamente",
        timer: 1500,
        showConfirmButton: false
      });
      
      // Redirigir al inicio
      navigate("/");
      
    } catch (err: any) {
      console.error("Error en login:", err);
      
      // Si es error de validación del formulario
      if (err.inner) {
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
      } else {
        // Error del servidor (credenciales incorrectas, etc.)
        Swal.fire({
          icon: "error",
          title: "Error de autenticación",
          text: "Email o contraseña incorrectos",
        });
      }
    } finally {
      setIsLoading(false);
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
          disabled={isLoading}
        />
        {formErrors.email && <p className={styles.error}>{formErrors.email}</p>}

        <label>Contraseña</label>
        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="********"
            className={styles.input}
            value={formValues.password}
            onChange={handleChange}
            disabled={isLoading}
          />
          <span 
            className={styles.eyeIcon} 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>
        {formErrors.password && <p className={styles.error}>{formErrors.password}</p>}

        <button 
          type="submit" 
          className={styles.button}
          disabled={isLoading}
        >
          {isLoading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      <p className={styles.registerText}>
        ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
      </p>
    </div>
  );
};