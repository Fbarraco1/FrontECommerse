import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingUser } from '../components/screens/user/Landing/LandingUser'


// Este componente maneja todas las rutas del proyecto
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas con layout de usuario */}
        <Route path="/" element={<LandingUser />}/>

        {/* Rutas protegidas para administrador */}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter