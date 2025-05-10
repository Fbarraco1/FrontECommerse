import styles from './RegisterPage.module.css'
import { RegisterForm } from './RegisterForm'
import logo from '../../../assets/logo.png' // Asegúrate de que la ruta sea correcta
export const RegisterPage = () => {
  return (
    <div className={styles.container}>
      {/* Lado izquierdo con el logo */}
      <div className={styles.left}>
        <img src={logo} alt="ChispaSuits Logo" className={styles.logo} />
      </div>

      {/* Lado derecho con el formulario */}
      <div className={styles.right}>
        <RegisterForm />
      </div>
    </div>
  )
}
