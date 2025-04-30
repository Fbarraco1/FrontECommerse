import { Outlet } from 'react-router-dom'
import { Header } from '../components/ui/header/Header'

export const LayoutUser = () => {
  return (
    <>
      <Header /> {/* ✅ Esto se renderiza una sola vez */}
      <main>
        <Outlet /> {/* Aquí se renderizan Home, Cart, etc. */}
      </main>
    </>
  )
}
