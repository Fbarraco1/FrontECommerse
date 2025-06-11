import { FiUser } from "react-icons/fi";
import logoAdmin from "../../../../assets/logo.png";
import { useNavigate } from 'react-router';
import styles from './HeaderAdmin.module.css';

export const HeaderAdmin = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <p><u>Modo Admin</u></p>
      </div>
      <div className={styles.mainHeader}>
        <div className={styles.leftMenu}>
          <p>Productos</p>
          <p>Categorías</p>
        </div>
        <div className={styles.logoContainer}>
          <img src={logoAdmin} alt="logoAdmin" />
        </div>
        <div className={styles.iconContainer}>
          <FiUser size={24} onClick={handleLoginClick} style={{ cursor: 'pointer' }} />
        </div>
      </div>
    </div>
  );
};
