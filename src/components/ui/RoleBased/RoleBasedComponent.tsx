import { ReactNode } from "react";
import { useAuth } from "../../../context/AuthContext";

interface RoleBasedComponentProps {
  children: ReactNode;
  allowedRoles: ("USER" | "ADMIN")[];
  fallback?: ReactNode;
}

// Componente para mostrar contenido basado en roles
export const RoleBasedComponent = ({ 
  children, 
  allowedRoles, 
  fallback = null 
}: RoleBasedComponentProps) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <>{fallback}</>;
  }

  if (allowedRoles.includes(user.rol as "USER" | "ADMIN")) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
};

// Hook personalizado para verificar roles
export const useRole = () => {
  const { user, isAuthenticated } = useAuth();

  const hasRole = (role: "USER" | "ADMIN") => {
    return isAuthenticated && user?.rol === role;
  };

  const hasAnyRole = (roles: ("USER" | "ADMIN")[]) => {
    return isAuthenticated && user && roles.includes(user.rol as "USER" | "ADMIN");
  };

  return {
    isAdmin: hasRole("ADMIN"),
    isUser: hasRole("USER"),
    hasRole,
    hasAnyRole,
    currentRole: user?.rol
  };
};