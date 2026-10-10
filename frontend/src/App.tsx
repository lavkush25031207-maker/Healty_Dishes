import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import BookingPage from './pages/BookingPage'
import CheckoutPage from './pages/CheckoutPage'
import TrackOrderPage from './pages/TrackOrderPage'

export default function App() {
  return <div className="app-shell">
    <Header />
    <main><Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/book-table" element={<BookingPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/track-order" element={<TrackOrderPage />} />
    </Routes></main>
    <Footer />
    <CartDrawer />
  </div>
}
