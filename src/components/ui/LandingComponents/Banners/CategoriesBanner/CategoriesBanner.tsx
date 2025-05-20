// CategoriesBanner.tsx
import styles from "./CategoriesBanner.module.css"
import Fiesta from "../../../../../../public/images/Fiesta.png";
import Casual from "../../../../../../public/images/Casual.png";
import Formal from "../../../../../../public/images/Formal.png";
export const CategoriesBanner = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Buscá según tu estilo</h2>

      <div className={styles.grid}>
        <div className={styles.card}>
          <img src={Casual} alt="Casual" />
          <span className={styles.label}>Casual</span>
        </div>

        <div className={styles.card}>
          <img src={Formal} alt="Formal" />
          <span className={styles.label}>Formal</span>
        </div>

        <div className={styles.card}>
          <img src={Fiesta} alt="Fiesta" />
          <span className={styles.label}>Fiesta</span>
        </div>
      </div>
    </div>
  );
};