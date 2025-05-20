// PrincipalBanner.tsx
import styles from "./PrincipalBanner.module.css";
import esmoquin from "../../../../../assets/esmoquin.jpeg"


export const PrincipalBanner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.texto}>
        <h1>Tu mejor versión empieza con un buen traje.</h1>
        <p>Calle, pero elegante</p>
        <button>Compra Ahora</button>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <h3>200+</h3>
            <p>Productos Internacionales</p>
          </div>
          <div className={styles.stat}>
            <h3>20+</h3>
            <p>Años de experiencia</p>
          </div>
          <div className={styles.stat}>
            <h3>30,000+</h3>
            <p>Clientes Felices</p>
          </div>
        </div>
      </div>

      <div className={styles.imagen}>
        <img src={esmoquin} alt="Hombre con traje elegante" />
      </div>
    </div>
  );
};
