import { Header } from "../../../ui/header/Header";
import { Footer } from "../../../ui/footer/Footer";
import styles from "./LandingUser.module.css";
import esmoquin from "../../../../assets/esmoquin.jpeg";
import Armani from "../../../../assets/Armani.png";
import TomFord from "../../../../assets/TomFord.jpg";
import HugoBoss from "../../../../assets/HugoBoss.png";
import SportsMan from "../../../../assets/SportsMan.png";
import Fiesta from "../../../../../public/images/Fiesta.png";
import Casual from "../../../../../public/images/Casual.png";
import Formal from "../../../../../public/images/Formal.png";
import { ProductCard } from "../../../ui/cards/ProductCard/ProductCard";

export const LandingUser = () => {
  return (
    <>
      <Header />
      <main>
         {/* Banner principal */}
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

        {/* // Marcas usadas */}
        <div className={styles.marcas}>
          <img src={Armani} alt="Armani" />
          <img src={TomFord} alt="Tom Ford" />
          <img src={HugoBoss} alt="Hugo Boss" />
          <img src={SportsMan} alt="SportSMan" />
        </div>

        {/* // Novedades */}
        <div className={styles.novedades}>
          <h2 className={styles.title}>NOVEDADES</h2>

          <div className={styles.productsContainer}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>

          <button className={styles.verTodo}>Ver Todo</button>
        </div>

        {/* // Más vendidos (Usa mismos estilos de novedades) */}
        <div className={styles.novedades}>
          <h2 className={styles.title}>MÁS VENDIDOS</h2>

          <div className={styles.productsContainer}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>

          <button className={styles.verTodo}>Ver Todo</button>
        </div>

        {/* // Banner categorias perzonalizadas */}
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
      </main>

      <Footer />
    </>
  );
};
