import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from '../components/screens/user/Home'
import { ProductDetail } from '../components/screens/user/ProductDetail'
import { Cart } from '../components/screens/user/Cart'
import { Login } from '../components/screens/user/Login'
import { LayoutUser } from '../layouts/LayoutUser'
import { LayoutAdmin } from '../layouts/LayoutAdmin'
import { AdminDashboard } from '../components/screens/admin/Dashboard/AdminDashboard'
import { AdminProducts } from '../components/screens/admin/Products/AdminProducts'


// Este componente maneja todas las rutas del proyecto
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas con layout de usuario */}
        <Route path="/" element={<LayoutUser />}>
          <Route index element={<Home />} />
          <Route path="producto/:id" element={<ProductDetail />} />
          <Route path="carrito" element={<Cart />} />
          <Route path="login" element={<Login />} />
          {/* Agrega más rutas de usuario si es necesario */}
        </Route>

        {/* Rutas protegidas para administrador */}
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<AdminDashboard />} />
          <Route path="productos" element={<AdminProducts />} />
          {/* Más rutas admin */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter