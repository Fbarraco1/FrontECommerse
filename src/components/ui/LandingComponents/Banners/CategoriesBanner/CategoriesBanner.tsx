// CategoriesBanner.tsx
import styles from "./CategoriesBanner.module.css";
import Fiesta from "../../../../../../public/images/Fiesta.png";
import Casual from "../../../../../../public/images/Casual.png";
import Formal from "../../../../../../public/images/Formal.png";
import { useNavigate } from "react-router-dom";
import { productStore } from "../../../../../store/productStore";

const tipoMap: Record<string, number> = {
  Casual: 2, 
  Formal: 1,
  Fiesta: 3,
};

export const CategoriesBanner = () => {
  const navigate = useNavigate();
  const setFiltros = productStore((state) => state.setFiltros);

  const handleCategoryClick = (tipoNombre: string) => {
    setFiltros({ tipo: tipoMap[tipoNombre] });
    navigate("/productos"); // ← Cambia aquí la ruta
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Buscá según tu estilo</h2>
      <div className={styles.grid}>
        <div className={styles.card} onClick={() => handleCategoryClick("Casual")}>
          <img src={Casual} alt="Casual" />
          <span className={styles.label}>Casual</span>
        </div>
        <div className={styles.card} onClick={() => handleCategoryClick("Formal")}>
          <img src={Formal} alt="Formal" />
          <span className={styles.label}>Formal</span>
        </div>
        <div className={styles.card} onClick={() => handleCategoryClick("Fiesta")}>
          <img src={Fiesta} alt="Fiesta" />
          <span className={styles.label}>Fiesta</span>
        </div>
      </div>
    </div>
  );
};