import { useState } from 'react'
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi'
import styles from './Header.module.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCartStore } from '../../../store/cartStore'

export const Header = () => {
  const [showCategories, setShowCategories] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false) // <--- estado menú hamburguesa

  const navigate = useNavigate()
  const location = useLocation()
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
      {/* Logo como botón, mismo estilo */}
      <button
        className={styles.logo}
        onClick={() => location.pathname !== '/' && navigate('/')}
        disabled={location.pathname === '/'}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: location.pathname === '/' ? 'default' : 'pointer',
        }}
        aria-label="Ir al inicio"
      >
        ChispaSuits
      </button>

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
        <button
          className={styles.navItem}
          onClick={() => location.pathname !== '/productos' && navigate('/productos')}
          disabled={location.pathname === '/productos'}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            cursor: location.pathname === '/productos' ? 'default' : 'pointer',
            opacity: location.pathname === '/productos' ? 0.7 : 1,
            padding: 0,
          }}
        >
          Productos
        </button>
        <button
          className={styles.navItem}
          onClick={() => location.pathname !== '/sobreNos' && navigate('/sobreNos')}
          disabled={location.pathname === '/sobreNos'}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            cursor: location.pathname === '/sobreNos' ? 'default' : 'pointer',
            opacity: location.pathname === '/sobreNos' ? 0.7 : 1,
            padding: 0,
          }}
        >
          Sobre Nosotros
        </button>
        <button
          className={styles.navItem}
          onClick={handleNavItemClick}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            padding: 0,
          }}
        >
          Novedades
        </button>
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
