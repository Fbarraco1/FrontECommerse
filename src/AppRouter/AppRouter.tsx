import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingUser } from '../components/screens/user/Landing/LandingUser'
import { LoginPage } from '../components/ui/login/LoginPage'
import { RegisterPage } from '../components/ui/register/RegisterPage'
import { ProductDetail } from '../components/screens/user/ProductDetail/ProductDetail'

// Este componente maneja todas las rutas del proyecto
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas con layout de usuario */}
        <Route path="/" element={<LandingUser />} />
        <Route path="/login" element={<LoginPage />} /> {/* <-- Nueva ruta */}
        <Route path="/register" element={<RegisterPage />} /> {/* <-- Nueva ruta */}
        {/* NUEVA RUTA DETALLE DE PRODUCTO */}
        <Route path="/producto/:id" element={<ProductDetail />} />

        {/* Rutas protegidas para administrador */}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
