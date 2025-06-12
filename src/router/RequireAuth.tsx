import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { JSX, useEffect } from "react";
import Swal from "sweetalert2";

interface RequireAuthProps {
  children: JSX.Element;
  role?: "USER" | "ADMIN";
  showErrorMessage?: boolean;
}

const RequireAuth = ({ 
  children, 
  role, 
  showErrorMessage = true 
}: RequireAuthProps) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && showErrorMessage) {
      Swal.fire({
        icon: "warning",
        title: "Acceso restringido",
        text: "Debes iniciar sesión para acceder a esta página",
        confirmButtonText: "Ir al login"
      });
    } else if (isAuthenticated && role && user?.rol !== role && showErrorMessage) {
      const roleText = role === "ADMIN" ? "administrador" : "usuario";
      Swal.fire({
        icon: "error",
        title: "Acceso denegado",
        text: `Necesitas permisos de ${roleText} para acceder a esta página`,
        confirmButtonText: "Volver al inicio"
      });
    }
  }, [isAuthenticated, user, role, showErrorMessage]);

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si está autenticado pero no tiene el rol requerido
  if (role && user?.rol !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;