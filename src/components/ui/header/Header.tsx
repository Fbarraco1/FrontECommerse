import { useState } from 'react'
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi'
import styles from './Header.module.css'
import { useNavigate } from 'react-router'
import { useCartStore } from '../../../store/cartStore'

export const Header = () => {
  const [showCategories, setShowCategories] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false) // <--- estado menú hamburguesa

  const navigate = useNavigate()
  const items = useCartStore((state) => state.items)
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleLoginClick = () => {
    navigate('/login')
  }
  const handleCartClick = () => {
    navigate('/cart')
  }

  // Para cerrar menú al seleccionar una opción
  const handleNavItemClick = () => {
    setMenuOpen(false)
  }

  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo}>ChispaSuits</div>

      {/* Botón hamburguesa móvil */}
      <div
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setMenuOpen(!menuOpen)
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navegación */}
      <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
        <div
          className={styles.navItem}
          onMouseEnter={() => setShowCategories(true)}
          onMouseLeave={() => setShowCategories(false)}
          onClick={handleNavItemClick} // cerrar menú al click en móvil
        >
          Categorías
          {showCategories && (
            <div className={styles.dropdown}>
              <a href="#" onClick={handleNavItemClick}>Vestidos</a>
              <a href="#" onClick={handleNavItemClick}>Trajes</a>
              <a href="#" onClick={handleNavItemClick}>Accesorios</a>
            </div>
          )}
        </div>
        <a href="#" className={styles.navItem} onClick={handleNavItemClick}>
          Sobre Nosotros
        </a>
        <a href="#" className={styles.navItem} onClick={handleNavItemClick}>
          Novedades
        </a>
      </nav>

      {/* Buscador */}
      <div className={styles.searchContainer}>
        <FiSearch className={styles.searchIcon} />
        <input type="text" placeholder="Buscar producto..." className={styles.searchInput} />
      </div>

      {/* Íconos de acciones */}
      <div className={styles.icons}>
        <div className={styles.cartIconWrapper}>
          <FiShoppingCart size={20} onClick={handleCartClick} style={{ cursor: 'pointer' }} />
          {totalQuantity > 0 && <span className={styles.cartBadge}>{totalQuantity}</span>}
        </div>
        <FiUser size={20} onClick={handleLoginClick} style={{ cursor: 'pointer' }} />
      </div>
    </header>
  )
}
