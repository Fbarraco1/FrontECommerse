import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import logoAdmin from "../../../../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./HeaderAdmin.module.css";
import { RoleBasedComponent, useRole } from "../../RoleBased/RoleBasedComponent";
import { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";


export const HeaderAdmin = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Hooks de autenticación y roles
  const { user, isAuthenticated, logout } = useAuth();
  const { isAdmin } = useRole();

  // Manejo de clic en el ícono de usuario
  const handleLoginClick = () => {
    if (isAuthenticated) {
      setShowUserMenu(!showUserMenu);
    } else {
      navigate("/login");
    }
  };

  // Cerrar sesión
  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate("/");
  };

  // Navegar al panel de usuario
  const handleUserPanelClick = () => {
    setShowUserMenu(false);
    navigate("/");
  };

  return (
    <RoleBasedComponent allowedRoles={["ADMIN"]}>
      <div className={styles.container}>
        <div className={styles.topBar}>
          <p><u>Modo Admin</u></p>
        </div>
        <div className={styles.mainHeader}>
          {/* Menú de navegación */}
          <div className={styles.leftMenu}>
            <p
              className={`${styles.menuItem} ${location.pathname === "/admin/productos" ? styles.active : ""}`}
              onClick={() => navigate("/admin/productos")}
            >
              Productos
            </p>
            <p
              className={`${styles.menuItem} ${location.pathname === "/admin/categorias" ? styles.active : ""}`}
              onClick={() => navigate("/admin/categorias")}
            >
              Categorías
            </p>
          </div>

          {/* Logo */}
          <div className={styles.logoContainer}>
            <img src={logoAdmin} alt="logoAdmin" />
          </div>

          {/* Ícono de usuario con menú desplegable */}
          <div className={styles.userIconWrapper} style={{ position: "relative" }}>
            <FiUser size={20} onClick={handleLoginClick} style={{ cursor: "pointer" }} />

            {/* Mostrar nombre del usuario si está autenticado */}
            {isAuthenticated && user && (
              <span className={styles.userName} style={{ fontSize: "12px", marginLeft: "5px", color: isAdmin ? "#ff6b35" : "#333" }}>
                {user.nombre}
              </span>
            )}

            {/* Menú desplegable del usuario */}
            {showUserMenu && isAuthenticated && (
              <div className={styles.userDropdownMenu}>
                {/* Información del usuario */}
                <div className={styles.userInfo}>
                  <div className={styles.userNameBold}>{user?.nombre}</div>
                  <div className={styles.userRole}>{isAdmin ? "👑 Administrador" : "👤 Usuario"}</div>
                </div>

                {/* Opciones del menú */}
                <button className={styles.menuButton} onClick={handleUserPanelClick}>
                  <FiSettings size={16} />
                  Panel de Usuario
                </button>

                <button className={`${styles.menuButton} ${styles.logoutButton}`} onClick={handleLogout}>
                  <FiLogOut size={16} />
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </RoleBasedComponent>
  );
};