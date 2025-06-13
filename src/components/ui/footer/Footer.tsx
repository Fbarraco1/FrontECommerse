import styles from './Footer.module.css'
import { FaGithub, FaInstagram } from 'react-icons/fa'
import MP from "../../../../public/images/mplogo.png";


export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        {/* Marca */}
        <div className={styles.column}>
          <h2 className={styles.logo}>ChispaSuits</h2>
          <p className={styles.description}>
            Tienda multimarca especializada en moda ejecutiva. Reunimos las mejores marcas para ofrecer estilo, distinción y confianza a quienes lideran con presencia.
          </p>
        </div>

        {/* Enlaces */}
        <div className={styles.column}>
          <h3 className={styles.title}>No te pierdas</h3>
          <ul className={styles.list}>
            <li><a href="/sobreNos">Sobre Nosotros</a></li>
            <li><a href="/productos">Productos</a></li>
          </ul>
        </div>

        {/* Redes */}
        <div className={styles.column}>
          <h3 className={styles.title}>Redes</h3>
          <ul className={styles.list}>
            <li><FaGithub /> <a href="#">GitHub</a></li>
            <li><FaInstagram /> <a href="#">Instagram</a></li>
          </ul>
        </div>

        {/* Pago */}
        <div className={styles.column}>
          <h3 className={styles.title}>Métodos de Pago</h3>
          <img
            src={MP} 
            alt="Mercado Pago"
            className={styles.paymentLogo}
          />
        </div>  
      </div>

      {/* Pie de página */}
      <div className={styles.bottom}>
        <p>© 2000–2025 ChispaSuits®. Todos los derechos reservados.</p>
        <p>Moda con presencia, para quienes marcan la diferencia.</p>
        <div className={styles.contactInfo}>
          <span>📍 Mendoza, Argentina</span>
          <span>✉ contacto@chispaSuits.com</span>
          <span>📞 +54 9 2615555555</span>
        </div>
      </div>
    </footer>
  )
}
