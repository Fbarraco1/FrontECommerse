import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import styles from './RegisterForm.module.css';
import { IRegisterFormData } from '../../../types/IRegisterFormData';
import { registerSchema } from '../../../schemas/registerSchema';
import Swal from 'sweetalert2';

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: IRegisterFormData) => {
    console.log('Datos del registro:', data);
    Swal.fire("Registro exitoso", "Te has registrado correctamente", "success");
  };

  return (
    <div className={styles.formBox}>
      <h2 className={styles.title}>Tu estilo comienza aquí</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.row}>
          <div>
            <input {...register('nombre')} className={styles.input} type="text" placeholder="Nombre" />
            {errors.nombre && <p className={styles.error}>{errors.nombre.message}</p>}
          </div>
          <div>
            <input {...register('apellido')} className={styles.input} type="text" placeholder="Apellido" />
            {errors.apellido && <p className={styles.error}>{errors.apellido.message}</p>}
          </div>
        </div>

        <div className={styles.row}>
          <div>
            <input {...register('telefono')} className={styles.input} type="text" placeholder="Teléfono" />
            {errors.telefono && <p className={styles.error}>{errors.telefono.message}</p>}
          </div>
          <div>
            <input {...register('email')} className={styles.input} type="email" placeholder="Email" />
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
            />
            <span className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          <div>
            <input {...register('fechaNacimiento')} className={styles.input} type="date" />
            {errors.fechaNacimiento && <p className={styles.error}>{errors.fechaNacimiento.message}</p>}
          </div>
        </div>

        <div className={styles.row}>
          <div>
            <input {...register('direccion')} className={styles.input} type="text" placeholder="Dirección" />
            {errors.direccion && <p className={styles.error}>{errors.direccion.message}</p>}
          </div>
          <div>
            <input {...register('provincia')} className={styles.input} type="text" placeholder="Provincia" />
            {errors.provincia && <p className={styles.error}>{errors.provincia.message}</p>}
          </div>
        </div>

        <button className={styles.button} type="submit">Registrarse</button>
        <p className={styles.registerText}>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
      </form>
    </div>
  );
};
