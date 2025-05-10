import { useState } from 'react'
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi'
import styles from './Header.module.css'
import { useNavigate } from 'react-router'

export const Header = () => {
  const [showCategories, setShowCategories] = useState(false)
  const navigate = useNavigate() // <--- Inicializá el hook

  const handleCartClick = () => {
    navigate('/login') // <--- Redirige a la ruta deseada
  }

  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo}>ChispaSuits</div>

      {/* Navegación */}
      <nav className={styles.nav}>
        <div
          className={styles.navItem}
          onMouseEnter={() => setShowCategories(true)}
          onMouseLeave={() => setShowCategories(false)}
        >
          Categorías 
          {showCategories && (
            <div className={styles.dropdown}>
              <a href="#">Vestidos</a>
              <a href="#">Trajes</a>
              <a href="#">Accesorios</a>
            </div>
          )}
        </div>
        <a className={styles.navItem} href="#">Sobre Nosotros</a>
        <a className={styles.navItem} href="#">Novedades</a>
      </nav>

      {/* Buscador */}
      <div className={styles.searchContainer}>
        <FiSearch className={styles.searchIcon} />
        <input type="text" placeholder="Buscar producto..." className={styles.searchInput} />
      </div>

      {/* Íconos de acciones */}
      <div className={styles.icons}>
        <FiShoppingCart  size={20}  />
        <FiUser size={20} onClick={handleCartClick} style={{ cursor: 'pointer' }} />
      </div>
    </header>
  )
}
