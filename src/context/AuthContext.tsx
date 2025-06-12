import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

// Define el tipo de usuario
interface User {
  id: number;
  email: string;
  rol: "USER" | "ADMIN" | string;
  nombre: string;
  // agrega más campos si los necesitas
}

interface AuthContextType {
  user: User | null;
  token: string;
  login: (email: string, contrasenia: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      axios.get<User>("http://localhost:9000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => setUser(res.data))
        .catch(() => logout());
    }
  }, [token]);

  const login = async (email: string, contrasenia: string) => {
    const res = await axios.post<{ token: string }>("http://localhost:9000/api/auth/login", {
      email,
      contrasenia,
    });

    const tokenRecibido = res.data.token;
    setToken(tokenRecibido);
    localStorage.setItem("token", tokenRecibido);

    const userResponse = await axios.get<User>("http://localhost:9000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${tokenRecibido}`,
      },
    });

    setUser(userResponse.data);
  };

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};