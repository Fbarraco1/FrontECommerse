import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingUser } from "../components/screens/user/Landing/LandingUser";
import { LoginPage } from "../components/ui/login/LoginPage";
import { RegisterPage } from "../components/ui/register/RegisterPage";
import CartPage from "../components/screens/user/CartPage/CartPage";
import ProductDetailPage from "../components/screens/user/ProductDetailPage/ProductDetailPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas con layout de usuario */}
        <Route path="/" element={<LandingUser />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/producto/:id" element={<ProductDetailPage />} />

        {/* Nueva ruta para el carrito */}
        <Route path="/cart" element={<CartPage />} />

        {/* Rutas protegidas para administrador */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
