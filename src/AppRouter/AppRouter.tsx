import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingUser } from "../components/screens/user/Landing/LandingUser";
import { LoginPage } from "../components/screens/Login/LoginPage";
import { RegisterPage } from "../components/screens/Login/RegisterPage";
import CartPage from "../components/screens/user/CartPage/CartPage";
import ProductDetailPage from "../components/screens/user/ProductDetailPage/ProductDetailPage";
import { Productos } from "../components/screens/admin/Products/Productos";
import { Tipos } from "../components/screens/admin/Tipos/Tipos";
import ProductCategorie from "../components/screens/user/ProductCategoriePage/ProductCategorie";
import SobreNosFinal from "../components/screens/user/SobreNosFInal/SobreNosFinal";
import { AuthProvider } from "../context/AuthContext";
import RequireAuth from "../router/RequireAuth";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ===== RUTAS PÚBLICAS ===== */}
          <Route path="/" element={<LandingUser />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/producto/:id" element={<ProductDetailPage />} />
          <Route path="/productos" element={<ProductCategorie />} />
          <Route path="/sobreNos" element={<SobreNosFinal />} />

          {/* ===== RUTAS PARA USUARIOS LOGUEADOS (USER) ===== */}
          <Route 
            path="/cart" 
            element={
              <RequireAuth role="USER">
                <CartPage />
              </RequireAuth>
            } 
          />
          
          {/* ===== RUTAS SOLO PARA ADMINISTRADORES ===== */}
          <Route 
            path="/admin/productos" 
            element={
              <RequireAuth role="ADMIN">
                <Productos />
              </RequireAuth>
            } 
          />
          <Route 
            path="/admin/tipos" 
            element={
              <RequireAuth role="ADMIN">
                <Tipos />
              </RequireAuth>
            } 
          />

          {/* ===== RUTA PARA PÁGINAS NO ENCONTRADAS ===== */}
          <Route 
            path="*" 
            element={
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh', 
                flexDirection: 'column' 
              }}>
                <h1>404 - Página no encontrada</h1>
                <p>La página que buscas no existe.</p>
                <a href="/" style={{ color: '#007bff', textDecoration: 'underline' }}>
                  Volver al inicio
                </a>
              </div>
            } 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRouter;