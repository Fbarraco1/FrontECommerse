import { Outlet } from 'react-router-dom'
import { Header } from '../../../ui/header/Header'
import { Footer } from '../../../ui/footer/Footer'

export const LandingUser = () => {
  return (
    <>
      <Header /> {/* ✅ Esto se renderiza una sola vez */}
      <main>
        <Outlet /> {/* Aquí se renderizan Home, Cart, etc. */}
      </main>
      <Footer/> {/* Aquí se renderiza el footer */}
        {/* Footer content */}
    </>
  )
}
