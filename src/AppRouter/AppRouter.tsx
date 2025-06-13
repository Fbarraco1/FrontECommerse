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
import { PaymentSuccess } from "../components/ui/PaymentStatus/PaymentSuccess"; 
import { PaymentPending } from "../components/ui/PaymentStatus/PaymentPending";
import { PaymentFailure } from "../components/ui/PaymentStatus/PaymentFailure"; 


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
          <Route path="/paymentSuccess" element={<PaymentSuccess />} />
          <Route path="/paymentPending" element={<PaymentPending />} />
          <Route path="/paymentFailure" element={<PaymentFailure />} />


          {/* Aquí puedes agregar más rutas que requieran estar logueado como USER */}
          {/* Por ejemplo, si tienes páginas de perfil, órdenes, etc. */}
          {/*
          <Route 
            path="/profile" 
            element={
              <RequireAuth role="USER">
                <ProfilePage />
              </RequireAuth>
            } 
          />
          <Route 
            path="/orders" 
            element={
              <RequireAuth role="USER">
                <OrdersPage />
              </RequireAuth>
            } 
          />
          */}
          

          {/* ===== RUTAS SOLO PARA ADMINISTRADORES ===== */}
          <Route 
            path="/admin/productos" 
            element={
              <Productos />
              // <RequireAuth role="ADMIN">
                  // <Productos />

              // </RequireAuth>
            } 
          />
          <Route 
            path="/admin/tipos" 
            element={
              <Tipos />
              // <RequireAuth role="ADMIN">
              //   <Tipos />
              // </RequireAuth>
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