import { Header } from '../../../ui/header/Header'
import { Footer } from '../../../ui/footer/Footer'
import styles  from './LandingUser.module.css'
import esmoquin from '../../../../assets/esmoquin.jpeg'
import Armani from '../../../../assets/Armani.png'
import TomFord from '../../../../assets/TomFord.jpg'
import HugoBoss from '../../../../assets/HugoBoss.png'
import SportsMan from '../../../../assets/SportsMan.png'
import { ProductCard } from '../../../ui/cards/ProductCard/ProductCard'

export const LandingUser = () => {
  return (
    <>
      <Header /> 
      <main>
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

        <div className={styles.marcas}>
          <img src={Armani} alt="Armani" />
          <img src={TomFord} alt="Tom Ford" />
          <img src={HugoBoss} alt="Hugo Boss" />
          <img src={SportsMan} alt="SportSMan" />
        </div>

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
      </main>

      <Footer/> 
        
    </>
  )
}
