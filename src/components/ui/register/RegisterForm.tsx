import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
import styles from './RegisterForm.module.css';
import { IRegisterFormData } from '../../../types/IRegisterFormData';
import { registerSchema } from '../../../schemas/registerSchema';
import Swal from 'sweetalert2';

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: IRegisterFormData) => {
    setIsLoading(true);
    
    try {
      // Hacer la petición al backend
      const response = await axios.post('http://localhost:9000/api/auth/register', {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        contrasenia: data.password, // Nota: tu backend espera 'contrasenia'
        telefono: data.telefono,
        fechaNacimiento: data.fechaNacimiento,
        direccion: data.direccion,
        provincia: data.provincia
      });

      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "Te has registrado correctamente. Ahora puedes iniciar sesión.",
        timer: 2000,
        showConfirmButton: false
      });

      // Redirigir al login después del registro exitoso
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error: any) {
      console.error('Error en registro:', error);
      
      let errorMessage = "Ocurrió un error durante el registro";
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 400) {
        errorMessage = "Ya existe un usuario con este email";
      } else if (error.response?.status >= 500) {
        errorMessage = "Error del servidor. Inténtalo más tarde";
      }

      Swal.fire({
        icon: "error",
        title: "Error en el registro",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formBox}>
      <h2 className={styles.title}>Tu estilo comienza aquí</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.row}>
          <div>
            <input 
              {...register('nombre')} 
              className={styles.input} 
              type="text" 
              placeholder="Nombre"
              disabled={isLoading}
            />
            {errors.nombre && <p className={styles.error}>{errors.nombre.message}</p>}
          </div>
          <div>
            <input 
              {...register('apellido')} 
              className={styles.input} 
              type="text" 
              placeholder="Apellido"
              disabled={isLoading}
            />
            {errors.apellido && <p className={styles.error}>{errors.apellido.message}</p>}
          </div>
        </div>

        <div className={styles.row}>
          <div>
            <input 
              {...register('telefono')} 
              className={styles.input} 
              type="text" 
              placeholder="Teléfono"
              disabled={isLoading}
            />
            {errors.telefono && <p className={styles.error}>{errors.telefono.message}</p>}
          </div>
          <div>
            <input 
              {...register('email')} 
              className={styles.input} 
              type="email" 
              placeholder="Email"
              disabled={isLoading}
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.passwordWrapper}>
            <input
              {...register('password')}
              className={styles.input}
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              disabled={isLoading}
            />
            <span className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          <div>
            <input 
              {...register('fechaNacimiento')} 
              className={styles.input} 
              type="date"
              disabled={isLoading}
            />
            {errors.fechaNacimiento && <p className={styles.error}>{errors.fechaNacimiento.message}</p>}
          </div>
        </div>

        <div className={styles.row}>
          <div>
            <input 
              {...register('direccion')} 
              className={styles.input} 
              type="text" 
              placeholder="Dirección"
              disabled={isLoading}
            />
            {errors.direccion && <p className={styles.error}>{errors.direccion.message}</p>}
          </div>
          <div>
            <input 
              {...register('provincia')} 
              className={styles.input} 
              type="text" 
              placeholder="Provincia"
              disabled={isLoading}
            />
            {errors.provincia && <p className={styles.error}>{errors.provincia.message}</p>}
          </div>
        </div>

        <button 
          className={styles.button} 
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Registrando..." : "Registrarse"}
        </button>
        <p className={styles.registerText}>
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </p>
      </form>
    </div>
  );
};