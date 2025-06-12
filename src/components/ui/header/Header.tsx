import { useState } from 'react'
import { FiSearch, FiShoppingCart, FiUser, FiLogOut, FiSettings } from 'react-icons/fi'
import styles from './Header.module.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCartStore } from '../../../store/cartStore'
import { useAuth } from '../../../context/AuthContext'
import { RoleBasedComponent, useRole } from '../RoleBased/RoleBasedComponent'

export const Header = () => {
  const [showCategories, setShowCategories] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false) // Para el menú desplegable del usuario

  const navigate = useNavigate()
  const location = useLocation()
  const items = useCartStore((state) => state.items)
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)

  // Hooks de autenticación y roles
  const { user, isAuthenticated, logout } = useAuth()
  const { isAdmin, isUser } = useRole()

  const handleLoginClick = () => {
    if (isAuthenticated) {
      setShowUserMenu(!showUserMenu)
    } else {
      navigate('/login')
    }
  }

  const handleCartClick = () => {
    navigate('/cart')
  }

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
    navigate('/')
  }

  const handleAdminPanelClick = () => {
    setShowUserMenu(false)
    navigate('/admin/productos')
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

        {/* Menú de administrador - solo visible para admins */}
        <RoleBasedComponent allowedRoles={["ADMIN"]}>
          <button
            className={styles.navItem}
            onClick={() => {
              handleNavItemClick()
              navigate('/admin/productos')
            }}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              padding: 0,
              color: '#ff6b35', // Color diferente para destacar que es admin
            }}
          >
            Panel Admin
          </button>
        </RoleBasedComponent>
      </nav>

      {/* Buscador */}
      <div className={styles.searchContainer}>
        <FiSearch className={styles.searchIcon} />
        <input type="text" placeholder="Buscar producto..." className={styles.searchInput} />
      </div>

      {/* Íconos de acciones */}
      <div className={styles.icons}>
        {/* Carrito - solo para usuarios autenticados */}
        <RoleBasedComponent allowedRoles={["USER", "ADMIN"]}>
          <div className={styles.cartIconWrapper}>
            <FiShoppingCart 
              size={20} 
              onClick={handleCartClick} 
              style={{ cursor: 'pointer' }} 
            />
            {totalQuantity > 0 && <span className={styles.cartBadge}>{totalQuantity}</span>}
          </div>
        </RoleBasedComponent>

        {/* Ícono de usuario con menú desplegable */}
        <div className={styles.userIconWrapper} style={{ position: 'relative' }}>
          <FiUser 
            size={20} 
            onClick={handleLoginClick} 
            style={{ cursor: 'pointer' }} 
          />
          
          {/* Mostrar nombre del usuario si está logueado */}
          {isAuthenticated && user && (
            <span className={styles.userName} style={{ 
              fontSize: '12px', 
              marginLeft: '5px',
              color: isAdmin ? '#ff6b35' : '#333'
            }}>
              {user.nombre}
            </span>
          )}

          {/* Menú desplegable del usuario */}
          {showUserMenu && isAuthenticated && (
            <div className={styles.userDropdownMenu} style={{
              position: 'absolute',
              top: '100%',
              right: '0',
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              minWidth: '180px',
              zIndex: 1000,
              padding: '8px 0'
            }}>
              {/* Información del usuario */}
              <div style={{ 
                padding: '12px 16px', 
                borderBottom: '1px solid #eee',
                fontSize: '14px'
              }}>
                <div style={{ fontWeight: 'bold' }}>{user?.nombre}</div>
                <div style={{ color: '#666', fontSize: '12px' }}>
                  {isAdmin ? '👑 Administrador' : '👤 Usuario'}
                </div>
              </div>

              {/* Opciones del menú */}
              {isAdmin && (
                <button
                  onClick={handleAdminPanelClick}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: 'none',
                    background: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <FiSettings size={16} />
                  Panel de Admin
                </button>
              )}

              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  background: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#dc3545',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <FiLogOut size={16} />
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay para cerrar el menú del usuario al hacer clic fuera */}
      {showUserMenu && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  )
}