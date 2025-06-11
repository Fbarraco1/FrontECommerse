import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingUser } from "../components/screens/user/Landing/LandingUser";
import { LoginPage } from "../components/ui/login/LoginPage";
import { RegisterPage } from "../components/ui/register/RegisterPage";
import CartPage from "../components/screens/user/CartPage/CartPage";
import ProductDetailPage from "../components/screens/user/ProductDetailPage/ProductDetailPage";
import { Productos } from "../components/screens/admin/Products/Productos";
import { Categorias } from "../components/screens/admin/Categorias/Categorias";
import ProductCategorie from "../components/screens/user/ProductCategoriePage/ProductCategorie"; // Asegúrate de que esta ruta sea correcta
import SobreNosFinal from "../components/screens/user/SobreNosFInal/SobreNosFinal"; // Agrega esta línea

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

        {/* Nueva ruta para ver productos con filtros */}
        <Route path="/productos" element={<ProductCategorie />} /> 

        {/* Nueva ruta sobre nosotros */}
        <Route path="/sobreNos" element={<SobreNosFinal />} />

        {/* Rutas protegidas para administrador */}
        <Route path="/admin/productos" element={<Productos/>} />
        <Route path="/admin/categorias" element={<Categorias/>} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
